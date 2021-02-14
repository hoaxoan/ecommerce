<template>
    <div class="content-wrapper clearfix ecommerce-application">
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
                                v-model="filters.q"
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
                    <section class="grid-view">
                        <b-card
                            v-for="product in products"
                            :key="product.id"
                            class="ecommerce-card"
                            no-body
                        >
                            <div class="item-img text-center">
                            <b-link :to="{ name: 'apps-e-commerce-product-details', params: { slug: product.slug } }">
                                <b-img
                                :alt="`${product.name}-${product.id}`"
                                fluid
                                class="card-img-top"
                                :src="product.image"
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
                                :to="{ name: 'apps-e-commerce-product-details', params: { slug: product.slug } }"
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
                            <b-button
                                variant="light"
                                tag="a"
                                class="btn-wishlist"
                                @click="toggleProductInWishlist(product)"
                            >
                                <feather-icon
                                icon="HeartIcon"
                                class="mr-50"
                                :class="{'text-danger': product.isInWishlist}"
                                />
                                <span>Wishlist</span>
                            </b-button>
                            <b-button
                                variant="primary"
                                tag="a"
                                class="btn-cart"
                                @click="handleCartActionClick(product)"
                            >
                                <feather-icon
                                icon="ShoppingCartIcon"
                                class="mr-50"
                                />
                                <span>{{ product.isInCart ? 'View In Cart' : 'Add to Cart' }}</span>
                            </b-button>
                            </div>
                        </b-card>
                    </section>


                    <!-- Pagination -->
                    <section>
                    <b-row>
                        <b-col cols="12">
                        <b-pagination
                            v-model="filters.page"
                            :total-rows="totalProducts"
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
        <filter-sidebar
            :filters="filters"
            :filter-options="filterOptions"
        />
    </div>

</template>

