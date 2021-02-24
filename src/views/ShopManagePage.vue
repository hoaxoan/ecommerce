<template>
    <div class="content-wrapper clearfix m-2">
        <!-- Table Container Card -->
        <b-card
        no-body
        class="mb-0"
        >

        <div class="m-2">

            <!-- Table Top -->
            <b-row>
            <b-col
                cols="12"
                md="12"
            >
                <div class="d-flex align-items-end justify-content-end">
                    <b-button type="submit" variant="primary" @click.stop.prevent="openRegisterShop(null)">Add Shop</b-button>
                </div>
            </b-col>
            </b-row>

        </div>

        <!-- Table -->
        <div class="m-2">
          <b-table
              id="shops-table"
              class="position-relative"
              :items="shops.items"
              :per-page="perPage"
              :current-page="currentPage"
              responsive
              :fields="tableColumns"
              primary-key="id"
              show-empty
              empty-text="No matching records found"
          >

              <!-- Column: Image -->
              <template #cell(image)="data">
                  <b-media vertical-align="center">
                      <template #aside>
                      <b-avatar rounded
                          size="32"
                          :src="data.item.imageUrl"
                      />
                      </template>
                  </b-media>
              </template>

              <!-- Column: status -->
              <template #cell(status)="data">
                   <b-badge pill
                      :key="data.item.id"
                      variant="success"
                      class="text-capitalize"
                    >
                      Active
                    </b-badge>
              </template>

              <!-- Column: Action -->
              <template
                #cell(actions)="data"
                class="text-center"
              >
                <div class="text-center">
                  <feather-icon icon="EditIcon"  @click.stop.prevent="openRegisterShop(data.item)" />
                </div>
              </template>

          </b-table>
        </div>
        
        <div class="mx-2 mb-2">
            <b-row>
                <!-- Pagination -->
                <b-col
                    cols="12"
                    sm="6"
                    class="d-flex align-items-center justify-content-center justify-content-sm-end"
                >

                    <b-pagination
                    aria-controls="shops-table"
                    v-model="currentPage"
                    :total-rows="shops.totalRecords"
                    :per-page="perPage"
                    first-number
                    last-number
                    class="mb-0 mt-1 mt-sm-0"
                    prev-class="prev-item"
                    next-class="next-item"
                    >
                    <template #prev-text>
                        <feather-icon
                        icon="ChevronLeftIcon"
                        size="18"
                        />
                    </template>
                    <template #next-text>
                        <feather-icon
                        icon="ChevronRightIcon"
                        size="18"
                        />
                    </template>
                    </b-pagination>

                </b-col>

            </b-row>
        </div>
        </b-card>        
    </div>
</template>

<script>
import { BCard, BRow, BCol, BTable, BMedia, BAvatar, BPagination, } from 'bootstrap-vue'

export default {
  name: "ProductManagePage", 
  components: {
    BCard,
    BRow,
    BCol,
    BTable,
    BMedia,
    BAvatar,
    BPagination,
  },
  data: () => ({
    shops: {
        items: [],
        nextToken: null,
        totalRecords: 0
    },   
    tableColumns: [],
    currentPage: 1,
    nextToken: null,
    nextNextToken: null,
    previousTokens: [],
    perPage: 10,
    sortDirection: 'id',
  }),

  async mounted() {
    // Table Handlers
    this.tableColumns = [
        { key: 'name', label: 'Shop Name', sortable: true},
        { key: 'username', label: 'User Name', sortable: true},
        { key: 'totalProducts', label: 'Total Products'},
        { key: 'status', label: 'Status'},
        { key: 'actions', label: 'Action' },
    ];


    this.getShops();
  },
  methods: {
    openRegisterShop(product) {
        if (product == null) {
            this.$router.push(`/add-shop/-1`);
        } else {
            this.$router.push(`/add-shop/${product.id}`);
        }
    },

    async getShops() {
        const variables = {
            limit: this.perPage,
            sortDirection: this.sortDirection,
        };

        if (this.nextToken != null)
            variables.nextToken = this.nextToken;

        this.shops = await this.$store.dispatch("shops/getShopsPagination", variables);

        this.previousTokens.push(this.nextToken);
        this.nextNextToken = this.shops.nextToken;
    },
  }
};
</script>
