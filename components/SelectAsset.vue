<template>
  <div class="select" @click="open" :class="{'open' : selectOpen}">
    <div class="select__el">
      <div class="select__text">
        <UiIcon
            class="select__icon"
            :type="selected['from-icon'] + '-icon'"
            :size="['20px', '20px']"
        />
        {{ selected["from-name"] }} <span class="select__line">/</span>
        <UiIcon
            class="select__icon"
            :type="selected['to-icon'] + '-icon'"
            :size="['20px', '20px']"
        />
        {{ selected["to-name"] }}
      </div>
      <div class="select__arrow"></div>
    </div>
    <div class="select__dropdown">
      <div
          class="select__row"
          v-for="item in list"
          :key="item.id"
          @click="setItem(item)"
          :class="{'active' : item === selected}"
      >
        <div class="select__text">
          <UiIcon
              class="select__icon"
              :type="item['from-icon'] + '-icon'"
              :size="['20px', '20px']"
          />
          {{ item["from-name"] }} <span class="select__line">/</span>
          <UiIcon
              class="select__icon"
              :type="item['to-icon'] + '-icon'"
              :size="['20px', '20px']"
          />
          {{ item["to-name"] }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ref, reactive, onMounted} from 'vue'

export default {
  name: "SelectAsset",
  setup(props, context) {
    const selectOpen = ref(false);
    // let selected = reactive({
    //   'id': 1,
    //   'from-icon': 'btc',
    //   'from-name': 'BTC',
    //   'to-icon': 'usd',
    //   'to-name': 'USD',
    //   'start': 21000
    // });
    const list = ref([
      {
        'id': 1,
        'from-icon': 'btc',
        'from-name': 'BTC',
        'to-icon': 'usd',
        'to-name': 'USD',
        'start': 21000,
        'leverage': 50
      },
      {
        'id': 2,
        'from-icon': 'eth',
        'from-name': 'ETH',
        'to-icon': 'usd',
        'to-name': 'USD',
        'start': 1200,
        'leverage': 50
      },
      {
        'id': 3,
        'from-icon': 'eur',
        'from-name': 'EUR',
        'to-icon': 'usd',
        'to-name': 'USD',
        'start': 1.1020,
        'leverage': 500
      }
    ])
    let selected = ref(list.value[0]);

    function open() {
      selectOpen.value = !selectOpen.value;
    }

    function setItem(item) {
      selected.value = item;
      context.emit('item', item)
    }

    onMounted(() => {
      context.emit('item', selected.value)
    })

    return {
      open,
      selectOpen,
      list,
      selected,
      setItem
    }
  }
}
</script>

<style scoped>

</style>
