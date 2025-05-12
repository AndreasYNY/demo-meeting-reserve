<template>
<div class="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:items-start">
    <div class="lg:col-span-2">
        <ReservedMeetingList />
    </div>
    <div class="order-first lg:order-last">
        <ReserveRoomPop />
    </div>
</div>

</template>

<script setup lang="ts">
import ReserveRoomPop from '~/components/dashboardWidget/ReserveRoomPop.vue';
import ReservedMeetingList from '~/components/dashboardWidget/ReservedMeetingList.vue';
</script>