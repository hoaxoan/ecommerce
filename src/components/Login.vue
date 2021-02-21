<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">

      <!-- Login -->
      <b-card class="mb-0">
        <b-link class="brand-logo">
          <h2 class="brand-text text-primary ml-1">
            Sign In
          </h2>
        </b-link>

         <!-- submit button -->
          <b-button
            variant="primary"
            block
            @click="signInWithGoogle"
          >
            <b-icon icon="google"></b-icon>
            Sign In with Google
          </b-button>
        <div class="divider my-2">
          <div class="divider-text">
            or
          </div>
        </div>

        <!-- form -->
        <b-form
            class="auth-register-form mt-2"
            @submit.prevent="login"
          >
            <!-- username -->
            <b-form-group
              label="Username"
              label-for="username"
            >
              <b-form-input
                  id="username"
                  v-model="username"
                  name="username"
                  placeholder="johndoe"
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
              Sign In
            </b-button>
          </b-form>

        <b-card-text class="text-center mt-2">
          <span>Not have an account? </span>
          <b-link :to="{name:'signup'}">
            <span>Sign Up</span>
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
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    // BSV
    BCard,
    BLink,
    BForm,
    BButton,
    BFormInput,
    BFormGroup,
  },
  data: () => ({
    username: "",
    password: "",
    error: ""
  }),
  computed: {
    ...mapGetters({
    }),
  },
  methods: {
    ...mapActions({
      loginWithUserNameAndPassword: "auth/login",
      loginWithGoogle: "auth/signInWithGoogle"
    }),
    async signInWithGoogle() {
      try {
        var user = await this.loginWithGoogle();

        await this.createUpdateUser(user);
        this.$router.push("/");
      } catch (error) {
        this.error = error;
      }
    },
    async login() {
      try {
        var user = await this.loginWithUserNameAndPassword({
          username: this.username,
          password: this.password,
        });

        await this.createUpdateUser(user);
        this.$router.push("/");
      } catch (error) {
        this.error = error;
      }
    },
    async createUpdateUser(user) {
      try {
        this.error = "";
        if (!user) {
          this.error = "Please enter an login";
          return;
        }
        const newUser = {
          ownerId: user.id,
          owner: user.username,
          name: user.username,
          username: user.username
        };

        if (user.attributes != null && user.attributes.email != null) {
            newUser.email = user.attributes.email;
        }

        await this.$store.dispatch("users/createUpdateUser", newUser);
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