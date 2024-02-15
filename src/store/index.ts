import {
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { defineStore } from "pinia";
import { ref } from "vue";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from 'firebase/auth'

export const useAuthStore = defineStore("counter", () => {
  const user = ref({
    loggedIn: false,
    data: null,
  });

  async function register({ email, password, name }) {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (response) {
      await updateProfile(response.user, { displayName: name });
      user.value.data = response.user;
    } else {
      throw new Error("Unable to register user");
    }
  }

  async function logIn({ email, password }) {
    const response = await signInWithEmailAndPassword(auth, email, password);
    if (response) {
      user.value.data = response.user;
    } else {
      throw new Error("login failed");
    }
  }

  async function logInGoogle() {
    const googleAuthProvider=new GoogleAuthProvider()
    const response=await signInWithPopup(auth, googleAuthProvider);
    if (response) {
      user.value.data = response.user;
    } else {
      throw new Error("login failed");
    }
  }

  async function logOut() {
    await signOut(auth);
    user.value.data = null;
  }

  async function fetchUser(data) {
    user.value.loggedIn = data !== null;
    if (data) {
      user.value.data = {
        displayName: data.displayName,
        email: data.email,
      };
    } else {
      user.value.data = null;
    }
    }
  return {user, fetchUser, register, logOut, logIn, logInGoogle}
});
