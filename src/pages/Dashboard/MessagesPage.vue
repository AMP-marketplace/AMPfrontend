<template>
  <div
    style="height: 70vh"
    class="loader column justify-center items-center"
    v-if="loadingCol"
  >
    <div>
      <q-spinner-comment color="primary" size="5em" />
    </div>
  </div>
  <div v-if="!loadingCol" class="wrapp">
    <div class="top">
      <span class="title">
        <img style="width: 40px" src="/images/messages.svg" alt="" />
        Messages | {{ rows.length }}
      </span>

      <div class="sort_area">
        <q-btn flat class="active">Recent </q-btn>
        <q-btn flat class="regular"> Expired </q-btn>
        <q-btn flat class="regular"> Archived </q-btn>
      </div>
    </div>
    <div v-if="rows.length" class="style q-py-md">
      <q-table
        :rows="rows"
        :hide-header="mode === 'grid'"
        :columns="columns"
        row-key="id"
        :grid="mode == 'grid'"
        :filter="filter"
        v-model:pagination="pagination"
        :loading="loading"
        class="my_table"
        @request="onRequest"
      >
        <template v-slot:body-cell-user="props">
          <q-td :props="props">
            <!-- {{ props.row }} -->
            <div @click="getConversations(props.row.slug)" class="name_row">
              <q-avatar size="50px" class="shadow-10">
                <img
                  :src="
                    props.row.image_url
                      ? props.row.image_url
                      : '/images/usersvg.svg'
                  "
                />
              </q-avatar>
              <div class="name">
                <div class="name_top">
                  {{ props.row.customer.name }}
                </div>
                <div class="name_down">
                  {{ props.row.customer.email }}
                </div>
                <div class="name_last">
                  {{ props.row.customer.phone }}
                </div>
              </div>
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-addedOn="props">
          <q-td :props="props">
            <div class="added">
              {{
                new Date(props.row.created_at).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              }}
            </div>
          </q-td>
        </template>

        <template v-slot:no-data="{ message }">
          <div class="full-width row flex-center text-negative q-gutter-sm">
            <span> {{ message }} </span>
          </div>
        </template>
      </q-table>
    </div>

    <div v-else class="empty">
      <img src="/images/empty.svg" alt="" />

      <div class="empty_text">You currently have no notifications</div>
    </div>

    <q-dialog v-model="chatDialog" class="chatDialog" persistent>
      <div>
        <chat-page
          :conversationMessages="conversationMessages"
          :conversationDetails="conversationDetails"
          @closeModal="closeModalToggle"
          :product="productData"
        />
      </div>
    </q-dialog>
  </div>
</template>

<script setup>
import { Loading, useMeta } from "quasar";
import { onMounted, ref } from "vue";
import ChatPage from "src/components/ChatPage.vue";
import { authAxios } from "src/boot/axios";
const columns = [
  {
    name: "user",
    required: true,
    label: "Messages",
    align: "left",
    field: (row) => row.user,
    sortable: true,
  },
  {
    name: "addedOn",
    required: true,
    // label: "Added On",
    align: "right",
    field: (row) => row.name,
    sortable: true,
  },
];
useMeta({
  title: "Messages",
});

let rows = ref([]);
let errors = ref([]);
let loadingBtn = ref(false);
let rowData = ref({});
let data = ref({});
let conversationDetails = ref({});
let productData = ref({});
let conversationMessages = ref([]);
let chatDialog = ref(false);
let filter = ref("");
let curl = ref("");
let separator = ref("");
let mode = ref("list");
let loading = ref(false);
let loadingCol = ref(true);
let editLoad = ref(false);
let thisId = ref("");
let pagination = ref({
  sortBy: "id",
  descending: false,
  page: 1,
  rowsPerPage: 5,
  // rowsNumber: 100,
});
let loaders = ref({
  delete: false,
  category: false,
  deleteBtn: [],
  save: [],
});

let closeModalToggle = () => {
  chatDialog.value = false;
};
let onRequest = (props) => {
  loadingCol.value = true;
  const url = `chat/index/all`;
  curl = url;
  authAxios
    .get(url)
    .then(({ data }) => {
      console.log(data);
      loadingCol.value = false;
      rows.value = data.data;
    })
    .catch(({ response }) => {
      loadingCol.value = false;
      rows.value = [];
    });
};

let getConversations = (id) => {
  Loading.show();
  authAxios
    .get(`chat/${id}`)
    .then((response) => {
      Loading.hide();
      conversationDetails.value = response.data.data;
      chatDialog.value = true;
    })
    .catch(({ response }) => {
      loadingBtn.value = false;
      Loading.hide();
      errors.value = response.data.errors || {};
    });
};

