<template>
    <div class="border rounded-md bg-card">
        <Table>
            <TableHeader>
                <TableRow v-for="headerGroup in tbl.getHeaderGroups()" :key="headerGroup.id">
                    <TableHead v-for="header in headerGroup.headers" :key="header.id">
                        <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header" :props="header.getContext()" />
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <template v-if="tbl.getRowModel().rows?.length">
                    <TableRow v-for="row in tbl.getRowModel().rows" :key="row.id" :data-state="row.getIsSelected() ? 'selected' : undefined">
                        <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                            <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                        </TableCell>
                    </TableRow>
                </template>
                <template v-else>
                    <TableRow>
                        <TableCell class="h-24 text-center">No Result</TableCell>
                    </TableRow>
                </template>
            </TableBody>
        </Table>
    </div>
</template>

<script setup lang="ts">
import type { ColumnDef } from '@tanstack/table-core'
import { useVueTable, getCoreRowModel, FlexRender } from '@tanstack/vue-table'
import type { roomResponse, Room } from '~/types'
import meetingRoom from '@/assets/image.png'
import RoomDropdownAction from '../RoomDropdownAction.vue'

const config = useRuntimeConfig()

const router = useRouter()

const colmns: ColumnDef<Room>[] = [
    {
        accessorKey: 'image',
        header: 'Image',
        cell: ({ row }) => {
            const imageUrl = meetingRoom; // Assuming `image` is the key for the image URL in the data
            return h('img', { src: imageUrl, alt: 'Room Image', class: 'h-16 object-cover rounded' });
        },
    },
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row, getValue }) => {
            return getValue()
        }
    },
    // {
    //     accessorKey: 'isReserved',
    //     header: "Reserved"
    // },
    {
        accessorKey: 'action',
        header: 'Action',
        cell: ({ row }) => {
            const room = row.original
            return h('div', { class: 'relative' }, h(RoomDropdownAction, {
                room
            }))
        }
    }
];

const { data } = await useFetch<roomResponse>(`${config.public.apiUrl}/room/getAll`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
})

const tblData = ref(data.value?.data)

watch(data, (newData) => {
    tblData.value = newData?.data
})

const tbl = useVueTable({
  get data() { return tblData.value ?? [] },
  get columns() { return colmns },
  getCoreRowModel: getCoreRowModel(),
})

</script>