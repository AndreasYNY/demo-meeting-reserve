<template>
    <Dialog>
        <DialogTrigger class="w-full" asChild>
            <Button class="w-full h-[3rem] cursor-pointer" variant="outline">
                Create New Room
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create new Room</DialogTitle>
            </DialogHeader>
            <div class="flex flex-col gap-2">
                <Label for="roomName">Room name</Label>
                <Input @keyup.enter="createRoom" v-model="newRoomName" id="roomName"></Input>
            </div>
            <DialogFooter>
                <Button @click="createRoom">Create</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'
import type { tokenResponse } from '~/types'

const newRoomName = ref("")
const config = useRuntimeConfig()

async function createRoom() {
    const res = await $fetch<tokenResponse>(`${config.public.apiUrl}/room/create`, {
        method: "POST",
        body: {
            name: newRoomName.value,
        }
    })
    if (res.success) {
        await refreshNuxtData()
        toast.success(res.message)
        newRoomName.value = ""
    } else {
        toast.error(res.error!)
    }
}
</script>