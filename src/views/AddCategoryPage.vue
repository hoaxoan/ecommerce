<template>
<div class="content-wrapper clearfix m-2">
      <b-card no-body class="mb-0">
        <b-row class="pt-1 pl-4">
            <b-breadcrumb>
              <b-breadcrumb-item to="/">
                <feather-icon
                  icon="HomeIcon"
                  size="16"
                  class="align-text-top"
                />
              </b-breadcrumb-item>
              <b-breadcrumb-item
                v-for="item in breadcrumbs"
                :key="item.text"
                :active="item.active"
                :to="item.href"
              >
                {{ item.text }}
              </b-breadcrumb-item>
            </b-breadcrumb>
        </b-row>
        <b-form>          
          <div class="content-wrapper p-4">
            <b-row>
              <b-col>
                <!-- Category -->
                  <b-row>
                    <b-col cols="12" class="pt-2">
                      <b-form-group
                        label="Category Name"
                        label-for="h-category-name"
                        label-cols-md="4"
                      >
                        <b-form-input
                          id="h-category-name"
                          placeholder="Category Name"
                          v-model="category.name"
                        />
                      </b-form-group>
                    </b-col>
                  </b-row>             

              </b-col>
            </b-row>         
            <b-row>
              <!-- submit and reset -->
              <b-col>
                <b-button
                  type="submit"
                  variant="primary"
                  class="mr-1"
                  @click.prevent="createCategory"
                >
                  Save
                </b-button>
                <router-link to="/category-manage">
                    <b-button
                        type="reset"
                        variant="outline-secondary"
                      >
                        Cancel
                      </b-button>
                  </router-link>
              </b-col>
            </b-row>
          </div>
      
        </b-form>
              
      </b-card>
</div>
  
  
</template>

<script>
import {
  BRow, BCol, BFormGroup, BFormInput, BForm, BButton,
} from 'bootstrap-vue'

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BButton,
  },
  data: () => ({
    category: {
      type: Object
    },
    breadcrumbs: [
      {
        text: 'Categories',
        href: '/category-manage'
      },
      {
        text: 'Add Category',
        active: true
      }
    ]
  }),

  async mounted() {
    // Get Category by Id
    const categoryData = await this.$store.dispatch("categories/getCategory", this.id);
    if (categoryData != null) {
      this.category = categoryData;
    } 
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  methods: {
    // Create Category
    async createCategory() {
      if (this.category == null)
        return;

      // Create/Update Category
      const newCategory = {
        id: this.category.id,
        name: this.category.name,
      };
        
      await this.$store.dispatch("categories/createUpdateCategory", newCategory);
      this.$router.push("/category-manage");
    },
  }
}
</script>
