<template>
    <div class="">
        <div class="loader"></div>
    </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>

/* HTML: <div class="loader"></div> */
.loader {
  width: 65px;
  height: 30px;
  position: relative;
}
.loader:before {
  content: "";
  position: absolute;
  border-radius: 50px;
  box-shadow: 0 0 0 3px inset #006EAD;
  animation: l3 0.75s infinite alternate;
}
@keyframes l3 {
  0% {
    inset: 0 35px 0 0;
  }
  50% {
    inset: 0 0 0 0;
  }
  100% {
    inset: 0 0 0 35px;
  }
}
</style>
