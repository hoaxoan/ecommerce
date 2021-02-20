import { API, graphqlOperation } from "aws-amplify";
import { getCategory as getCategoryQuery } from '@/graphql/queries';
import { listCategorys as listCategorysQuery } from '@/graphql/queries';
import { createCategory as createCategoryMutation } from "@/graphql/mutations";
import { updateCategory as updateCategoryMutation } from "@/graphql/mutations";
import { deleteProduct as deleteCategoryMutation } from "@/graphql/mutations";

export const categories = {
    namespaced: true,
    state: { categories: null },
    mutations: {
        setCategories(state, payload) {
            state.categories = payload;
        }
    },
    actions: {
        async createCategory({ dispatch }, newCategory) {
            try {
                await API.graphql(graphqlOperation(createCategoryMutation, { input: newCategory }));
                dispatch("getCategories");
            } catch (error) {
                console.log("createCategory", error);
            }
        },

        async updateCategory({ dispatch }, newCategory) {
            try {

                await API.graphql(graphqlOperation(updateCategoryMutation, { input: newCategory }));

                dispatch("getCategories");

            } catch (error) {
                console.log("updateCategory", error)
            }
        },

        async deleteCategory({ dispatch }, id) {
            try {
                const category = await this.getCategory(id);
                if (category == null)
                    return;
                    
                await API.graphql(graphqlOperation(deleteCategoryMutation, { input: category }));

                dispatch("getCategories");

            } catch (error) {
                console.log("deleteCategory", error)
            }
        },

        async getCategory(_, id) {
            try {
                return await API.graphql(
                    graphqlOperation(getCategoryQuery, { id: id })
                )
            } catch (error) {
                console.log("getCategory", error);
                return null;
            }
        },

        async getCategories({ commit }) {
            const categoriesData = await API.graphql(graphqlOperation(listCategorysQuery));
            commit("setCategories", categoriesData.data.listCategorys.items);
            return categoriesData.data.listCategorys.items;
        },


    },
    getters: {
        categories: (state) => state.categories
    }
}