import { API, graphqlOperation } from "aws-amplify";
import { getShop as getShopQuery } from '@/graphql/queries';
import { listShops as listShopsQuery } from '@/graphql/queries';
import { countShops as countShopsQuery } from '@/graphql/queries';
import { createShop as createShopMutation } from "@/graphql/mutations";
import { updateShop as updateShopMutation } from "@/graphql/mutations";
import { deleteShop as deleteShopMutation } from "@/graphql/mutations";

export const shops = {
    namespaced: true,
    state: { shops: null },
    mutations: {
        setShops(state, payload) {
            state.shops = payload;
        }
    },
    actions: {
        async createShop(_, newShop) {
            try {
                // Shop
                const shop = {
                    name: newShop.name,
                };

                const shopData = await API.graphql(graphqlOperation(createShopMutation, { input: shop }));

                return shopData.data.createShop;
            } catch (error) {
                console.log("createShop", error);
            }
        },

        async updateShop(_, newShop) {
            try {

                // Shop
                const shop = {
                    id: newShop.id,
                    name: newShop.name,
                };

                const shopData = await API.graphql(graphqlOperation(updateShopMutation, { input: shop }));
                              
                return shopData.data.updateShop;
            } catch (error) {
                console.log("updateShop", error)
            }
        },

        async deleteShop({ dispatch }, id) {
            try {
                const shop = await this.getShop(id);
                if (shop == null)
                    return;
                    
                await API.graphql(graphqlOperation(deleteShopMutation, { input: shop }));

                dispatch("getShops");

            } catch (error) {
                console.log("deleteShop", error)
            }
        },

        async getShop(_, id) {
            try {

                const shopData = await API.graphql(graphqlOperation(getShopQuery, { id: id }))
                if (shopData == null ||
                    shopData.data == null ||
                    shopData.data.getShop == null)
                    return null;

                return shopData.data.getShop;
            } catch (error) {
                console.log("getShop", error);
                return null;
            }
        },

        async getShops() {
            const shopsData = await API.graphql(graphqlOperation(listShopsQuery));
            return shopsData.data.listShops.items;
        },

        async getShopsPagination({ dispatch }, shopFilter) {
            const variables = {
                filter: shopFilter.filter,   
                limit: shopFilter.limit, 
            };

            if (shopFilter.nextToken != null)
                variables.nextToken = shopFilter.nextToken; 

            const shopsData = await API.graphql({ 
                query: listShopsQuery, 
                variables: variables
            });

            const shops = shopsData.data.listShops;

            // Total records
            shops.totalRecords =  await dispatch("countShops", shopFilter);

            return shops;
        },

        async countShops(_, shopFilter) {
            const variables = {
                filter: shopFilter.filter    
            };
            const shopsData = await API.graphql({ 
                query: countShopsQuery, 
                variables: variables
            });

            if (shopsData.data.listShops == null ||
                shopsData.data.listShops.items == null)
                return 0;

            return shopsData.data.listShops.items.length;
        },

    },
    getters: {
        shops: (state) => state.shops
    }
}