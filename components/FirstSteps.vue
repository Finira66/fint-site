<template>
  <div class="steps">
    <div class="step">
      <div class="step__icon-wrap">
        <svg class="icon icon_step-1 step__icon" height="1em" width="1em">
          <use xlink:href="#icon-step-1"></use>
        </svg>
      </div>
      <div class="step__content">
        <div class="step__title">
          {{ $t('steps.1.title') }}
        </div>
        <div class="step__desc">
          {{ $t('steps.1.text') }}
        </div>
      </div>
    </div>
    <div class="step">
      <div class="step__icon-wrap">
        <svg class="icon icon_step-2 step__icon" height="1em" width="1em">
          <use xlink:href="#icon-step-2"></use>
        </svg>
      </div>
      <div class="step__content">
        <div class="step__title">
          {{ $t('steps.2.title') }}
        </div>
        <div class="step__desc">
          {{ $t('steps.2.text') }}
        </div>
      </div>
    </div>
    <div class="step">
      <div class="step__icon-wrap">
        <svg class="icon icon_step-3 step__icon" height="1em" width="1em">
          <use xlink:href="#icon-step-3"></use>
        </svg>
      </div>
      <div class="step__content">
        <div class="step__title">
          {{ $t('steps.3.title') }}
        </div>
        <div class="step__desc">
          {{ $t('steps.3.text') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FirstSteps"
}
</script>

<style scoped>

</style>
