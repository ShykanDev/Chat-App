<template>
    <div class="">
        <h2>This is a chat with {{ route.params.name }} </h2>
    </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';


const route = useRoute();

</script>

<style scoped>

</style>