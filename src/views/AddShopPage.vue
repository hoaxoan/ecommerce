<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">

      <!-- Register -->
      <b-card class="mb-0">
        <b-link class="brand-logo">
          <h2 class="brand-text text-primary ml-1">
            Register Shop
          </h2>
        </b-link>

        <!-- form -->
        <b-form
            class="auth-register-form mt-2"
            @submit.prevent="createShop"
          >
            <!-- Name -->
            <b-form-group
              label="Name"
              label-for="name"
            >
              <b-form-input
                  id="name"
                  v-model="shop.name"
                  name="name"
                />
            </b-form-group>

            <!-- submit button -->
            <b-button
              variant="primary"
              block
              type="submit"
            >
              Register
            </b-button>
          </b-form>

      </b-card>
    <!-- /Register -->
    </div>
  </div>
</template>

<script>
import {
  BCard, BLink, BForm, BButton, BFormInput, BFormGroup
} from 'bootstrap-vue'
import { mapGetters } from "vuex";

export default {
  name: "AddShopPage",
  components: {
    // BSV
    BCard,
    BLink,
    BForm,
    BButton,
    BFormInput,
    BFormGroup
  },
  data: () => ({
    shop: {
      type: Object
    },
    error: "",
  }),
  async mounted() {
    // Get Shop by Id
    const shopData = await this.$store.dispatch("shops/getShop", this.id);
    if (shopData != null) {
      this.shop = shopData;
    }
  },

  computed: {
    ...mapGetters({
      user: "users/user",
    }),
    id() {
      return this.$route.params.id;
    },
  },
  methods: {
    async createShop() {
      console.log(this.user);

      if (!this.user) {
        this.$router.push("/login");
        return;
      }

      if (!this.shop.name) {
        this.$router.push("/shop-manage");
        return;
      }
      try {
        const newShop = {
            id: this.shop.id,
            name: this.shop.name,
            userId: this.user.id,
        };

        await this.$store.dispatch("shops/createUpdateShop", newShop);
        this.$router.push("/shop-manage");
      } catch (error) {
        this.error = error;
      }
    },
  },
  
};
</script>



<style lang="scss" scoped>

.auth-wrapper {
    display: flex;
    flex-basis: 100%;
    width: 100%;
}

.auth-wrapper.auth-v1 {
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.auth-wrapper.auth-v1 .auth-inner {
    max-width: 400px;
    width: 100%;
    position: relative;
}

.auth-wrapper .brand-logo {
    margin: 1rem 0 0.5rem 0;
    display: flex;
    justify-content: center;
}

.auth-wrapper .brand-logo .brand-text {
    font-weight: 600;
    font-size: 1.714rem;
}

.button {
  width: 100%;
}
</style>