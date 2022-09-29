<template>
  <div class="companies">
    <div class="companies__item">
      <svg class="icon icon_cointelegraph companies__item-icon" height="1em" width="1em">
        <use xlink:href="#icon-cointelegraph"></use>
      </svg>
      <div class="companies__item-title">Cointelegraph
      </div>
      <div class="companies__item-desc">
        {{ $t('advantages.1') }}
      </div>
    </div>
    <div class="companies__item">
      <svg class="icon icon_trustpilot companies__item-icon" height="1em" width="1em">
        <use xlink:href="#icon-trustpilot"></use>
      </svg>
      <div class="companies__item-title">Rated Excellent
      </div>
      <div class="companies__item-desc">
        {{ $t('advantages.2') }}
      </div>
    </div>
    <div class="companies__item">
      <svg class="icon icon_fireblocks companies__item-icon" height="1em" width="1em">
        <use xlink:href="#fireblocks"></use>
      </svg>
      <div class="companies__item-title">FireBlocks
      </div>
      <div class="companies__item-desc">
        {{ $t('advantages.3') }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CompanyAdvantages"
}
</script>

<style scoped>

</style>
