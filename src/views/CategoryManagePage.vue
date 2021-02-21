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
                    <b-button type="submit" variant="primary" @click.stop.prevent="openAddCategory(null)">Add Category</b-button>
                </div>
            </b-col>
            </b-row>

        </div>

        <!-- Table -->
        <div class="m-2">
            <b-table
                class="position-relative"
                :items="categories.items"
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
                    <feather-icon icon="EditIcon"  @click.stop.prevent="openAddCategory(data.item)" />
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
                    :total-rows="categories.totalRecords"
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
    </div>
</template>

<script>
import { BCard, BRow, BCol, BTable, BMedia, BAvatar, BPagination, } from 'bootstrap-vue'

export default {
  name: "CategoryManagePage", 
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
    categories: {
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
        { key: 'name', label: 'Category Name', sortable: true },
        { key: 'actions' },
    ];

    this.getCategoriess();
  },
  methods: {
    openAddCategory(item) {
        if (item == null) {
            this.$router.push(`/add-category/-1`);
        } else {
            this.$router.push(`/add-category/${item.id}`);
        }
    },

    async getCategoriess() {
        const variables = {
            limit: this.perPage,
            sortDirection: this.sortDirection,
        };

        if (this.nextToken != null)
            variables.nextToken = this.nextToken;

        this.categories = await this.$store.dispatch("categories/getCategoriesPagination", variables);

        this.previousTokens.push(this.nextToken);
        this.nextNextToken = this.categories.nextToken;
        console.log(this.categories);
    },

    pageChange(pageNum) {
        if (this.currentPage < pageNum) {
            this.nextToken = this.nextNextToken;
        } else {
            this.nextToken = this.previousTokens.pop();
        }
        
        this.getCategoriess();
    },
  }
};
</script>