let subscribeToChannel = (id) => {
  // console.log(id);
  const channel = window.Echo.join(`message.${id.id}`);

  channel.listen("message", (event) => {
    console.log("Received new message:", event.message);
    conversationMessages.push(event.message);
  });
};

let toggleModal = (props) => {
  rowData = props;
  advertdialog = true;
  // console.log(props);
};

onMounted(() => {
  onRequest();
});
</script>

<style lang="scss" scoped>
// .wrapp {
//   margin: 2rem 1.5rem;
// }

.title {
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #000000;
  margin: 1.5rem 1.5rem;
}

.sort_area {
  // background: #f5f5f5;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
  display: flex;
  justify-content: space-between;
  padding: 1rem 1.7rem;
  margin: 0.8rem 0;
}

.style {
  margin: 2rem 1.5rem;
}

.sort_area .left {
  display: flex;
  align-items: center;
  gap: 2rem;
  // padding-bottom: 1rem;
}

.sort_area .right .sort_by_date {
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #000000;
  background: #f3f3f3;
  border: 1px solid #c7c7c7;
  border-radius: 5px;
}

.sort_area .active {
  width: 107px;
  height: 34px;
  font-weight: 700;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  color: #ffffff;
  // margin-bottom: 1rem;

  background: #1f7bb5;
  border-radius: 17px;
}
.sort_area .regular {
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  color: #666666;
}

.sort_area .regular::before {
  box-shadow: none;
}

.sort_area .regular.boosted {
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  color: #ffffff;
  background: #03ae1e;
  border-radius: 17px;
}

.sort_area .right .q-btn {
  width: 215px;
  height: 34px;
}
.sort_area .right .q-btn::before {
  box-shadow: none;
}

// table

.actn_btn {
  width: 40px;
  height: 40px;
  border: 1px solid #b0b0b0 !important;
  border-radius: 22.5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.name_row {
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 1rem;
}

.input_area {
  position: relative;
}

.input_area .inp_wra {
  background: #f6f6f6;
  border: 1px solid #e8e8e8;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  border-radius: 100px;
  padding: 0.3rem 0.8rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  margin: 2rem 0rem 0;
  justify-content: space-between;
}
.input_area .inp_wra input {
  border: none;

  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: #9a9a9a;
  background: transparent;
  width: 100%;
}
.input_area .inp_wra i:first-of-type {
  color: rgba(31, 123, 181, 0.73);
}
.input_area .inp_wra i:last-of-type {
  background: #1f7bb5;
  color: #fff;
  width: 40px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}

.added {
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  color: #b0b0b0;
}

.name_top {
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #000000;
}
.name_down {
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  // text-transform: capitalize;
  color: #1f7bb5;
}

.name_down.act {
  font-weight: 700;
}
.name_last {
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  color: #64737c;
}

// dialog

.card {
  min-width: 363px;
  background: #ffffff;
  box-shadow: 0px 0px 60px rgba(0, 0, 0, 0.4);
  border-radius: 4px;
  // width: 366px;
  // height: 522px;
}

.dialog_content {
  background: #ffffff;
  box-shadow: 0px 0px 60px rgba(0, 0, 0, 0.4);
  border-radius: 4px;
  padding: 1rem;
  position: relative;
}
.dialog_content .dialog_top {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin: 1rem 0;
}

.dialog_content .dialog_top.advert:nth-child(1) {
  border-bottom: 1px solid #c3c3c3b2;
}

.dialog_content .dialog_top img {
  border: 3px solid #1f7bb5;
  border-radius: 26.5px;
  width: 53px;
  height: 53px;
}

.chatArea {
  background: rgba(31, 123, 181, 0.28);
  border-radius: 0px 0px 9px 9px;
  padding: 1.4rem 0.5rem;
}
p.today {
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;

  color: #1f7bb5;
}

.dialog_content .boost .q-btn {
  width: 100%;

  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  color: #ffffff;
  background: #1f7bb5;
  border-radius: 5px;
  // text-transform: capitalize;
}

.dialog_content .boost {
  padding: 0.5rem 0;
}

.dialog_content .close {
  position: absolute;
  top: 1%;
  right: 2%;
  color: #979797;
  font-size: 1rem;
}
.dialog_content .close i {
  color: #979797;
  font-size: 1.3rem;
}
.dialog_content .close::before {
  box-shadow: none;
}

p.advert {
  font-weight: 600;
  font-size: 20px;
  line-height: 27px;
  color: #000000;
}

@media (max-width: 500px) {
  .title {
    margin: 1.4rem 1.5rem;
  }
}
</style>
