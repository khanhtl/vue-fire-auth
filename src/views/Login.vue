<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Login</div>
          <div class="card-body">
            <div v-if="error" class="alert alert-danger">{{ error }}</div>
            <form action="#" @submit.prevent="Login">
              <div class="form-group row mb-4">
                <label for="email" class="col-md-4 col-form-label text-md-right"
                  >Email</label
                >

                <div class="col-md-6">
                  <input
                    id="email"
                    type="email"
                    class="form-control"
                    name="email"
                    value
                    required
                    autofocus
                    v-model="email"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label
                  for="password"
                  class="col-md-4 col-form-label text-md-right"
                  >Password</label
                >

                <div class="col-md-6">
                  <input
                    id="password"
                    type="password"
                    class="form-control"
                    name="password"
                    required
                    v-model="password"
                  />
                </div>
              </div>

              <div class="d-flex mt-4 align-items-center justify-content-center">
                <div>
                  <button type="submit" class="btn btn-primary me-3">Login</button>
                </div>
                <div>
                  <button @click="logInGoogle" type="button" class="btn btn-primary">Login with google</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/store";
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const error = ref(null);

const store = useAuthStore();
const router = useRouter();

const Login = async () => {
  try {
    await store.logIn({
      email: email.value,
      password: password.value,
    });
    router.push("/");
  } catch (err: any) {
    error.value = err.message;
  }
};

async function logInGoogle() {
    try {
    await store.logInGoogle()
    router.push("/");
  } catch (err: any) {
    error.value = err.message;
  }
}
</script>
