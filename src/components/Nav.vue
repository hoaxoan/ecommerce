<template>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <!-- <b-navbar-brand href="#">Home</b-navbar-brand> -->
        
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav v-if="isLogin && isUser">
            <b-nav-item active pill href="/products">Products</b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav v-if="isLogin && isShop">
            <b-nav-item active pill href="/shop-manage">Shops</b-nav-item>
            <b-nav-item active pill href="/product-manage">Products</b-nav-item>
            <b-nav-item active href="/category-manage">Categories</b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav v-if="isLogin && isAdmin">
            <b-nav-item active href="/dashboard">Administrator</b-nav-item>
          </b-navbar-nav>
          
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto" v-if="!isLogin">
            <b-nav-form class="ml-2">
               <router-link to="/signup">
                  <b-button size="sm" class="my-2 my-sm-0" type="submit" variant="primary">Sign Up</b-button>
                </router-link>
            </b-nav-form>

            <b-nav-form class="ml-2">
                <router-link to="/login">
                  <b-button size="sm" class="my-2 my-sm-0" type="submit" variant="primary">Log In</b-button>
                </router-link>
            </b-nav-form>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto" v-if="isLogin">
            <b-button
              variant="outline-primary"
              style="border: none;"
              size="m"
            >
              <feather-icon icon="BellIcon" />
            </b-button>

            <b-button
              variant="outline-primary"
              style="border: none;"
              size="m"
            >
              <feather-icon icon="ShoppingCartIcon" />
            </b-button>

            <b-nav-form class="ml-2">
                <b-button @click="logout" size="sm" class="my-2 my-sm-0" type="submit" variant="primary">Log Out</b-button>
            </b-nav-form>
          </b-navbar-nav>
          
        </b-collapse>

      </b-navbar>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import EventBus from './../store/eventBus';

export default {
  components: {
  },

  data: () => ({
    user: {
      type: Object
    },
    isLogin: false,
    isUser: false,
    isShop: false,
    isAdmin: false,
  }),

  async created() {
    EventBus.$on('logged', (data) => {
      console.log(data)
      this.user = data;
      this.setRole();
    });

    // if (this.currentUser == null) {
    //   this.user = await this.$store.dispatch("users/currentUser");
    // }
  
    
  },
  methods: {
    async logout() {
      await this.$store.dispatch("auth/logout");
      this.user = null;
      this.isLogin = false;
      this.isUser = true;
      this.isShop = false;
      this.isAdmin = false;
      this.$router.push("/login");
    },

    async setRole() {
      if (this.user != null) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }

      if (this.user != null && this.user.role == "admin") {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }

      if (this.user != null && this.user.role == "shop") {
        this.isShop = true;
      } else {
        this.isShop = false;
      }

      if (!this.isAdmin && !this.isShop) {
        this.isUser = true;
      } else {
        this.isUser = false;
      }
    }

  },
  computed: {
    ...mapGetters({
      currentUser: "users/user",
    }),
  },
  
};
</script>

<style lang="scss" scoped>
.nav-item {
  color: #fff;
  display: block;
  padding: .4rem 0.5rem;
  border-radius: .25rem;
  font-weight: 600;
  margin-left: 12px;
}
</style>