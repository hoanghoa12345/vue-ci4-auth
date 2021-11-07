<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<template>
  <a-layout>
    <a-layout-header>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1"
          ><router-link to="/">Home</router-link></a-menu-item
        >
        <a-menu-item key="2"
          ><router-link to="/about">About</router-link></a-menu-item
        >
        <a-menu-item key="3"
          ><router-link to="/clients">Clients</router-link></a-menu-item
        >
        <a-menu-item key="4"
          ><router-link to="/client">Create</router-link></a-menu-item
        >
      </a-menu>
    </a-layout-header>
    <a-layout-content><router-view /></a-layout-content>
    <a-layout-footer style="text-align: center"
      >Copyright &copy; 2021</a-layout-footer
    >
  </a-layout>
</template>
<style>
</style>  
<script>
import axios from "axios";
import { Layout, Menu, MenuItem } from "ant-design-vue";
import { ref } from "@vue/reactivity";
export default {
  components: { Layout, Menu, MenuItem },
  created() {
    console.log("app created");
    axios.defaults.baseUrl = import.meta.env.VITE_API_URL;
    const token = this.$store.state.auth.token;
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    axios.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          // if you ever get an unauthorized, logout the user
          this.$store.dispatch(AUTH_LOGOUT);
          // you can also redirect to /login if needed !
          this.$router.push("/login");
        }
        throw err;
      });
    });
  },
  setup() {
    return {
      selectedKeys: ref(["1"]),
    };
  },
};
</script>
