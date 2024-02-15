<script setup lang="ts">
import { useRouter } from "vue-router";
import { auth } from "../firebaseConfig";
import { useAuthStore } from "@/store";
import Navbar from "./Navbar.vue";
import { onBeforeMount } from "vue";

const store = useAuthStore();
const router = useRouter();
onBeforeMount(() => {
  auth.onAuthStateChanged((user: any) => {
    store.fetchUser(user);
  });
});

const user = store.user;

const logOut = async () => {
  await store.logOut();
  router.push("/");
};
</script>

<template>
  <div class="container">
    <ul class="nav justify-content-end align-items-center">
      <div class="nav-item me-4" v-if="user.loggedIn">
          <b>{{ user.data.displayName }}</b>
      </div>
      <template v-if="!user.loggedIn">
        <li class="nav-item me-4">
          <RouterLink to="/login">Login</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/register">Register</RouterLink>
        </li>
      </template>
      <li class="nav-item" @click="logOut" v-else>
        Logout
      </li>
    </ul>
  </div>
</template>
