<template>
  <a-row>
    <a-col span="10" offset="8">
      <router-link to="/clients">Back</router-link>
      <a-card :loading="loading" title="Client Detail">
        <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
          Looking for client: {{ this.$route.params.id }}
          <a-form-item label="Name">
            <a-input v-model:value="client.name" />
          </a-form-item>
          <a-form-item label="Email">
            <a-input v-model:value="client.email" />
          </a-form-item>
          <a-form-item label="Retainer Fee">
            <a-input v-model:value="client.retainer_fee" />
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" :loading="updateLoading" @click="onSubmit"
              >Update</a-button
            >
          </a-form-item>
        </a-form>
      </a-card>
    </a-col>
  </a-row>
</template>
<script>
import { Card, message, Row, Col, Input } from "ant-design-vue";
import { onMounted, ref } from "@vue/runtime-core";
import { getClientDetail, updateClient } from "../api";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { reactive, toRaw } from "vue";
export default {
  components: { Card, message, Row, Col, Input },
  setup() {
    const updateLoading = ref(false);
    /*const formState = reactive({
      name: "",
      email: "",
      retainer_fee: 0,
    });*/

    const onSubmit = () => {
      updateLoading.value = true;
      console.log("submit!", toRaw(client.value));
      updateClient(client.value)
        .then((res) => {
          successMessage(res.data.message);
          updateLoading.value = false;
        })
        .catch((error) => {
          updateLoading.value = false;
          if (error.response) {
            errorMessage(error.response.data.error);
          }
        });
    };

    const loading = ref(true);
    const client = ref({});
    //const message = ref("");
    const route = useRoute();
    const store = useStore();
    onMounted(() => {
      getClientDetail(route.params.id, store.state.auth.token)
        .then((res) => {
          loading.value = false;
          client.value = res.data.client;
          message.value = res.data.message;
          //successMessage(res.data.message);
        })
        .catch((error) => {
          loading.value = false;
          if (error.response) {
            errorMessage(error.response.data.error);
          }
        });
    });

    const successMessage = (msg) => {
      message.success(msg);
    };
    const errorMessage = (msg) => {
      message.error(msg);
    };
    return {
      client,
      loading,
      onSubmit,
      updateLoading,
    };
  },
};
</script>
