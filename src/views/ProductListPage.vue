<template>
    <div class="content-wrapper clearfix ecommerce-application m-2">
        <div class="content-detached content-right">
          <div class="content-wrapper">
            <div class="content-body">
              
                <div style="height: inherit">

                    <!-- Searchbar -->
                    <div class="ecommerce-searchbar mt-1">
                        <b-row>
                            <b-col cols="12">
                            <b-input-group class="input-group-merge">
                                <b-form-input
                                v-model="searchText"
                                placeholder="Search Product"
                                class="search-product"
                                />
                                <b-input-group-append is-text>
                                <feather-icon
                                    icon="SearchIcon"
                                    class="text-muted"
                                />
                                </b-input-group-append>
                            </b-input-group>
                            </b-col>
                        </b-row>
                    </div>

                    <!-- Prodcuts -->
                    <section class="grid-view" v-if="currentProducts.length > 0">
                        <b-card
                            v-for="product in currentProducts"
                            :key="product.id"
                            class="ecommerce-card"
                            no-body
                        >
                            <div class="item-img text-center">
                            <b-link :to="{ name: 'product-detail', params: { id: product.id } }">
                                <b-img
                                :alt="`${product.name}-${product.id}`"
                                fluid
                                class="card-img-top"
                                :src="product.imageUrl != null && product.imageUrl.length > 0 ? product.imageUrl : defaultImage"
                                />
                            </b-link>
                            </div>

                            <!-- Product Details -->
                            <b-card-body>
                            <div class="item-wrapper">
                                <div class="item-rating">
                                <ul class="unstyled-list list-inline">
                                    <li
                                    v-for="star in 5"
                                    :key="star"
                                    class="ratings-list-item"
                                    :class="{'ml-25': star-1}"
                                    >
                                    <feather-icon
                                        icon="StarIcon"
                                        size="16"
                                        :class="[{'fill-current': star <= product.rating}, star <= product.rating ? 'text-warning' : 'text-muted']"
                                    />
                                    </li>
                                </ul>
                                </div>
                                <div>
                                <h6 class="item-price">
                                    ${{ product.price }}
                                </h6>
                                </div>
                            </div>
                            <h6 class="item-name">
                                <b-link
                                class="text-body"
                                :to="{ name: 'product-detail', params: { id: product.id } }"
                                >
                                {{ product.name }}
                                </b-link>
                                <b-card-text class="item-company">
                                By <b-link class="ml-25">
                                    {{ product.brand }}
                                </b-link>
                                </b-card-text>
                            </h6>
                            <b-card-text class="item-description">
                                {{ product.description }}
                            </b-card-text>
                            </b-card-body>

                            <!-- Product Actions -->
                            <div class="item-options text-center">
                            <div class="item-wrapper">
                                <div class="item-cost">
                                <h4 class="item-price">
                                    ${{ product.price }}
                                </h4>
                                </div>
                            </div>
                            </div>
                        </b-card>
                    </section>


                    <!-- Pagination -->
                    <section>
                    <b-row>
                        <b-col cols="12">
                        <b-pagination
                            v-model="currentPage"
                            :total-rows="products.totalRecords"
                            :per-page="perPage"
                            @change="pageChange"
                            first-number
                            align="center"
                            last-number
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
                    </section>
                    
                </div>
                
            </div>
          </div>
        </div>
        <!-- Sidebar -->
        <div class="sidebar-detached sidebar-left">
          <div class="sidebar">
            <div
              class="sidebar-shop show"
            >

              <!-- Filters' Card -->
              <b-card>

                <!-- Categories -->
                <div class="product-categories">
                  <h6 class="filter-title">
                    Categories
                  </h6>
                <b-form-radio-group
                    v-model="categorySelecteds"
                    class="categories-radio-group"
                    stacked
                    :options="categories"
                  />
                </div>

              </b-card>
            </div>
          </div>

        </div>
    </div>

</template>

<script>
import {
  BRow, BCol, BInputGroup, BInputGroupAppend, BFormInput, BCard, BCardBody, BLink, BImg, BCardText, BPagination,
} from 'bootstrap-vue'

export default {
  name: "ProductListPage",
  components: {
    // BSV
    BRow,
    BCol,
    BInputGroup,
    BInputGroupAppend,
    BFormInput,
    BCard,
    BCardBody,
    BLink,
    BImg,
    BCardText,
    BPagination,
  },
  data: () => ({
    currentProducts: [],
    products: {
        items: [],
        nextToken: null,
        totalRecords: 0
    },
    currentPage: 1,
    perPage: 10,
    categories: [],
    searchText: "",
    categorySelecteds: [],
    sortDirection: "id",
    defaultImage: require('@/assets/upload.png'),
  }),

  watch: {
    searchText: function (val) {
      this.searchText = val;
      // Products
      this.getProducts();
    },

    categorySelecteds: function(val) {
      this.categorySelecteds = val;
       // Products
      this.getProducts();
    }
  },

  async mounted() {
    // Get Categories
    const categoriesData = await this.$store.dispatch("categories/getCategories");
    this.categories = [];
    this.categories.push({
        value: "",
        text: "All"
    });
    for (var i = 0; i < categoriesData.length; i ++) {
      this.categories.push({
          value: categoriesData[i].id,
          text: categoriesData[i].name
        });
    }

    // Products
    await this.getProducts();
  },

  methods: {
    
    async getProducts() {
        const variables = {
            limit: this.perPage,
            sortDirection: this.sortDirection,           
        };

        if (this.nextToken != null)
            variables.nextToken = this.nextToken;

        var filters = {
          name: {
              contains: this.searchText
          }          
        };

        if (this.categorySelecteds.length > 0) {
          filters.categoryId = {
              contains: this.categorySelecteds
          };
        }

        variables.filters = filters;

        this.products = await this.$store.dispatch("products/getProductsPagination", variables);
        const items = JSON.parse(JSON.stringify(this.products.items));
        this.currentProducts = items.splice(this.currentPage - 1, this.perPage);
    },

    pageChange(value) {
      this.currentPage = value;
      const items = JSON.parse(JSON.stringify(this.products.items));
      this.currentProducts = items.splice(this.currentPage - 1, this.perPage);
    },
  }
};
</script>

<style lang="scss" scoped>
.item-view-radio-group ::v-deep {
  .btn {
    display: flex;
    align-items: center;
  }
}
</style>