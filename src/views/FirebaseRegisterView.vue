<template>
    <div class="fb-container">
        <h1>Create an Account</h1>
        <p><input type="text" placeholder="Email" v-model="email" /></p>
        <p><input type="password" placeholder="Password" v-model="password" /></p>
        <button @click="register" class="color-black"> save to Firebase</button>
    </div>
</template>
<script setup>
import { ref } from "vue"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "vue-router"
const email = ref('')
const password = ref("")
const router = useRouter()
const auth = getAuth()
const register = () => {
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((data) => {
            console.log("Firebase Register Successful!")
            router.push("/FireLogin")
        }).catch((error) => {
            console.log(error.code);
        })
}
</script>

<style>
.color-black {
    color: black;
}

.fb-container {
    width: 100%;
    padding: 48px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>