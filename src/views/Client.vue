<template>
  <div class="container">
    <a-table
      :row-key="(record) => record.id"
      :loading="loading"
      :dataSource="clients"
      :columns="columns"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'name'">
          <router-link :to="`/client/${record.id}`">{{
            record.name
          }}</router-link>
        </template>
        <template v-else-if="column.key === 'action'">
          <span>
            <router-link :to="{ path: `/client/${record.id}/edit` }"
              ><a>Edit</a></router-link
            >
            <a-divider type="vertical" />
            <a @click="showDeleteConfirm(record.id, record.name)">Delete</a>
            <!-- <a-popconfirm
              :title="`Are you sure delete client ${record.name}?`"
              ok-text="Yes"
              cancel-text="No"
              @confirm="deleteClient(record.id)"
              @cancel="cancel"
            >
              <a>Delete</a>
            </a-popconfirm> -->
          </span>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script>
import { getAllClient, deleteClient } from "../api";
import { DownOutlined, ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { message, Table, Divider, Spin, Modal } from "ant-design-vue";
import { ref } from "@vue/reactivity";
import { createVNode, onMounted } from "@vue/runtime-core";

export default {
  components: {
    DownOutlined,
    ExclamationCircleOutlined,
    message,
    Table,
    Divider,
    Spin,
    Modal,
  },
  methods: {
    deleteClient(id) {},
    cancel() {},
  },
  created() {},
  setup() {
    const clients = ref([]);
    const loading = ref(true);
    const columns = [
      { title: "#", dataIndex: "id", key: "id" },
      { title: "Name", dataIndex: "name", key: "name" },
      { title: "Email", dataIndex: "email", key: "email" },
      {
        title: "Retainer Fee",
        dataIndex: "retainer_fee",
        key: "retainer_fee",
      },
      { title: "Updated At", dataIndex: "updated_at", key: "update_at" },
      { title: "Created At", dataIndex: "created_at", key: "create_at" },
      { title: "Action", key: "action" },
    ];
    const getClients = () => {
      getAllClient()
        .then((res) => {
          clients.value = res.data.clients;
          loading.value = false;
        })
        .catch((error) => {
          loading.value = false;
          if (error.response) {
            errorMessage(error.response.data.error);
          }
        });
    };
    onMounted(() => {
      getClients();
    });
    const errorMessage = (msg) => {
      message.error(msg);
    };
    const showDeleteConfirm = (id, name = "") => {
      Modal.confirm({
        title: "Are you sure delete this client?",
        icon: createVNode(ExclamationCircleOutlined),
        content: `Name: ${name}`,
        okText: "Yes",
        okType: "danger",
        cancelText: "No",

        onOk() {
          deleteClient(id)
            .then((res) => {
              message.success(res.data.message);
              getClients();
            })
            .catch((error) => {
              if (error.response) errorMessage(error.response.data.error);
            });
        },

        onCancel() {
          console.log("Cancel");
        },
      });
    };
    return {
      clients,
      columns,
      loading,
      showDeleteConfirm,
    };
  },
};
</script>
<style scoped>
.spinner {
  text-align: center;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 30px 50px;
  margin: 20px 0;
}
</style>