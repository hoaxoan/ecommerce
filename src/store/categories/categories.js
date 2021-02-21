import { API, graphqlOperation } from "aws-amplify";
import { getCategory as getCategoryQuery } from '@/graphql/queries';
import { listCategorys as listCategorysQuery } from '@/graphql/queries';
import { createCategory as createCategoryMutation } from "@/graphql/mutations";
import { updateCategory as updateCategoryMutation } from "@/graphql/mutations";
import { deleteCategory as deleteCategoryMutation } from "@/graphql/mutations";
import { countCategorys as countCategorysQuery } from "@/graphql/queries";

export const categories = {
    namespaced: true,
    state: { categories: null },
    mutations: {
        setCategories(state, payload) {
            state.categories = payload;
        }
    },
    actions: {
        async createCategory(_, newCategory) {
            try {
                await API.graphql(graphqlOperation(createCategoryMutation, { input: newCategory }));
            } catch (error) {
                console.log("createCategory", error);
            }
        },

        async updateCategory(_, newCategory) {
            try {

                await API.graphql(graphqlOperation(updateCategoryMutation, { input: newCategory }));

            } catch (error) {
                console.log("updateCategory", error)
            }
        },

        async createUpdateCategory({ dispatch }, newCategory) {
            try {
                const category = await await dispatch("getCategory", newCategory.userId);
                if (category != null)
                newCategory.Id = category.id;
                
                if (newCategory.id  != null && newCategory.id.length > 0) {
                    return await dispatch("updateCategory", newCategory);
                } else {
                    return await dispatch("createCategory", newCategory);
                }
            } catch (error) {
                console.log("createUpdateCategory", error);
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
                const categoryData = await API.graphql(graphqlOperation(getCategoryQuery, { id: id }));
                if (categoryData == null ||
                    categoryData.data == null ||
                    categoryData.data.getCategory == null)
                    return null;

                return categoryData.data.getCategory;
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
        
        async getCategoriesPagination({ dispatch }, categoryFilter) {
            const variables = {
                filter: categoryFilter.filter,   
                limit: categoryFilter.limit, 
            };

            if (categoryFilter.nextToken != null)
                variables.nextToken = categoryFilter.nextToken; 

            const categoriesData = await API.graphql({ 
                query: listCategorysQuery, 
                variables: variables
            });

            const categories = categoriesData.data.listCategorys;

            // Total records
            categories.totalRecords =  await dispatch("countCategories", categoryFilter);

            return categories;
        },

        async countCategories(_, categoryFilter) {
            const variables = {
                filter: categoryFilter.filter    
            };
            const categoriesData = await API.graphql({ 
                query: countCategorysQuery, 
                variables: variables
            });

            if (categoriesData.data.listCategorys == null ||
                categoriesData.data.listCategorys.items == null)
                return 0;

            return categoriesData.data.listCategorys.items.length;
        },

    },
    getters: {
        categories: (state) => state.categories
    }
}