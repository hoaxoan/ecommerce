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
                    <b-button type="submit" variant="primary" @click.stop.prevent="openAddProduct(null)">Add Product</b-button>
                </div>
            </b-col>
            </b-row>

        </div>

        <!-- Table -->
        <div class="m-2">
            <b-table
                id="products-table"
                class="position-relative"
                :items="products.items"
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
                            :src="data.item.imageUrl != null && data.item.imageUrl.length > 0 ? data.item.imageUrl : defaultImage"
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
                    aria-controls="products-table"
                    v-model="currentPage"
                    :total-rows="products.totalRecords"
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
    products: {
        items: [],
        nextToken: null,
        totalRecords: 0
    },   
    tableColumns: [],
    currentPage: 1,
    nextToken: null,
    nextNextToken: null,
    previousTokens: [],
    perPage: 1,
    sortDirection: 'id',
    defaultImage: require('@/assets/upload.png'),
  }),

  async mounted() {
    // Table Handlers
    this.tableColumns = [
        { key: 'image', label: 'Image' },
        { key: 'name', label: 'Product Name', sortable: true },
        { key: 'category', label: 'Category', sortable: true },
        { key: 'price', label: 'Price', sortable: true },
        { key: 'actions' },
    ];

    this.getProducts();
  },
  methods: {
    openAddProduct(product) {
        if (product == null) {
            this.$router.push(`/add-product/-1`);
        } else {
            this.$router.push(`/add-product/${product.id}`);
        }
    },

    async getProducts() {
        const variables = {
            limit: this.perPage,
            sortDirection: this.sortDirection,
        };

        if (this.nextToken != null)
            variables.nextToken = this.nextToken;

        this.products = await this.$store.dispatch("products/getProductsPagination", variables);

        this.previousTokens.push(this.nextToken);
        this.nextNextToken = this.products.nextToken;
        console.log(this.products);
    },
  }
};
</script>
