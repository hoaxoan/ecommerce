<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> | -->
      <!-- <router-link to="/about">About</router-link> -->
      <Nav/>
    </div>
    <router-view />
  </div>
</template>
<script>
import Nav from "@/components/Nav.vue";
import { mapActions } from "vuex";
export default {
  mounted() {
    this.currentUser();
  },
  components: {
    Nav,
  },
  methods: {
    ...mapActions("users", ["currentUser"]),
  },
  setup() {
    // const currentUser = this.$store.dispatch("users/currentUser");
    // return {
    //   currentUser
    // }
  },
};
</script>

<style lang="scss">
#app {
  font-family: "Montserrat", Helvetica, Arial, serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.45;
  color: #6e6b7b;
}
</style>
