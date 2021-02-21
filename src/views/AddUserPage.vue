<template>
<div class="content-wrapper clearfix m-2">
      <b-card no-body class="mb-0">
        <b-row class="pt-1 pl-4">
            <b-breadcrumb>
              <b-breadcrumb-item to="/">
                <feather-icon
                  icon="HomeIcon"
                  size="16"
                  class="align-text-top"
                />
              </b-breadcrumb-item>
              <b-breadcrumb-item
                v-for="item in breadcrumbs"
                :key="item.text"
                :active="item.active"
                :to="item.href"
              >
                {{ item.text }}
              </b-breadcrumb-item>
            </b-breadcrumb>
        </b-row>
        <b-form>          
          <div class="content-wrapper p-4">
            <b-row>
              <b-col>
                <!-- User -->
                  <b-row>
                    <b-col cols="12" class="pt-2">
                      <b-form-group
                        label="User Name"
                        label-for="h-user-name"
                        label-cols-md="4"
                      >
                        <b-form-input
                          id="h-user-name"
                          placeholder="User Name"
                          v-model="user.username"
                        />
                      </b-form-group>
                    </b-col>
                    <b-col cols="12" class="pt-2">
                      <b-form-group
                        label="Role"
                        label-for="h-role"
                        label-cols-md="4"
                      >
                        <b-form-select
                          id="h-role"
                          v-model="user.role"
                          :options="roles"
                        />
                      </b-form-group>
                    </b-col>      
                  </b-row>             

              </b-col>
            </b-row>         
            <b-row>
              <!-- submit and reset -->
              <b-col>
                <b-button
                  type="submit"
                  variant="primary"
                  class="mr-1"
                  @click.prevent="createUpdateUser"
                >
                  Save
                </b-button>
                <router-link to="/dashboard">
                    <b-button
                        type="reset"
                        variant="outline-secondary"
                      >
                        Cancel
                      </b-button>
                  </router-link>
              </b-col>
            </b-row>
          </div>
      
        </b-form>
              
      </b-card>
</div>
  
  
</template>

<script>
import {
  BRow, BCol, BFormGroup, BFormInput, BForm, BButton,
} from 'bootstrap-vue'

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BButton,
  },
  data: () => ({
    user: {
      type: Object
    },
    roles: [],
    breadcrumbs: [
      {
        text: 'Users',
        href: '/dashboard'
      },
      {
        text: 'Add User',
        active: true
      }
    ]
  }),

  async mounted() {
    // Roles
    this.roles = [{
      text: 'User', value: 'user',
    },
    {
      text: 'Admin', value: 'admin',
    },
    {
      text: 'Shop', value: 'shop',
    }];

    // Get User by Id
    const userData = await this.$store.dispatch("users/getUser", this.id);
    if (userData != null) {
      this.user = userData;
    } 
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  methods: {
    // Create User
    async createUpdateUser() {
      if (this.user == null)
        return;

      // Create/Update User
      const newUser = {
        id: this.user.id,
        username: this.user.username,
        name: this.user.name,
        email: this.user.email,
        ownerId: this.user.ownerId,
        role: this.user.role,
      };
        
      await this.$store.dispatch("users/createUpdateUser", newUser);
      this.$router.push("/dashboard");
    },
  }
}
</script>
