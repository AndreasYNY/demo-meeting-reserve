<template>
<div class="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
    <div class="lg:col-span-2">
        <RoomList />
    </div>
    <div class="order-first lg:order-last">
        <RoomCreate />
    </div>
</div>
</template>

<script setup lang="ts">
import RoomList from '~/components/dashboardWidget/RoomList.vue';
import RoomCreate from '~/components/dashboardWidget/RoomCreate.vue';

</script>