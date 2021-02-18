<template>
    <div class="content-wrapper clearfix m-2">
        <!-- Table Container Card -->
        <b-card
        no-body
        class="mb-0"
        >

        <div class="m-2">

            <!-- Table Top -->
            <b-row>
            <b-col
                cols="12"
                md="12"
            >
                <div class="d-flex align-items-end justify-content-end">
                <!-- <b-button
                    v-b-modal.modal-center
                    variant="primary"
                    @click="isAddNewUserSidebarActive = true"
                >
                    <span class="text-nowrap">Add Product</span>
                </b-button> -->
                <router-link to="/add-product">
                  <b-button type="submit" variant="primary">Add Product</b-button>
                </router-link>
                </div>
            </b-col>
            </b-row>

        </div>

        <!-- Table -->
        <div class="m-2">
            <b-table
                ref="refUserListTable"
                class="position-relative"
                :items="users"
                responsive
                :fields="tableColumns"
                primary-key="id"
                show-empty
                empty-text="No matching records found"
            >

                <!-- Column: User -->
                <template #cell(user)="data">
                <b-media vertical-align="center">
                    <template #aside>
                    <b-avatar
                        size="32"
                        :src="data.item.avatar"
                        :text="avatarText(data.item.fullName)"
                        :variant="`light-${resolveUserRoleVariant(data.item.role)}`"
                        :to="{ name: 'apps-users-view', params: { id: data.item.id } }"
                    />
                    </template>
                    <b-link
                    :to="{ name: 'apps-users-view', params: { id: data.item.id } }"
                    class="font-weight-bold d-block text-nowrap"
                    >
                    {{ data.item.fullName }}
                    </b-link>
                    <small class="text-muted">@{{ data.item.username }}</small>
                </b-media>
                </template>

                <!-- Column: Role -->
                <template #cell(role)="data">
                <div class="text-nowrap">
                    <feather-icon
                    :icon="resolveUserRoleIcon(data.item.role)"
                    size="18"
                    class="mr-50"
                    :class="`text-${resolveUserRoleVariant(data.item.role)}`"
                    />
                    <span class="align-text-top text-capitalize">{{ data.item.role }}</span>
                </div>
                </template>

                <!-- Column: Status -->
                <template #cell(status)="data">
                <b-badge
                    pill
                    :variant="`light-${resolveUserStatusVariant(data.item.status)}`"
                    class="text-capitalize"
                >
                    {{ data.item.status }}
                </b-badge>
                </template>

                <!-- Column: Actions -->
                <template #cell(actions)="data">
                <b-dropdown
                    variant="link"
                    no-caret
                    :right="$store.state.appConfig.isRTL"
                >

                    <template #button-content>
                    <feather-icon
                        icon="MoreVerticalIcon"
                        size="16"
                        class="align-middle text-body"
                    />
                    </template>
                    <b-dropdown-item :to="{ name: 'apps-users-view', params: { id: data.item.id } }">
                    <feather-icon icon="FileTextIcon" />
                    <span class="align-middle ml-50">Details</span>
                    </b-dropdown-item>

                    <b-dropdown-item :to="{ name: 'apps-users-edit', params: { id: data.item.id } }">
                    <feather-icon icon="EditIcon" />
                    <span class="align-middle ml-50">Edit</span>
                    </b-dropdown-item>

                    <b-dropdown-item>
                    <feather-icon icon="TrashIcon" />
                    <span class="align-middle ml-50">Delete</span>
                    </b-dropdown-item>
                </b-dropdown>
                </template>

            </b-table>
        </div>
        
        <div class="mx-2 mb-2">
            <b-row>
            <!-- Pagination -->
            <b-col
                cols="12"
                sm="6"
                class="d-flex align-items-center justify-content-center justify-content-sm-end"
            >

                <b-pagination
                v-model="currentPage"
                :total-rows="totalUsers"
                :per-page="perPage"
                first-number
                last-number
                class="mb-0 mt-1 mt-sm-0"
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
        </div>
        </b-card>

        <!-- modal vertical center -->
        <b-modal
            id="modal-center"
            centered
            title="Vertically Centered"
            ok-only
            ok-title="Accept"
        >
            <b-card-text>
                Croissant jelly-o halvah chocolate sesame snaps.
                Brownie caramels candy canes chocolate cake marshmallow icing lollipop I love.
                Gummies macaroon donut caramels biscuit topping danish.
            </b-card-text>
        </b-modal>
    </div>
</template>

<script>
import { BModal, VBModal, BCard, BRow, BCol, BTable, BMedia, BAvatar, BLink,
BBadge, BDropdown, BDropdownItem, BPagination, } from 'bootstrap-vue'
import { ref } from '@vue/composition-api'

export default {
  name: "ProductManagePage",
  directives: {
    'b-modal': VBModal
  },
  components: {
    BModal,
    BCard,
    BRow,
    BCol,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,
  },
  setup() {
    var users = [];
    // Table Handlers
    const tableColumns = [
        { key: 'user', sortable: true },
        { key: 'email', sortable: true },
        { key: 'role', sortable: true },
        {
        key: 'currentPlan',
        label: 'Plan',
        sortable: true,
        },
        { key: 'status', sortable: true },
        { key: 'actions' },
    ];
    const perPage = ref(10);
    const sortBy = ref('id');
    const totalUsers = ref(0)
    const currentPage = ref(1)

    return {

      users,
      tableColumns,
      perPage,
      currentPage,
      totalUsers,
      sortBy,
    }
  }
};
</script>
