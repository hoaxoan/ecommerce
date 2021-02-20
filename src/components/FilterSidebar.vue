<template>
  <div class="sidebar-detached sidebar-left">
    <div class="sidebar">
      <div
        class="sidebar-shop show"
      >
        <!-- <b-row>
          <b-col cols="12">
            <h6 class="filter-heading d-none d-lg-block">
              Filters
            </h6>
          </b-col>
        </b-row> -->

        <!-- Filters' Card -->
        <b-card>

          <!-- Categories -->
          <div class="product-categories">
            <h6 class="filter-title">
              Categories
            </h6>
           <b-form-radio-group
              v-model="filters.categorySelecteds"
              class="categories-radio-group"
              stacked
              :options="filters.categories"
            />
          </div>

        </b-card>
      </div>
    </div>

  </div>
</template>

<script>
import {
  BCard, BFormRadioGroup,
} from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BFormRadioGroup,
  },
  props: {
    filters: {
      type: Object,
      required: true,
    }
  },
}
</script>

<style lang="scss">
</style>

<style lang="scss" scoped>
.categories-radio-group,
.brands-radio-group,
.price-range-defined-radio-group {
    ::v-deep > .custom-control {
    margin-bottom: 0.75rem;
  }
}
</style>
