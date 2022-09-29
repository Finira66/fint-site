<template>
  <img
      class="icon"
      alt="icon"
      :src="`./images/icons/${iconPath}`"
      :style="`width: ${size[0]}; height: ${size[1]};`
    ">
</template>

<script>

export default {
  name: 'Icon',
  props: {
    size: {
      type: Array,
      default: () => ['24px', '24px']
    },
    type: {
      type: String,
      required: true
    },
  },
  computed: {
    iconPath() {
      return `${this.type}.svg`
    }
  }
}
</script>

<style lang="scss" scoped>
.icon {
  display: inline-block;
  line-height: 1;
  text-align: center;
  vertical-align: text-top;
}
</style>
