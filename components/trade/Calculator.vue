<template>
  <div class="calc" v-if="state.loaded">
    <!--    <div class="calc__title">-->
    <!--      {{ $t('how-work') }}-->
    <!--    </div>-->
    <i18n-t keypath="how-work" tag="div" class="calc__title">
      <template #up>
        <span class="green">{{ $t('up') }}</span>
      </template>
      <template #down>
        <span class="red">{{ $t('down') }}</span>
      </template>
    </i18n-t>
    <div class="calc__group">
      <div class="calc__wrapper">
        <div class="calc__col">
          <div class="calc__name">Select asset to trade</div>
          <SelectAsset @item="setSelectData"/>
        </div>
        <div class="calc__col">
          <label for="input-invest" class="calc__name">You Investment</label>
          <div class="input-box">
            <div class="input-prefix">
              $
            </div>
            <input type="text" id="input-invest" class="input-invest" v-model="invest">
            <div class="input-size">X{{ state.leverage }}</div>
          </div>
        </div>
        <div class="calc__col">
          <label for="input-size" class="calc__name">Trade size</label>
          <input type="text" id="input-size" class="calc__input" v-model="tradeSize" readonly>
        </div>
      </div>

      <div class="calc__content">
        <div
            class="calc__timer"
            v-if="selectedButton.length"
        >
          <img src="@/assets/images/clock.svg" alt="icon" class="calc__timer-icon">
          <span>{{ timer }}</span>
        </div>
        <div class="calc__graph-line"></div>
        <div
            class="calc__graph-buttons"
            v-if="selectedButton === ''"
        >
          <button
              class="calc__graph-button"
              @click.prevent="selectType('buy', true)"
          >
            <div class="calc__button-name calc__button-name--mt">BUY</div>
            <div class="calc__button-text">The price go UP</div>
          </button>
          <button
              class="calc__graph-button calc__graph-button--red"
              @click.prevent="selectType('sell', true)"
          >
            <div class="calc__button-text calc__button-text--mt">The price go DOWN</div>
            <div class="calc__button-name">SELL</div>
          </button>
        </div>
<!--        <TradeGraphic :items="state.points" :labels-visible="isLabelVisible"/>-->

        <TradeLineChart :items="state" :reset="reset"/>

        <div class="calc-modal" :class="{'open': modalCalcVisible}">
          <div class="calc-modal__row">
            <div class="calc-modal__circle">
              <img src="@/assets/images/coins.svg" alt="icon" class="calc-modal__icon">
            </div>
            <div class="calc-modal__box">
              <div class="calc-modal__overhead">Your forecast was correct!</div>
              <div class="calc-modal__title">Profit: ${{ profitSize }}</div>
            </div>
          </div>
          <button class="calc-modal__button" @click.prevent="scrollTo('#form-bottom')">
            Register <span class="hidden-mob">and claim your trading bonus</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ref, reactive, computed, onBeforeMount, onMounted, watch} from 'vue';
import {trimNumber} from "@/helpers/trimNumber";
import {calculateTradeData} from "@/api/api";

export default {
  name: "CriptoCalculator",
  setup() {
    const reset = ref(false);

    const state = reactive({
      id: null,
      leverage: null,
      cryptoCurr: '',
      fiatCurr: '',
      percent: null,
      price: null,
      points: [],
      loaded: false,
    })

    onBeforeMount(async () => {
      const {data} = await calculateTradeData();
      if (data.success) {
        state.leverage = Number(data.data.leverage)
        state.percent = Number(data.data.percent)
        state.price = Number(data.data.price)
        state.cryptoCurr = data.data.pair.split('/')[0]
        state.fiatCurr = data.data.pair.split('/')[1]
        state.loaded = true
      }
    })

    const price = computed(() => state.price)

    // Calc graph
    let startPrice = null;
    const modalCalcVisible = ref(false);
    const profitSize = ref(null);
    const isLabelVisible = ref(false);
    let dynamicTimer = null;
    const selectedButton = ref('');

    function setSelectData(item) {
      state.id = item.id;
      state.cryptoCurr = item['from-name'];
      state.fiatCurr = item['to-name']
      startPrice = item.start;
      state.leverage = item.leverage;
    }

    function selectType(type, label) {
      reset.value = false;
      selectedButton.value = type;

      clearInterval(dynamicTimer);
      calcGraph(type, label, false);

      const endTimer = setInterval(() => {
        if (timer.value === 9) {
          clearInterval(endTimer);
          modalCalcVisible.value = true;
        }

        timer.value += 1;
      }, 1000);
    }

    function calcGraph(type, label) {
      let randomArr = [];
      const closeArr = [];

      for (let i = 0; i < 7; i++) {
        randomArr.push(Math.random() - 0.3);
      }

      let itemPrice = startPrice;
      randomArr.forEach(item => {
        if (type === 'buy') {
          itemPrice = itemPrice * (1 + 0.008 * item);
        } else {
          itemPrice = itemPrice * (1 - 0.008 * item);
        }

        if (state.id === 1 || state.id === 2) {
          closeArr.push(itemPrice.toFixed(2));
        } else {
          closeArr.push(itemPrice.toFixed(4));
        }
      })

      state.points = [];
      closeArr.forEach(item => {
        state.points.push({
          close: item
        })
      })

      // Calc profit
      if (selectedButton.value.length) {
        const priceRatio = (closeArr[closeArr.length - 1] / startPrice) - 1;
        profitSize.value = priceRatio * (state.leverage * 1000);
        profitSize.value = Math.ceil(Math.abs(profitSize.value));
      }

      if (label) {
        isLabelVisible.value = true;
      } else {
        isLabelVisible.value = false
      }
    }

    // Calc trade size
    const invest = ref(1000);
    const tradeSize = computed(() => {
      return '$ ' + state.leverage * invest.value;
    })

    let timer = ref(1);
    let infiniteTimer = null;

    watch(() => selectedButton.value, (val) => {
      if (selectedButton.value === '') {
      } else {
        clearInterval(infiniteTimer)
      }
    })

    // Scroll to register
    function scrollTo(selector) {
      document.querySelector(selector).scrollIntoView({block: "start", behavior: 'smooth'});
    }

    onMounted(() => {

      // Reset calc
      document.addEventListener('click', e => {
        const calcContent = document.querySelector('.calc__content');
        if (!calcContent.contains(e.target) && timer.value === 10) {
          modalCalcVisible.value = false;
          selectedButton.value = '';
          timer.value = 1;
          reset.value = true;
        }
      })
    })

    return {
      state,
      price,
      selectedButton,
      selectType,
      timer,
      invest,
      tradeSize,
      modalCalcVisible,
      profitSize,
      scrollTo,
      isLabelVisible,
      setSelectData,
      reset
    }
  },
}
</script>

<style scoped>

</style>
