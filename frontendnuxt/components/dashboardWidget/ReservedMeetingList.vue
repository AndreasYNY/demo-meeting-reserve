<template>
    <Card>
        <CardHeader>
            <CardTitle>Your Meeting Rooms</CardTitle>
        </CardHeader>
        <CardContent>
            <div class="space-y-4">
                <Card v-for="(reserve, index) in reservations" :key="index" class="">
                    <CardContent>
                        <div class="flex">
                            <img :src="meetingRoom" alt="Room Image" class="h-16 object-cover rounded" />
                            <div class="flex flex-col ml-4 grow">
                                <CardTitle>{{ reserve.room.name }}</CardTitle>
                                <CardDescription>
                                    {{ new Date(reserve.startTime).toLocaleString() }} - {{ new Date(reserve.endTime).toLocaleString() }}
                                </CardDescription>
                            </div>

                            <div>
                                <RoomDropdownAction :disable-delete="true" :reseravation="reserve" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </CardContent>
    </Card>
</template>

<script setup lang="ts">
import meetingRoom from '@/assets/image.png'
import { decodeJwt } from 'jose';
import type { reserveResponse } from '~/types';
import { RoomDropdownAction } from '#components';

const config = useRuntimeConfig()
const cookie = useCookie('token')

const userId = decodeJwt(cookie.value!).id

const { data } = await useFetch<reserveResponse>(`${config.public.apiUrl}/reserve/getByUserId/${userId}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
})

const reservations = ref(data.value?.data)


watch(data, (newData) => {
    reservations.value = newData?.data
})
</script>