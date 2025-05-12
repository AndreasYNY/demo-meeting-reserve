<template>
    <SidebarProvider>
        <DashboardSidebar />
        <main class="p-[1rem] flex flex-col gap-5 w-full">
            <Toaster position="top-right" />
            <div class="flex items-center">
              <SidebarTrigger  class="cursor-pointer" />
              <span class="mx-2 grow">&nbsp;</span>
              <!-- <Breadcrumb class="grow">
                <BreadcrumbList>
                    <BreadcrumbItem v-for="item in breadcrumbItems">
                        <BreadcrumbLink v-if="item.name === 'dashboard'" :href="item.url">
                          <Icon icon="radix-icons:dashboard" :ssr="true" />
                        </BreadcrumbLink>
                        <BreadcrumbLink v-else :href="item.url">{{ '&nbsp&gt&nbsp' + item.name }}</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb> -->
              <!-- <DarkToggle /> -->
            </div>
            <NuxtPage />
        </main>
    </SidebarProvider>
</template>

<script lang="ts" setup>
// import { Icon } from '@iconify/vue'

// const route = useRoute()
// const breadcrumbItems = route.path
//   .slice(1)
//   .split('/')
//   .map((item, index, arr) => ({
//     name: item,
//     url: '/' + arr.slice(0, index + 1).join('/')
//   }));

</script>