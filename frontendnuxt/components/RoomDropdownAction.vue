<!-- this is meant to be used in a table -->

<template>
    <DropdownMenu>
    <DropdownMenuTrigger class="cursor-pointer">
        <span>...</span>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator/>
        <DropdownMenuGroup>
            <DropdownMenuItem>
                <a class="w-full" :href="'/dashboard/room/info/'+roomSelect!.id">More</a>
            </DropdownMenuItem>
            <DropdownMenuItem class="cursor-pointer" v-if="reservatiSelect" @click="cancelReserve">
                <!-- make popup confirming -->
                <span>Cancel</span>
            </DropdownMenuItem>
            <DropdownMenuItem class="cursor-pointer" v-if="!disableDelete"  @click="deleteRoom">
                <span>Delete</span>
            </DropdownMenuItem>
        </DropdownMenuGroup>
    </DropdownMenuContent>
</DropdownMenu>
</template>

<script setup lang="ts">
import type { Room, Reservations, reserveResponse, deleteResponse } from '~/types';
const config = useRuntimeConfig()
import { toast } from 'vue-sonner'

const props = defineProps<{
    room?: Room,
    reseravation?: Reservations
    disableDelete?: boolean
}>();

const reservatiSelect = props.reseravation ? props.reseravation : props.room?.reservations
const roomSelect = props.room ? props.room : props.reseravation?.room

async function cancelReserve() {
    const data = await $fetch<reserveResponse>(`${config.public.apiUrl}/reserve/cancel/${reservatiSelect?.id}`)
    if (data.success) {
        await refreshNuxtData()
        toast.success(data.message)
    } else {
        toast.error(data.message)
    }
} 

async function deleteRoom() {
    const data = await $fetch<deleteResponse>(`${config.public.apiUrl}/room/delete/${roomSelect!.id}`, {
        method: "DELETE",
        credentials: "include" 
    })
    if (data.success) {
        await refreshNuxtData()
        toast.success(data.message)
    }
}


</script>