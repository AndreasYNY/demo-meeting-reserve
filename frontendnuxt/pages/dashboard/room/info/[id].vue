<template>
<div class="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:items-start">
    <div class="lg:col-span-2">
        <Card >
            <CardContent>
                <CardHeader>
                    <CardTitle>Meeting Room</CardTitle>
                </CardHeader>
                <CardContent>
                    <div class="flex flex-col gap-4">
                        <div>
                            <Label id="roomName">Room Name</Label>
                            <Input disabled v-model="roomName" id="roomName" type="text" placeholder="Room Name" class="w-full mt-2" />
                        </div>
                        <!-- <div class="flex gap-2">
                            <Checkbox disabled id="isReserved"/>
                            <Label id="isReserved">Is Reserved</Label>
                        </div> -->
                    </div>
                </CardContent>
            </CardContent>
        </Card>
        <!-- actions -->
        <div class="flex justify-end mt-4 gap-2">
            <Button variant="destructive" @click="deleteRoom">
                Delete
            </Button>
            <Button variant="outline">
                Save
            </Button>

        </div>
    </div>
    <Card class="order-first lg:order-last">
        <CardHeader>
            <CardTitle class="">Assets</CardTitle>
        </CardHeader>
        <CardContent>
            <!-- this is here for the looks, illusion that admins can change the image, which i dont want to implement -->
            <label class="cursor-pointer">
                <div class="relative group w-full">
                    <span class="absolute opacity-0 group-hover:opacity-100 z-50 text-white shadow-lg duration-500 transition-all flex border items-center w-full h-full justify-center text-2xl font-bold">
                        <!-- <Icon icon="radix-icons:upload" :ssr="true" /> -->

                        &nbsp;
                        Upload
                    </span>
                    <img :src="meetingRoom" alt="meeting room" class="object-cover w-full h-[20rem] group-hover:brightness-70 duration-500 rounded-md border" />
                </div>
                <input disabled type="file" accept="image/*" class="hidden" />
            </label>
            <div class="py-5 flex flex-col items-start">
                <span><span class="text-center text-lg font-bold mt-2">Filename:</span> image.png</span> 
                <span><span class="text-center text-lg font-bold mt-2">Size:</span> 3 MiB</span>
            </div>
        </CardContent>
    </Card>
</div>
</template>

<script setup lang="ts">
import meetingRoom from '@/assets/image.png'
import { toast } from 'vue-sonner';
import type { deleteResponse, Room, roomSingleResponse } from '~/types';
const config = useRuntimeConfig()
const route = useRoute()

const { data } = await useFetch<roomSingleResponse>(`${config.public.apiUrl}/room/get/${route.params.id}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
})

async function deleteRoom() {
    const data = await $fetch<deleteResponse>(`${config.public.apiUrl}/room/delete/${route.params.id}`, {
        method: "DELETE",
        credentials: "include" 
    })
    if (data.success) {
        await refreshNuxtData()
        toast.success(data.message)
    }
}

const roomName = ref(data.value?.data.name)
</script>