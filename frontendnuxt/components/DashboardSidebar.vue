<template>
  <Sidebar collapsible="icon">
    <SidebarHeader>

    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/dashboard">
                  <Inbox class="h-[1.2rem] w-[1.2rem]" />

                  <!-- <Icon icon="radix-icons:dashboard" :ssr="true" class="h-[1.2rem] w-[1.2rem]" /> -->
                  <span>Dashboard</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>Room</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="(item, index) in menuItems" :key="index">
              <SidebarMenuButton asChild>
                <a :href="item.url">
                  <!-- i dont want to deal with hydration -->
                   <Component :is="item.icon" />
                  <!-- <Icon :icon="item.icon" :ssr="true" class="h-[1.2rem] w-[1.2rem]" /> -->
                  <span>{{ item.displayName }}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarGroup v-if="Boolean(decryptedCookie.isAdmin)">
        <SidebarGroupLabel>Admin</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/dashboard/room/manage">
                  <Inbox class="h-[1.2rem] w-[1.2rem]" />
                  <span>Manage Rooms</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton class="cursor-pointer">
                  <User class="h-[1.2rem] w-[1.2rem]" />
                  <span>{{ decryptedCookie.username }}</span>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <a class="w-full cursor-pointer flex gap-2 items-center h-full" @click="logout">
                    <span>Logout</span>
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
</template>

<script lang="ts" setup>
import { decodeJwt } from 'jose'
import { toast } from 'vue-sonner'
import { Inbox, CalendarDays, ClockFading, School, User } from 'lucide-vue-next'
const cookie = useCookie('token')

const decryptedCookie = decodeJwt(cookie.value!)

function logout() {
  cookie.value = null
  toast('Logout Successful', {
    description: 'You have been logged out',
    duration: 2000,
  })
  navigateTo('/login')
}

const menuItems = [
  { displayName: 'Room', url: '/dashboard/room', icon: School },
  // { displayName: 'Reserve', url: '/dashboard/room/reserve', icon: CalendarDays },
  // { displayName: 'History', url: '/dashboard/room/history', icon: ClockFading },
]

</script>