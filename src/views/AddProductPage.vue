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
                <!-- Product Deatil -->
                  <b-row>
                    <b-col cols="12" class="pt-2">
                      <b-form-group
                        label="Product Name"
                        label-for="h-product-name"
                        label-cols-md="4"
                      >
                        <b-form-input
                          id="h-product-name"
                          placeholder="Product Name"
                          v-model="product.name"
                        />
                      </b-form-group>
                    </b-col>
                    <b-col cols="12" class="pt-2">
                      <b-form-group
                        label="Price"
                        label-for="h-Price"
                        label-cols-md="4"
                      >
                        <b-form-input
                          id="h-price"
                          type="number"
                          placeholder="Price"
                          v-model="product.price"
                        />
                      </b-form-group>
                    </b-col>
                    <b-col cols="12" class="pt-2">
                      <b-form-group
                        label="Category"
                        label-for="h-category"
                        label-cols-md="4"
                      >
                        <b-form-select
                          id="h-category"
                          v-model="categoryId"
                          :options="categories"
                        />
                      </b-form-group>
                    </b-col>              
                  </b-row>             

              </b-col>
              <b-col>
                <!-- Product Image -->
                <div class="flex w-full mt-10 items-center justify-center bg-grey-lighter">
                      <b-carousel
                          id="carousel-fade"
                          style="text-shadow: 0px 0px 2px #000"
                          fade
                          indicators
                          img-width="320"
                          img-height="320"
                          v-if="images.length > 0"
                        >
                           <b-carousel-slide
                            v-for="image in images"
                            :key="image.id"
                            style="width: 320px; height: 320px; top: -30px;"
                          >
                            <amplify-s3-image
                              level="protected"
                              :img-key="image.fullsize.key"
                              class="w-4/12"
                            ></amplify-s3-image>
                          </b-carousel-slide>

                          <b-carousel-slide
                            v-for="image in images"
                            :key="image.id"
                            :img-src="image.imageUrl"
                            style="width: 320px; height: 320px; top: -30px;"
                          ></b-carousel-slide>
                      </b-carousel>
                      <b-carousel
                          id="carousel-fade"
                          style="text-shadow: 0px 0px 2px #000"
                          fade
                          indicators
                          img-width="320"
                          img-height="320"
                          v-else
                        >
                          <b-carousel-slide
                            :img-src="defaultImage"
                            style="width: 320px; height: 320px;"
                          ></b-carousel-slide>
                      </b-carousel>
                  </div>
                  <div class="flex flex-wrap pt-1 justify-center m-auto w-full">
                    <form enctype="multipart/form-data" novalidate>
                        <b-form-file @change="chooseImage" style="padding-top: 10px;" accept="image/jpeg, image/png, image/gif"></b-form-file>
                    </form>
                  </div>
              </b-col>
            </b-row>         
            <b-row>
              <!-- submit and reset -->
              <b-col>
                <b-button
                  type="submit"
                  variant="primary"
                  class="mr-1"
                  @click.prevent="createProduct"
                >
                  Save
                </b-button>
                <router-link to="/product-manage">
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
import { ref } from '@vue/composition-api'

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
    product: {
      type: Object
    },
    categories: [],
    categoryId: ref(null),
    images: [],
    defaultImage: require('@/assets/upload.png'),
    breadcrumbs: [
      {
        text: 'Products',
        href: '/product-manage'
      },
      {
        text: 'Add Product',
        active: true
      }
    ]
  }),

  async mounted() {
    // Get Categories
    var categories = await this.$store.dispatch("categories/getCategories");
    this.categories = categories.map(category => {
      return {
        value: category.id,
        text: category.name
      }
    });

    // Get Product by Id
    const productData = await this.$store.dispatch("products/getProduct", this.id);
    if (productData != null) {
      this.product = productData;
    } 
    
    if (this.product != null && this.product.category != null) {
      this.categoryId = this.product.category.id;
    }

    if (this.product.images != null && this.product.images.items != null) {
      this.images = this.product.images.items;
    } else {
      this.images = [];
    }
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  methods: {
    // Create Product
    async createProduct() {
      if (this.product == null)
        return;

      if (this.categoryId == null)
        return;

      // Create/Update Product
      if (this.id != null && this.id != -1) {
          const newProduct = {
            id: this.product.id,
            name: this.product.name,
            price: parseFloat(this.product.price),
            productCategoryId: this.categoryId,
            images: this.images
          };

          const productData = await this.$store.dispatch("products/updateProduct", newProduct);
          if (productData.images != null && productData.images.items != null) {
            this.images = productData.images.items;
          } else {
            this.images = [];
          }
      } else {
        const newProduct = {
          name: this.product.name,
          price: parseFloat(this.product.price),
          productCategoryId: this.categoryId,
          images: this.images
        };

        const productData = await this.$store.dispatch("products/createProduct", newProduct);
        if (productData.images != null && productData.images.items != null) {
          this.images = productData.images.items;
        } else {
          this.images = [];
        }
      }

      this.$router.push("/product-manage");
    },
    
    // Upload Image
    async uploadImage(file) {
      if (!file.target || !file.target.files[0]) {
        return;
      }

      try {
        const image = await this.$store.dispatch("products/uploadImage", {
          file: file.target.files[0]
        });

        this.images.push(image);
      } catch (error) {
        console.log("error upload image", error);
      }
    },

    // Choose Image
    async chooseImage(file) {
        await this.uploadImage(file);
    },
  }
}
</script>

<style  scoped>
amplify-s3-image {
  --width: 75%;
}
</style>