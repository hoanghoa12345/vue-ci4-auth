<template>
  <div class="container">
    <a-typography-title>Login</a-typography-title>
    <a-form :label-col="{ span: 8 }" :wrapper-col="{ span: 8 }">
      <a-form-item label="Email">
        <a-input v-model:value="email" placeholder="email" />
      </a-form-item>
      <a-form-item label="Password">
        <a-input
          v-model:value="password"
          placeholder="password"
          type="password"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 8, offset: 8 }">
        <a-button type="primary" :loading="onload" block @click="loginHandler"
          >Login</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import { AUTH_REQUEST } from "../store/actions/auth";
import {
  Form,
  FormItem,
  Button,
  Input,
  TypographyTitle,
  message,
} from "ant-design-vue";
export default {
  components: { Form, FormItem, Button, Input, TypographyTitle, message },
  data() {
    return {
      onload: false,
      email: "hoanghoa@gmail.com",
      password: "12345678",
    };
  },
  methods: {
    loginHandler(e) {
      e.preventDefault();
      this.onload = true;
      const { email, password } = this;
      this.$store
        .dispatch(AUTH_REQUEST, { email, password })
        .then(() => {
          this.$router.push(this.$route.query.redirect || "/");
          this.$forceUpdate();
        })
        .catch((error) => {
          if (error.response) message.error(error.response.body.error);
        });

      // login(this.email, this.password)
      //   .then((data) => {
      //     const { user, access_token } = data;
      //     this.setUser(user);
      //     this.setToken(access_token);
      //     localStorage.setItem("auth", JSON.stringify(data));
      //     this.$router.push("/");
      //   })
      //   .catch((error) => {
      //     alert("Failure:");
      //     console.error("Error:", error);
      //   });
    },
  },
};
</script>
<style scoped>
.container {
  text-align: center;
}
</style>