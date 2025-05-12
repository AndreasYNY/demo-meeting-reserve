<script setup lang="ts">
import { Toaster } from '~/components/ui/sonner';
import { Sun, Moon } from 'lucide-vue-next';
const colorMode = useColorMode()
</script>

<template>
  <Toaster position="top-right" />
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline">
        <!-- <Moon class="rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <Sun class="absolute rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" /> -->
        <span class="sr-only">Toggle theme</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="colorMode.preference = 'light'">
        Light
      </DropdownMenuItem>
      <DropdownMenuItem @click="colorMode.preference = 'dark'">
        Dark
      </DropdownMenuItem>
      <DropdownMenuItem @click="colorMode.preference = 'system'">
        System
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
