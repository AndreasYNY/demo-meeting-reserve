<script setup lang="ts">
    import { toast } from 'vue-sonner'
    definePageMeta({
        layout: "toast"
    })

    const config = useRuntimeConfig()
    const cookie = useCookie("token", {
        maxAge: 2 * 60 * 60
    })

    const registerState = ref(false)
    const wantAdmin = ref(false)
    const username = ref("")
    const password = ref("")

    interface LoginResponse {
        success: boolean,
        message: string,
        error: string | null,
        data: {
            token: string
        } | null
    }

    async function login() {
        const res = await $fetch<LoginResponse>(`${config.public.apiUrl}/auth/login`, {
            method: "POST",
            body: {
                username: username.value,
                password: password.value,
            }
        })
        if (res.success) {
            cookie.value = res.data?.token
            toast.success("Login Sucessful", {
                description: res.message,
                duration: 2000,
            })
            navigateTo("/dashboard")
        } else {
            toast.error("Login Failed", {
                description: res.error!,
                important: true,
                duration: 2000,
            })
        }
    }

    async function register() {
        const res = await $fetch<LoginResponse>(`${config.public.apiUrl}/auth/register`, {
            method: "POST",
            body: {
                username: username.value,
                password: password.value,
                isAdmin: wantAdmin.value
            }
        })
        if (res.success) {
            toast.success("Register Sucessful", {
                description: res.message,
                duration: 2000,
            })
            registerState.value = false
        } else {
            toast.error("Register Failed", {
                description: res.error!,
                important: true,
                duration: 2000,
            })
        }
    }
</script>

<template>
    <div class="flex justify-center items-center h-screen">
        <Card class="w-[20rem]">
            <CardHeader>
                <span v-if="!registerState">Login</span>
                <span v-else>Register</span>
            </CardHeader>
            <CardContent>
                <div class="flex flex-col gap-5">
                    <div class="flex flex-col gap-1">
                        <Label>Username</Label>
                        <Input v-model="username" @keyup.enter="registerState ? register() : login()"></Input>
                    </div>
                    <div class="flex flex-col gap-1">
                        <Label>Password</Label>
                        <Input v-model="password" type="password" @keyup.enter="registerState ? register() : login()"></Input>
                    </div>
                    <Label v-if="registerState" for="admin"><Checkbox v-model="wantAdmin"  id="admin" /> I want to be admin!</Label>
                    
                </div>
            </CardContent>
            <CardFooter>
                <div class="flex w-full justify-end">
                    <Button @click="registerState = !registerState" variant="ghost">register</Button>
                    <Button @click="login" v-if="!registerState" href="#">Login</Button>
                    <Button @click="register" v-else href="#">Register</Button>
                </div>
            </CardFooter>
        </Card>
    </div>

</template>