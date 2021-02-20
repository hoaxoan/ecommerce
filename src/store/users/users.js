import { API, graphqlOperation } from "aws-amplify";
import { createUser as createUserMutation } from "@/graphql/mutations";
import { getUser as getUserQuery } from "@/graphql/queries";
import { listUsers as listUsersQuery } from '@/graphql/queries';
import { countUsers as countUsersQuery } from '@/graphql/queries';

export const users = {
    namespaced: true,
    state: { users: null },
    mutations: {
        setUsers(state, payload) {
            state.users = payload;
        }
    },
    actions: {
        async createUser(_, newUser) {
            try {
                await API.graphql(graphqlOperation(createUserMutation, { input: newUser }))

            } catch (error) {
                console.error("createUser", error)
            }
        },

        async getUser(_, id) {
            try {

                const userData = await API.graphql(graphqlOperation(getUserQuery, { id: id }))
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

    },
    getters: {
        users: (state) => state.users
    }
}