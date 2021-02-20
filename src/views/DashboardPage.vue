<template>
  <div class="content-wrapper clearfix m-2">
    <b-card no-body class="mb-0">

      <div class="content-wrapper p-4">

        
    <b-tabs>
      <!-- Products -->
    <b-tab active>
      <template #title>
        <feather-icon icon="HomeIcon" />
        <span>Products</span>
      </template>

    <!-- Table Products Container Card -->
    <b-card
      no-body
      class="mb-0"
    >

      <div class="m-2">
          <b-table
              ref="refUserListTable"
              class="position-relative"
              :items="products.items"
              responsive
              :fields="productsColumns"
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

              <!-- Column: category -->
              <template #cell(category)="data">
                  {{ data.item.category != null ? data.item.category.name : "" }}
              </template>

              <!-- Column: Action -->
              <template
                #cell(actions)="data"
                class="text-center"
              >
                <div class="text-center">
                  <feather-icon icon="EditIcon"  @click.stop.prevent="openAddProduct(data.item)" />
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
                  v-model="currentPage"
                  :total-rows="products.totalRecords"
                  :per-page="perPage"
                  @change="pageChange"
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

    </b-tab>
    <b-tab>
      <!-- Shop Owners -->
      <template #title>
        <feather-icon icon="ToolIcon" />
        <span>Shops</span>
      </template>

<!-- Table Shop Owners Container Card -->
    <b-card
      no-body
      class="mb-0"
    >

      <div class="m-2">
          <b-table
              ref="refUserListTable"
              class="position-relative"
              :items="shops.items"
              responsive
              :fields="shopsColumns"
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

              <!-- Column: category -->
              <template #cell(category)="data">
                  {{ data.item.category != null ? data.item.category.name : "" }}
              </template>

              <!-- Column: Action -->
              <template
                #cell(actions)="data"
                class="text-center"
              >
                <div class="text-center">
                  <feather-icon icon="EditIcon"  @click.stop.prevent="openAddProduct(data.item)" />
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
                  v-model="currentPage"
                  :total-rows="shops.totalRecords"
                  :per-page="perPage"
                  @change="pageChange"
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

    </b-tab>
    <b-tab>
      <!-- Users -->
      <template #title>
        <feather-icon icon="UserIcon" />
        <span>Users</span>
      </template>

     
    <!-- Table Users Container Card -->
    <b-card
      no-body
      class="mb-0"
    >

      <div class="m-2">
          <b-table
              ref="refUserListTable"
              class="position-relative"
              :items="users.items"
              responsive
              :fields="usersColumns"
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

              <!-- Column: category -->
              <template #cell(category)="data">
                  {{ data.item.category != null ? data.item.category.name : "" }}
              </template>

              <!-- Column: Action -->
              <template
                #cell(actions)="data"
                class="text-center"
              >
                <div class="text-center">
                  <feather-icon icon="EditIcon"  @click.stop.prevent="openAddProduct(data.item)" />
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
                  v-model="currentPage"
                  :total-rows="users.totalRecords"
                  :per-page="perPage"
                  @change="pageChange"
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

    </b-tab>
  </b-tabs>

      </div>
    </b-card>
    
  </div>
  
</template>

<script>
import { BTabs, BTab,
BCard, BRow, BCol, BTable, BMedia, BAvatar, BPagination, } from 'bootstrap-vue'

export default {
  name: "DashboardPage",
  components: {
    BTabs,
    BTab,
    BCard,
    BRow,
    BCol,
    BTable,
    BMedia,
    BAvatar,
    BPagination,
  },
  data: () => ({
    // Products
    products: {
        items: [],
        nextToken: null,
        totalRecords: 0
    },   
    productsColumns: [],

    // Shops
    shops: {
        items: [],
        nextToken: null,
        totalRecords: 0
    }, 
    shopsColumns: [],

    // Users
    users: {
        items: [],
        nextToken: null,
        totalRecords: 0
    }, 
    usersColumns: [],

    currentPage: 1,
    nextToken: null,
    nextNextToken: null,
    previousTokens: [],
    perPage: 10,
    sortDirection: 'id',
  }),

  async mounted() {
    // Table Handlers
    this.productsColumns = [
        { key: 'image', label: 'Image' },
        { key: 'name', label: 'Product Name', sortable: true },
        { key: 'category', label: 'Category', sortable: true },
        { key: 'price', label: 'Price', sortable: true },
        { key: 'actions', label: 'Actions' },
    ];

    this.shopsColumns = [
        { key: 'name', label: 'Shop Name', sortable: true},
        { key: 'username', label: 'User Name', sortable: true},
        { key: 'totalProducts', label: 'Total Products'},
        { key: 'actions', label: 'Action' },
    ];

    this.usersColumns = [
        { key: 'username', label: 'User Name' },
        { key: 'email', label: 'Email', sortable: true },
        { key: 'actions', label: 'Action' },
    ];

    // get products
    this.getProducts();

    // get shops
    this.getShops();

    // get user
    this.getUsers();
  },
  methods: {
    async getProducts() {
        const variables = {
            limit: this.perPage,
            sortDirection: this.sortDirection,
        };

        if (this.nextToken != null)
            variables.nextToken = this.nextToken;

        this.products = await this.$store.dispatch("products/getProductsPagination", variables);

        // this.previousTokens.push(this.nextToken);
        // this.nextNextToken = this.products.nextToken;
        console.log(this.products);
    },


    async getShops() {
        const variables = {
            limit: this.perPage,
            sortDirection: this.sortDirection,
        };

        if (this.nextToken != null)
            variables.nextToken = this.nextToken;

        this.shops = await this.$store.dispatch("shops/getShopsPagination", variables);

        // this.previousTokens.push(this.nextToken);
        // this.nextNextToken = this.users.nextToken;
        console.log(this.shops);
    },

    async getUsers() {
        const variables = {
            limit: this.perPage,
            sortDirection: this.sortDirection,
        };

        if (this.nextToken != null)
            variables.nextToken = this.nextToken;

        this.users = await this.$store.dispatch("users/getUsersPagination", variables);

        // this.previousTokens.push(this.nextToken);
        // this.nextNextToken = this.users.nextToken;
        console.log(this.users);
    },


    pageChange(pageNum) {
        if (this.currentPage < pageNum) {
            this.nextToken = this.nextNextToken;
        } else {
            this.nextToken = this.previousTokens.pop();
        }
        
        this.getProducts();
    },
  },
};
</script>
