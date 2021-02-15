<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">

      <!-- Register -->
      <b-card class="mb-0">
        <b-link class="brand-logo">
          <h2 class="brand-text text-primary ml-1">
            Register
          </h2>
        </b-link>

        <!-- form -->
        <b-form
            class="auth-register-form mt-2"
            @submit.prevent="signUp"
          >
            <!-- username -->
            <b-form-group
              label="Username"
              label-for="username"
            >
              <b-form-input
                  id="username"
                  v-model="username"
                  name="register-username"
                  placeholder="johndoe"
                />
            </b-form-group>

            <!-- email -->
            <b-form-group
              label="Email"
              label-for="email"
            >
              <b-form-input
                  id="email"
                  v-model="email"
                  name="email"
                  placeholder="john@example.com"
                />
            </b-form-group>

            <!-- password -->
            <b-form-group
              label="Password"
              label-for="password"
            >
              <b-form-input
                    id="password"
                    v-model="password"
                    type="password"
                    class="form-control-merge"
                    name="register-password"
                    placeholder="*********"
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

        <b-card-text class="text-center mt-2">
          <span>Already have an account? </span>
          <b-link :to="{name:'login'}">
            <span>Sign in</span>
          </b-link>
        </b-card-text>
      </b-card>
    <!-- /Register -->
    </div>
  </div>
</template>

<script>
import {
  BCard, BLink, BForm,
  BButton, BFormInput, BFormGroup
} from 'bootstrap-vue'

export default {
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
    username: "",
    password: "",
    email: "",
    error: "",
    confirmPassword: false,
    code: "",
  }),
  computed: {
  },
  methods: {
    async signUp() {
      if (!this.email || !this.password) {
        return;
      }
      try {
        await this.$store.dispatch("auth/signUp", {
          username: this.username,
          password: this.password,
          email: this.email,
        });

        this.confirmPassword = true;
      } catch (error) {
        this.error = error;
      }
    },
    async confirmSignUp() {
      if (!this.username || !this.code) {
        return;
      }

      try {
        const { username, password, code } = this;
        await this.$store.dispatch("auth/confirmSignUp", {
          username,
          code,
        });
        await this.$store.dispatch("auth/login", {
          username,
          password,
        });
        this.$router.push("/albums");
      } catch (error) {
        console.log(error);
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