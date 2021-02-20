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
                    <section class="grid-view" v-if="products.items.length > 0">
                        <b-card
                            v-for="product in products.items"
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
                                :src="product.imageUrl"
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
                            v-model="filters.currentPage"
                            :total-rows="products.totalRecords"
                            :per-page="filters.perPage"
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
        <filter-sidebar :filters="filters"
        />
    </div>

</template>

<script>
import {
  BRow, BCol, BInputGroup, BInputGroupAppend, BFormInput, BCard, BCardBody, BLink, BImg, BCardText, BPagination,
} from 'bootstrap-vue'
import FilterSidebar from "@/components/FilterSidebar.vue";

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
        
    FilterSidebar,
  },
  data: () => ({
    products: {
        items: [],
        nextToken: null,
        totalRecords: 0
    },
    filters: {
      q: "",
      currentPage: 1,
      perPage: 10,
      categories: [],
      categorySelecteds: []
    },
    searchText: ""
  }),

  watch: {
    searchText: function (val) {
      console.log(val);
    },
  },

  async mounted() {
    // Get Categories
    var categories = await this.$store.dispatch("categories/getCategories");
    this.filters.categories = categories.map(category => {
      return {
        value: category.id,
        text: category.name
      }
    });

    // Products
    await this.getProducts();
  },

  methods: {
    
    async getProducts() {
        const variables = {
            limit: this.limit,
            sortDirection: this.sortDirection,
        };

        if (this.nextToken != null)
            variables.nextToken = this.nextToken;

        this.products = await this.$store.dispatch("products/getProductsPagination", variables);

        // this.previousTokens.push(this.nextToken);
        // this.nextNextToken = this.products.nextToken;
        console.log(this.products);
    },

    pageChange() {
        // if (this.currentPage < pageNum) {
        //     this.nextToken = this.nextNextToken;
        // } else {
        //     this.nextToken = this.previousTokens.pop();
        // }
        
        this.getProducts();
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