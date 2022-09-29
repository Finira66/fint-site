<template>
  <main class="main">
    <div class="group">
      <div class="group__container container">
        <div class="group__holder">
          <div class="group__panel">
            <div class="group__inner">
              <div class="group__text">
                <div class="group__title">
                  <i18n-t keypath="info" tag="div" class="group__title">
                    <template #earn>
                      <br> <span>{{ $t('earn') }}</span>
                    </template>
                  </i18n-t>
                  <svg class="icon icon_title-line group__title-line" height="1em"
                       width="8.26086956521739em">
                    <use xlink:href="#icon-title-line"></use>
                  </svg>
                </div>
                <div class="group__desc">
                  {{ $t('trade.description') }}
                </div>
              </div>
              <RegisterForm @load="showLoader" id="form"/>
            </div>
            <div class="group__bg">
            </div>
          </div>
          <TradeCalculator/>
        </div>
        <TradingCounts/>
      </div>
    </div>
    <div class="bottom">
      <div class="bottom__container container">
        <FirstSteps/>
        <CompanyAdvantages/>
      </div>
    </div>

     <div class="container">
       <RegisterForm @load="showLoader" class="flat-register-form" id="form-bottom"/>
     </div>

    <teleport to='body'>
        <UiLoader :visible="isLoad"/>
    </teleport>

  </main>

</template>

<script>
  import {ref, watch} from 'vue'

  export default {
    setup() {
      const isLoad = ref(false);
      const token = ref('');
      const config = useRuntimeConfig()

      function showLoader(value, tokenSite) {
        token.value = tokenSite;
        isLoad.value = value
      }

      watch(isLoad, (value) => {
          if (value === true) {
            setTimeout(() => {
              isLoad.value = false;
              window.location.href = `${config.baseUrl}?token=${token.value}`;
            }, 3000);


          }
      })

      return { isLoad, showLoader }
    }
  }
</script>

