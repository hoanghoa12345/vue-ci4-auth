<template>
  <a-row>
    <a-col span="8" offset="8">
      <img alt="Vue logo" src="../assets/logo.png" />
    </a-col>
  </a-row>
  <a-row>
    <a-col span="8" offset="8">
      <router-link v-if="!isAuthenticated" to="/login">Login</router-link>
      <br />
      <a-button type="primary" danger @click="showConfirm">Logout</a-button>
    </a-col>
  </a-row>
</template>
<script>
import { mapGetters, useStore } from "vuex";
import { AUTH_LOGOUT } from "../helper/constants";
import { Modal, Button, Row, Col } from "ant-design-vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { createVNode } from "@vue/runtime-core";
import { useRouter } from "vue-router";

export default {
  components: { ExclamationCircleOutlined, Modal, Button, Row, Col },
  computed: {
    ...mapGetters(["isAuthenticated"]),
  },
  methods: {
    logout() {
      this.$store.dispatch(AUTH_LOGOUT).then(() => {
        this.$router.push("/login");
      });
    },
  },

  // created() {
  //   const auth = localStorage.getItem("auth");
  //   if (!auth) this.$router.push("/login");
  //   else {
  //     const { user, access_token } = JSON.parse(auth);
  //     this.setUser(user);
  //     this.setToken(access_token);
  //   }
  // },

  setup() {
    const store = useStore();
    const router = useRouter();
    const showConfirm = () => {
      Modal.confirm({
        title: "Do you Want to logout?",
        icon: createVNode(ExclamationCircleOutlined),
        content: createVNode(
          "div",
          { style: "color:red;" },
          "Delete this session"
        ),
        onOk() {
          store.dispatch(AUTH_LOGOUT).then(() => {
            router.push("/login");
          });
        },
        onCancel() {
          console.log("Cancel");
        },
        class: "test",
      });
    };
    return { showConfirm };
  },
};
</script>
<style scoped>
.ant-row {
  text-align: center;
}
</style>