<template>
  <div class="q-ma-lg">
    <q-table
      title="All RFQ"
      :rows="rows"
      :hide-header="mode === 'grid'"
      :columns="columns"
      class="sort_tables"
      row-key="id"
      :grid="mode == 'grid'"
      :filter="filter"
      :loading="loading"
      v-model:pagination="pagination"
      @request="onRequest"
    >
      <template v-slot:top-right="props">
        <q-input
          outlined
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-btn
          flat
          round
          dense
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
          v-if="mode === 'list'"
        >
          <q-tooltip :disable="$q.platform.is.mobile">
            {{ props.inFullscreen ? "Exit Fullscreen" : "Toggle Fullscreen" }}
          </q-tooltip>
        </q-btn>

        <q-btn
          flat
          round
          dense
          :icon="mode === 'grid' ? 'list' : 'grid_on'"
          @click="
            mode = mode === 'grid' ? 'list' : 'grid';
            separator = mode === 'grid' ? 'none' : 'horizontal';
          "
          v-if="!props.inFullscreen"
        >
          <q-tooltip :disable="$q.platform.is.mobile">{{
            mode === "grid" ? "List" : "Grid"
          }}</q-tooltip>
        </q-btn>

        <q-btn
          color="primary"
          icon-right="archive"
          label="Export to csv"
          no-caps
          class="export"
          padding="xs"
          v-if="rows.length"
          @click="exportTable"
        />
      </template>
      <template v-slot:body-cell-status="props">
        <div
          v-if="props.row.status === 'pending'"
          class="bg-yellow-10 q-pa-sm text-white"
        >
          Pending
        </div>
        <div
          v-if="props.row.status === 'completed'"
          class="bg-green-10 q-pa-sm text-white"
        >
          Completed
        </div>
      </template>
      <template v-slot:no-data="{ message }">
        <div class="full-width row flex-center text-negative q-gutter-sm">
          <span> {{ message }} </span>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script>
import { Dialog, exportFile, Loading, Notify, useMeta } from "quasar";
import { authAxios } from "src/boot/axios";
const columns = [
  {
    name: "name",
    required: true,
    label: "User Name",
    align: "left",
    field: (row) => `${row.user.name}`,
    sortable: true,
  },

  {
    name: "organization_name",
    required: true,
    label: "Organization name",
    align: "left",
    field: "organization_name",
    sortable: true,
  },
  {
    name: "website",
    required: true,
    label: "Website",
    align: "left",
    field: "website",
    sortable: true,
  },
  {
    name: "email",
    required: true,
    label: "RFQ email",
    align: "left",
    field: "email",
    sortable: true,
  },
  {
    name: "company_details",
    required: true,
    label: "Company details",
    align: "left",
    field: "company_details",
    sortable: true,
  },

  {
    name: "contact_person",
    required: true,
    label: "Contact person",
    align: "left",
    field: "contact_person",
    sortable: true,
  },
  {
    name: "delivery_location",
    required: true,
    label: "Delivery location",
    align: "left",
    field: "delivery_location",
    sortable: true,
  },
  {
    name: "delivery_method",
    required: true,
    label: "Delivery method",
    align: "left",
    field: "delivery_method",
    sortable: true,
  },

  {
    name: "created_at",
    required: true,
    label: "Date",
    align: "left",
    field: (row) =>
      new Date(row.created_at).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    sortable: true,
  },
  // {
  //   name: "actions",
  //   required: true,
  //   label: "Actions",
  //   align: "left",
  //   field: (row) => row.id,
  //   sortable: true,
  // },
];
function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val;
  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);
  formatted = formatted.split('"').join('""');
  return `"${formatted}"`;
}
export default {
  setup() {
    useMeta({
      title: "Payments",
    });
  },
  data() {
    return {
      columns,
      title: "",
      documentSlide: 1,
      selected: [],
      rows: [],
      errors: {},
      viewData: {},
      viewMerchantDetailsDialog: false,
      viewDocumentsDialog: false,
      viewMerchantDetailsObj: {},
      data: {},
      image: null,
      viewDialog: false,
      create_memberDialog: false,
      editstate: false,
      pagination: {
        sortBy: "id",
        descending: false,
        page: 1,
        rowsPerPage: 50,
      },
      filter: "",
      curl: "",
      separator: "",
      mode: "list",
      role: "personels",
      editId: "",
      loading: false,
      loaders: {
        delete: false,
        category: false,
        deleteBtn: [],
        save: [],
      },
    };
  },

  mounted() {
    this.onRequest({
      pagination: this.pagination,
      filter: undefined,
    });
  },
  methods: {
    onRequest(props) {
      // let type = this.$router.currentRoute.value.params.id;
      this.loading = true;
      const url = `rfq`;
      this.curl = url;
      authAxios
        .get(url)
        .then(({ data }) => {
          console.log(data);
          this.loading = false;
          this.rows = data.rfqs.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
        })
        .catch(({ response }) => {
          this.loading = false;
          this.rows = [];
        });
    },

    refreshPage() {
      if (this.curl !== "") {
        this.loading = true;
        this.$authAxios
          .get(this.curl)
          .then(({ data }) => {
            this.loading = false;
            this.rows = data.data;
            // console.log(data);
          })
          .catch(({ response }) => {
            // console.log(response);
            this.loading = false;
            this.rows = [];
          });
      }
    },

    exportTable() {
      // naive encoding to csv format
      // const fieldsToInclude = ["fullname", "specialization", "practice_id"];
      const content = [this.columns.map((col) => wrapCsvValue(col.label))]
        .concat(
          this.rows.map((row) =>
            this.columns
              .map((col) =>
                wrapCsvValue(
                  typeof col.field === "function"
                    ? col.field(row)
                    : row[col.field === void 0 ? col.name : col.field],
                  col.format
                )
              )
              .join(",")
          )
        )
        .join("\r\n");
      const status = exportFile(`Payments`, content, "text/csv");
      if (status !== true) {
        this.$q.notify({
          message: "Browser denied file download...",
          color: "negative",
          icon: "warning",
        });
      }
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
}

p {
  margin-bottom: 0;
}
</style>
