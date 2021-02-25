<template>
  <div class="home">
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import EventBus from './../store/eventBus';

export default {
  name: "HomePage",
  components: {
  },

  data: () => ({
  }),

  computed: {
    ...mapGetters({
    }),
  },

  async mounted() {
    const user = await this.$store.dispatch("users/currentUser");
    EventBus.$emit('logged', user);
    if (user != null && user.role == "admin") {
      this.$router.push("/dashboard");
    } else if (user != null && user.role == "shop") {
      this.$router.push("/shop-manage");
    } else if (user != null) {
      this.$router.push("/products");
    } else {
      this.$router.push("/login");
    }
  },
};
</script>
