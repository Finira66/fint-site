<template>
  <div class="counts">
    <div class="counts__items">
      <div class="counts__item">
        <div class="counts__item-number">24/7
        </div>
        <div class="counts__item-title">
          {{ $t('counts.1.title') }}
        </div>
        <div class="counts__item-desc">
          {{ $t('counts.1.text') }}
        </div>
      </div>
      <div class="counts__item">
        <div class="counts__item-number">$250
        </div>
        <div class="counts__item-title">
          {{ $t('counts.2.title') }}
        </div>
        <div class="counts__item-desc">
          {{ $t('counts.2.text') }}
        </div>
      </div>
      <div class="counts__item">
        <div class="counts__item-number">$10 000
        </div>
        <div class="counts__item-title">
          {{ $t('counts.3.title') }}
        </div>
        <div class="counts__item-desc">
          {{ $t('counts.3.text') }}
        </div>
      </div>
      <div class="counts__item">
        <div class="counts__item-number">100+
        </div>
        <div class="counts__item-title">
          {{ $t('counts.4.title') }}
        </div>
        <div class="counts__item-desc">
          {{ $t('counts.4.text') }}
        </div>
      </div>
    </div>
    <div class="counts__footer">
      <a class="button button_large" href="#form-bottom" @click.prevent="scrollTo('#form-bottom')">
        <span>{{ $t('start-trading') }}</span>
        <svg class="icon icon_arrow button__icon" height="1em" width="1.2em">
          <use xlink:href="#icon-arrow"></use>
        </svg>
    </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "TradingCounts",
  setup() {
    function scrollTo(selector) {
      document.querySelector(selector).scrollIntoView({block: "start", behavior: 'smooth'});
    }

    return { scrollTo }
  }
}
</script>

<style scoped>

</style>
