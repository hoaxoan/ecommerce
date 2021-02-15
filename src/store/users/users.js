import { API, graphqlOperation } from "aws-amplify";
import { createUser as createUserMutation } from "@/graphql/mutations";
import { getUser as getUserQuery } from "@/graphql/queries";
import { listUsers as listUsersQuery } from '@/graphql/queries';

export const users = {
    namespaced: true,
    state: { users: null },
    mutations: {
        setUsers(state, payload) {
            state.users = payload;
        }
    },
    actions: {
        async createUser({ dispatch }, newUser) {
            try {
                await API.graphql(graphqlOperation(createUserMutation, { input: newUser }))

                dispatch("getUsersData");

            } catch (error) {
                console.error("createUser", error)
            }
        },
        async getUser(_, userId) {
            return await API.graphql(
                graphqlOperation(getUserQuery, { id: userId })
            )
        },
        async getUsersData({ commit }) {
            const usersData = await API.graphql(graphqlOperation(listUsersQuery));
            commit("setUsers", usersData.data.listUsers.items);
        }
    },
    getters: {
        users: (state) => state.users
    }
}