<script>
import {
  BRow, BCol, BInputGroup, BInputGroupAppend, BFormInput, BCard, BCardBody, BLink, BImg, BCardText, BButton, BPagination,
} from 'bootstrap-vue'
import FilterSidebar from "@/components/FilterSidebar.vue";
import { useFiltersSortingAndPagination } from './filters'

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
    BButton,
    BPagination,
        
    FilterSidebar,
  },
  data: () => ({
    products: [
         {
      id: 1,
      name: 'VicTsing Wireless Mouse,',
      slug: 'vic-tsing-wireless-mouse-1',
      description:
        'After thousands of samples of palm data, we designed this ergonomic mouse. The laptop mouse has a streamlined arc and thumb rest to help reduce the stress caused by prolonged use of the laptop mouse.',
      brand: 'VicTsing',
      price: 10.99,
      image: require('@/assets/images/pages/eCommerce/27.png'),
      hasFreeShipping: true,
      rating: 3,
    },
    {
      id: 2,
      name: 'Bose Frames Tenor - Rectangular Polarized, Bluetooth Audio Sunglasses',
      slug: 'bose-frames-tenor-rectangular-polarized-bluetooth-audio-sunglasses-2',
      description:
        'Redesigned for luxury — Thoughtfully refined and strikingly elegant, the latest Bose sunglasses blend enhanced features and designs for an elevated way to listen',
      brand: 'Bose',
      price: 249.0,
      image: require('@/assets/images/pages/eCommerce/26.png'),
      hasFreeShipping: false,
      rating: 4,
    },
    {
      id: 3,
      name: 'Willful Smart Watch for Men Women 2020,',
      slug: 'willful-smart-watch-for-men-women-2020-3',
      description:
        'Are you looking for a smart watch, which can not only easily keep tracking of your steps, calories, heart rate and sleep quality, but also keep you informed of incoming calls.',
      brand: 'Willful',
      price: 29.99,
      image: require('@/assets/images/pages/eCommerce/25.png'),
      hasFreeShipping: true,
      rating: 5,
    },
    {
      id: 4,
      name: 'Ronyes Unisex College Bag Bookbags for Women',
      slug: 'ronyes-unisex-college-bag-bookbags-for-women-4',
      description:
        'Made of high quality water-resistant material; padded and adjustable shoulder straps; external USB with built-in charging cable offers a convenient charging',
      brand: 'Ronyes',
      price: 23.99,
      image: require('@/assets/images/pages/eCommerce/24.png'),
      hasFreeShipping: true,
      rating: 2,
    },
    {
      id: 5,
      name: 'Toshiba Canvio Advance 2TB Portable External Hard Drive',
      slug: 'toshiba-canvio-advance-2-tb-portable-external-hard-drive-5',
      description: 'Up to 3TB of storage capacity to store your growing files and content',
      brand: 'Toshiba',
      price: 69.99,
      image: require('@/assets/images/pages/eCommerce/23.png'),
      hasFreeShipping: true,
      rating: 2,
    },
    {
      id: 6,
      name: 'Tile Pro - High Performance Bluetooth Tracker',
      slug: 'tile-pro-high-performance-bluetooth-tracker-6',
      description:
        'FIND KEYS, BAGS & MORE -- Pro is our high-performance finder ideal for keys, backpacks, luggage or any other items you want to keep track of. The easy-to-use finder and free app work with iOS and Android.',
      brand: 'Tile',
      price: 29.99,
      image: require('@/assets/images/pages/eCommerce/22.png'),
      hasFreeShipping: false,
      rating: 4,
    },
    {
      id: 7,
      name: 'Bugani M90 Portable Bluetooth Speaker',
      slug: 'bugani-m90-portable-bluetooth-speaker-7',
      description:
        'Bluetooth Speakers-The M90 Bluetooth speaker uses the latest Bluetooth 5.0 technology and the latest Bluetooth ATS chip, Connecting over Bluetooth in seconds to iPhone, iPad, Smart-phones, Tablets, Windows, and other Bluetooth devices.',
      brand: 'Bugani',
      price: 56.0,
      image: require('@/assets/images/pages/eCommerce/21.png'),
      hasFreeShipping: false,
      rating: 3,
    },
    {
      id: 8,
      name: 'PlayStation 4 Console',
      slug: 'play-station-4-console-8',
      description:
        'All the greatest, games, TV, music and more. Connect with your friends to broadcast and celebrate your epic moments at the press of the Share button to Twitch, YouTube, Facebook and Twitter.',
      brand: 'Sony',
      price: 339.95,
      image: require('@/assets/images/pages/eCommerce/20.png'),
      hasFreeShipping: false,
      rating: 4,
    },
    {
      id: 9,
      name: 'Giotto 32oz Leakproof BPA Free Drinking Water',
      slug: 'giotto-32oz-leakproof-bpa-free-drinking-water-9',
      description:
        'With unique inspirational quote and time markers on it,this water bottle is great for measuring your daily intake of water,reminding you stay hydrated and drink enough water throughout the day.A must have for any fitness goals including weight loss,appetite control and overall health.',
      brand: '3M',
      price: 16.99,
      image: require('@/assets/images/pages/eCommerce/19.png'),
      hasFreeShipping: true,
      rating: 4,
    },
    {
      id: 10,
      name: 'Oculus Quest All-in-one VR',
      slug: 'oculus-quest-all-in-one-vr-10',
      description:
        'All-in-one VR: No PC. No wires. No limits. Oculus quest is an all-in-one gaming system built for virtual reality. Now you can play almost anywhere with just a VR headset and controllers. Oculus touch controllers: arm yourself with the award-winning Oculus touch controllers. Your slashes, throws and grab appear in VR with intuitive, realistic Precision, transporting your hands and gestures right into the game',
      brand: 'Oculus',
      price: 645.0,
      image: require('@/assets/images/pages/eCommerce/18.png'),
      hasFreeShipping: false,
      rating: 1,
    },
    ],
    totalProducts: 10
  }),
  setup() {
    const {
      filters, filterOptions, sortBy, sortByOptions,
    } = useFiltersSortingAndPagination()

    return {
      // useFiltersSortingAndPagination
      filters,
      filterOptions,
      sortBy,
      sortByOptions,
    }
  },
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