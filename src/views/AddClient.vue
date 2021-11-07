<template>
  <a-row>
    <a-col span="10" offset="8">
      <router-link to="/clients">Back</router-link>
      <a-card title="Create new Client">
        <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
          <a-form-item label="Name">
            <a-input v-model:value="formState.name" />
          </a-form-item>
          <a-form-item label="Email">
            <a-input v-model:value="formState.email" />
          </a-form-item>
          <a-form-item label="Retainer Fee">
            <a-input v-model:value="formState.retainer_fee" />
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" :loading="createLoading" @click="onSubmit"
              >Create</a-button
            >
          </a-form-item>
        </a-form>
      </a-card>
    </a-col>
  </a-row>
</template>
<script>
import { Card, message, Row, Col, Input } from "ant-design-vue";
import { ref } from "@vue/runtime-core";
import { createClient } from "../api";
import { reactive, toRaw } from "vue";
export default {
  components: { Card, message, Row, Col, Input },
  setup() {
    const createLoading = ref(false);
    const formState = reactive({
      name: "",
      email: "",
      retainer_fee: undefined,
    });

    const onSubmit = () => {
      createLoading.value = true;
      console.log("submit!", toRaw(formState));
      createClient(formState)
        .then((res) => {
          successMessage(res.data.message);
          createLoading.value = false;
        })
        .catch((error) => {
          createLoading.value = false;
          if (error.response) {
            errorMessage(error.response.data.error);
          }
        });
    };

    const successMessage = (msg) => {
      message.success(msg);
    };
    const errorMessage = (msg) => {
      message.error(msg);
    };
    return {
      formState,
      onSubmit,
      createLoading,
    };
  },
};
</script>
