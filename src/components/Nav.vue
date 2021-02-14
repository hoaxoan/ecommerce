<template>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">Home</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-form class="ml-2">
               <router-link to="/signup">
                  <b-button size="sm" class="my-2 my-sm-0" type="submit">Sign Up</b-button>
                </router-link>
            </b-nav-form>

            <b-nav-form class="ml-2">
                <router-link to="/login">
                  <b-button size="sm" class="my-2 my-sm-0" type="submit">Log In</b-button>
                </router-link>
            </b-nav-form>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  methods: {
    async logout() {
      await this.$store.dispatch("auth/logout");
      this.$router.push("/");
    },
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
};
</script>

<style lang="scss" scoped>
</style>