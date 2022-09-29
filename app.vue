<template>

  <NuxtLayout>
  </NuxtLayout>
</template>

<script>
import {saveClickId} from "@/helpers/saveClickId";

export default {
  setup() {
    saveClickId();
  }
}
</script>
