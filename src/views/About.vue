<template>
  <div class="about">
    <a-typography-title>About</a-typography-title>
    <a-button type="primary" @click="createClient">Create Client</a-button>
    <p>{{ $store.state.count }}</p>
    <Table />
  </div>
</template>

<script>
import Table from "@/components/Table.vue";
import { TypographyTitle, Button } from "ant-design-vue";
export default {
  components: { Table, TypographyTitle, Button },
  methods: {
    createClient() {
      this.$router.push("/client");
    },
  },
};
</script>

<style scoped>
.about {
  text-align: center;
}
</style>