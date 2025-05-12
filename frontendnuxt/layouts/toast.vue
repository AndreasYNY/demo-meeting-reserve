<template>
    <main>
        <Toaster position="top-right" />
        <div class="flex justify-center items-center h-screen">
            <NuxtPage />
        </div>
    </main>
</template>

<script setup lang="ts">
    import { Toaster } from '~/components/ui/sonner';
</script>