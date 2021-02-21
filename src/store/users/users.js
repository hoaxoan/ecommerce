import { API, graphqlOperation, Auth } from "aws-amplify";
import { getUser as getUserQuery } from "@/graphql/queries";
import { listUsers as listUsersQuery } from '@/graphql/queries';
import { countUsers as countUsersQuery } from '@/graphql/queries';
import { createUser as createUserMutation } from "@/graphql/mutations";
import { updateUser as updateUserMutation } from "@/graphql/mutations";

export const users = {
    namespaced: true,
    state: { users: [], user: null },
    mutations: {
        setUsers(state, payload) {
            state.users = payload;
        },
        setUser(state, payload) {
            state.user = payload;
        }
    },
    actions: {
        async createUpdateUser({ dispatch }, newUser) {
            try {
                const user = await dispatch("getUserByOwnerId", newUser.ownerId);
                if (user != null && user.id != null && user.id.length > 0) {
                    newUser.id = user.id;
                    await API.graphql(graphqlOperation(updateUserMutation, { input: newUser }));
                } else {
                    await API.graphql(graphqlOperation(createUserMutation, { input: newUser }));
                }
            } catch (error) {
                console.error("createUser", error)
            }
        },

        async getUserByOwnerId(_, ownerId) {
            try {

                const usersData = await API.graphql(graphqlOperation(listUsersQuery, { ownerId: ownerId }));
                if (usersData == null ||
                    usersData.data == null ||
                    usersData.data.listUsers == null ||
                    usersData.data.listUsers.items.length == 0)
                    return null;

                return usersData.data.listUsers.items[0];

            } catch (error) {
                console.log("getUserByOwnerId", error);
                return null;
            }
        },

        async getUser(_, id) {
            try {

                const userData = await API.graphql(graphqlOperation(getUserQuery, { id: id }));
                if (userData == null ||
                    userData.data == null ||
                    userData.data.getUser == null)
                    return null;

                return userData.data.getUser;

            } catch (error) {
                console.log("getUser", error);
                return null;
            }
        },

        async getUsersPagination({ dispatch }, userFilter) {
            const variables = {
                filter: userFilter.filter,   
                limit: userFilter.limit, 
            };

            if (userFilter.nextToken != null)
                variables.nextToken = userFilter.nextToken; 

            const usersData = await API.graphql({ 
                query: listUsersQuery, 
                variables: variables
            });

            const users = usersData.data.listUsers;

            // Total records
            users.totalRecords =  await dispatch("countUsers", userFilter);

            return users;
        },

        async countUsers(_, userFilter) {
            const variables = {
                filter: userFilter.filter    
            };
            const usersData = await API.graphql({ 
                query: countUsersQuery, 
                variables: variables
            });

            if (usersData.data.listUsers == null ||
                usersData.data.listUsers.items == null)
                return 0;

            return usersData.data.listUsers.items.length;
        },

        async currentUser({ commit, dispatch }) {
            const userInfo = await Auth.currentUserInfo();
            if (userInfo == null)
                return null;

            const user =  await dispatch("getUserByOwnerId", userInfo.id);

            commit("setUser", user);
            return user;
        },


    },
    getters: {
        users: (state) => state.users,
        user: (state) => state.user
    }
}