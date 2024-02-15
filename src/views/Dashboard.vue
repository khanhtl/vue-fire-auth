<template>
  <div class="container">
    <div v-if="user.loggedIn">Welcome, {{ user?.data?.displayName }}</div>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/store";

const store = useAuthStore();

const user = store.user
</script>
