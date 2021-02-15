<template>
  <div class="content-wrapper">
      <b-form @submit.prevent>
        <b-row>
          <b-col cols="12">
            <b-form-group
              label="Product Name"
              label-for="h-product-name"
              label-cols-md="4"
            >
              <b-form-input
                id="h-product-name"
                placeholder="Product Name"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              label="Price"
              label-for="h-Price"
              label-cols-md="4"
            >
              <b-form-input
                id="h-price"
                type="number"
                placeholder="Price"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              label="Category"
              label-for="h-category"
              label-cols-md="4"
            >
              <b-form-select
                id="h-category"
                v-model="selected"
                :options="categories"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              label="Image"
              label-for="h-image"
              label-cols-md="4"
            >
              <b-form-file
                id="h-image"
                accept=".jpg, .png, .gif"
              />
            </b-form-group>
          </b-col>

          <!-- submit and reset -->
          <b-col offset-md="4">
            <b-button
              type="submit"
              variant="primary"
              class="mr-1"
            >
              Save
            </b-button>
            <b-button
              type="reset"
              variant="outline-secondary"
            >
              Cancel
            </b-button>
          </b-col>
        </b-row>

      </b-form>
  </div>
  
</template>

<script>
import {
  BFormFile, BRow, BCol, BFormGroup, BFormInput, BForm, BButton,
} from 'bootstrap-vue'

export default {
  components: {
    BFormFile,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BButton,
  },
  data() {
    return {
      selected: null,
    }
  },
  setup() {
    const categories = [
        { value: null, text: 'Please select some item' },
        { value: 'a', text: 'This is First option' },
        { value: 'b', text: 'Default Selected Option' },
        { value: 'c', text: 'This is another option' },
        { value: 'd', text: 'This one is disabled', disabled: true },
    ];

    return {
      categories,
    }
  },
}
</script>
