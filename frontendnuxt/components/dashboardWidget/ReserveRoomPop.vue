<template>
    <Dialog>
        <DialogTrigger asChild>
            <Button href="" class="w-full" variant="outline">Reserve a Meeting Room</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Reserve Room</DialogTitle>
                <DialogDescription>
                    Reserve your meeting room.
                </DialogDescription>
            </DialogHeader>
            <ScrollArea class="border rounded-md p-2 whitespace-nowrap overflow-x-scroll">
                <Label>Available Meeting Rooms:</Label>
                <RadioGroup v-model="selectedRoomId" defaultValue="0">
                    <div v-if="data" class="flex space-x-2 w-max">
                        <div v-for="(room, index) in data.data" :key="index">
                            <Label :for="`${index}`" class="cursor-pointer">
                                <Card>
                                    <CardContent>
                                        <RadioGroupItem :id="`${index}`" :value="room.id" />
                                        <img :src="meetingRoom"
                                            class="border-black border aspect-video rounded w-[10rem]" alt="">
                                        <div class="mt-3">
                                            <CardTitle>{{ room.name }}</CardTitle>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Label>
                        </div>
                    </div>
                </RadioGroup>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" :class="cn(
                        'w-max justify-start text-left font-normal',
                        !valueStart && 'text-muted-foreground',
                    )">
                        <CalendarIcon class="mr-2 h-4 w-4" />
                        {{ valueStart ? df.format(valueStart.toDate(getLocalTimeZone())) : "Pick a date" }}
                        {{ valueEnd ? "to " + endTimeDf.format(valueEnd.toDate(getLocalTimeZone())) : "" }}
                    </Button>
                </PopoverTrigger>
                <PopoverContent class="w-auto p-0">

                    <Calendar v-model="valueStart" initial-focus />
                    <div class="flex gap-2 p-4 justify-center">
                        <div>
                            <Label>Start Time</Label>
                            <Input v-model="startTime" class="w-max" type="time" />
                        </div>

                        <div>
                            <Label>End Time</Label>
                            <Input v-model="endTime" class="w-max" type="time" />
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
            <DialogFooter>
                <Button @click="reserveRoom" type="submit" class="w-full cursor-pointer"
                    variant="default">Reserve</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import meetingRoom from '@/assets/image.png'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
    CalendarDateTime,
    DateFormatter,
    getLocalTimeZone,
} from '@internationalized/date'
import { CalendarIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import type { roomResponse, reserveResponse } from '~/types'

const config = useRuntimeConfig()

const df = new DateFormatter('en-US', {
    timeZone: getLocalTimeZone(),
    dateStyle: 'long',
    timeStyle: 'short',
})

const endTimeDf = new DateFormatter('en-US', {
    timeZone: getLocalTimeZone(),
    timeStyle: 'short',
})

const valueStart = ref<CalendarDateTime>()
const valueEnd = ref<CalendarDateTime>()
const selectedRoomId = ref<number>()

const startTime = ref()
const endTime = ref()

watch([startTime, endTime], ([startTime2, endTime2]) => {
    if (valueStart.value && startTime2) {
        const date = valueStart.value.toDate(getLocalTimeZone())
        const [hours, minutes] = startTime.value.split(':').map(Number)
        const newValue = new CalendarDateTime(date.getFullYear(), date.getMonth() + 1, date.getDate(), hours, minutes)
        valueStart.value = newValue
    }

    if (endTime2 && valueStart.value) {
        const date = valueStart.value!.toDate(getLocalTimeZone())
        const [hours, minutes] = endTime.value.split(':').map(Number)
        const newValueEnd = new CalendarDateTime(date.getFullYear(), date.getMonth() + 1, date.getDate(), hours, minutes)
        valueEnd.value = newValueEnd
    }
})

const { data } = await useFetch<roomResponse>(`${config.public.apiUrl}/room/getAll`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
})

async function reserveRoom() {
    const roomId = selectedRoomId.value
    const startTimeValue = valueStart.value
    const endTimeValue = valueEnd.value

    if (roomId && startTimeValue && endTimeValue) {
        const data = await $fetch<reserveResponse>(`${config.public.apiUrl}/reserve`, {
            method: 'POST',
            credentials: 'include',
            body: {
                roomId,
                startTime: new Date(startTimeValue.toString()),
                endTime: new Date(endTimeValue.toString()),
            },
        })
        if (data.success) {
            await refreshNuxtData()
            toast.success(data.message)
        } else {
            toast.error(data.message)
        }
    } else {
        toast.error('Please select a room and time.')
    }
}
</script>