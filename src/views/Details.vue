<template>
  <a-row>
    <a-col span="8" offset="8">
      <router-link to="/clients">Back</router-link>
      <a-card :loading="loading" title="Client Detail">
        <div>
          Looking for client: {{ this.$route.params.id }}
          <p>{{ client.id }}</p>
          <p>{{ client.name }}</p>
          <p>{{ client.email }}</p>
          <p>{{ client.retainer_fee }}</p>
          <p>{{ client.updated_at }}</p>
          <p>{{ client.created_at }}</p>
        </div>
      </a-card>
    </a-col>
  </a-row>
</template>
<script>
import { Card, message, Row, Col } from "ant-design-vue";
import { onMounted, ref } from "@vue/runtime-core";
import { getClientDetail } from "../api";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
export default {
  components: { Card, message, Row, Col },
  setup() {
    const loading = ref(true);
    const client = ref({});
    const route = useRoute();
    const store = useStore();
    onMounted(() => {
      getClientDetail(route.params.id, store.state.auth.token)
        .then((res) => {
          loading.value = false;
          client.value = res.data.client;
          successMessage(res.data.message);
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
    return { client, loading };
  },
};
</script>