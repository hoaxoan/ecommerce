import { API, graphqlOperation, Storage } from "aws-amplify";
import { getProduct as getProductQuery } from '@/graphql/queries';
import { listProducts as listProductsQuery } from '@/graphql/queries';
import { createProduct as createProductMutation } from "@/graphql/mutations";
import { updateProduct as updateProductMutation } from "@/graphql/mutations";
import { deleteProduct as deleteProductMutation } from "@/graphql/mutations";
import { getImage as getImageQuery } from '@/graphql/queries';
import { listImages as listImagesQuery } from '@/graphql/queries';
import { createImage as createImageMutation } from "@/graphql/mutations";
import { updateImage as updateImageMutation } from "@/graphql/mutations";
import { v4 as uuidv4 } from 'uuid';
import awsconfig from "@/aws-exports";

export const products = {
    namespaced: true,
    state: { products: null },
    mutations: {
        setPropducts(state, payload) {
            state.products = payload;
        }
    },
    actions: {
        async createProduct({ dispatch }, newProduct) {
            try {
                // Product
                const product = {
                    name: newProduct.name,
                    price: newProduct.price,
                    productCategoryId: newProduct.productCategoryId,
                };

                const productData = await API.graphql(graphqlOperation(createProductMutation, { input: product }));

                // Images
                if (newProduct.images != null && newProduct.images.length > 0) {
                    for (let i = 0; i < newProduct.images.length; i++) {
                        const image = newProduct.images[i];
                        image.imageProductId = productData.id;
                        await dispatch("createUpdateImage", image);
                    }
                }

                return productData.data.createProduct;
            } catch (error) {
                console.log("createProduct", error);
            }
        },

        async updateProduct({ dispatch }, newProduct) {
            try {

                // Product
                const product = {
                    id: newProduct.id,
                    name: newProduct.name,
                    price: newProduct.price,
                    productCategoryId: newProduct.productCategoryId,
                };

                const productData = await API.graphql(graphqlOperation(updateProductMutation, { input: product }));
                
                // Images
                if (newProduct.images != null && newProduct.images.length > 0) {
                    for (let i = 0; i < newProduct.images.length; i++) {
                        const image = newProduct.images[i];
                        image.imageProductId = newProduct.id;
                        await dispatch("createUpdateImage", image);
                    }
                }

                return productData.data.updateProduct;
            } catch (error) {
                console.log("updateProduct", error)
            }
        },

        async deleteProduct({ dispatch }, id) {
            try {
                const product = await this.getProduct(id);
                if (product == null)
                    return;
                    
                await API.graphql(graphqlOperation(deleteProductMutation, { input: product }));

                dispatch("getProducts");

            } catch (error) {
                console.log("deleteProduct", error)
            }
        },

        async getProduct(_, id) {
            try {

                const productData = await API.graphql(graphqlOperation(getProductQuery, { id: id }))
                if (productData == null ||
                    productData.data == null ||
                    productData.data.getProduct == null)
                    return null;

                // Images
                if (productData.data.getProduct.images.items == null || 
                    productData.data.getProduct.images.items.length == 0) {
                    const imagesData = await API.graphql(graphqlOperation(listImagesQuery, { imageProductId: id}));

                    const imageItems = await Promise.all(imagesData.data.listImages.items.map(async item => {
                        item.imageUrl = await Storage.get(item.fullsize.key);
                        return item
                    }))
        
                    productData.data.getProduct.images.items = imageItems;
                }

                return productData.data.getProduct;

            } catch (error) {
                console.log("deleteProduct", error);
                return null;
            }
        },

        async getProducts() {
            const productsData = await API.graphql(graphqlOperation(listProductsQuery));
            const products = productsData.data.listProducts.items;

            for (let i = 0; i < products.length; i++) {
                const product = products[i];
                // Image
                if (product.imageUrl == null) {
                    const imagesData = await API.graphql(graphqlOperation(listImagesQuery, { imageProductId: product.id}));
                    if (imagesData.data.listImages.items != null &&
                        imagesData.data.listImages.items.length > 0) {
                        product.imageUrl = await Storage.get(imagesData.data.listImages.items[0].fullsize.key);
                    }
                }
            }

            return products;
        },

        async getImagesByProductId(_, productId) {
            const imagesData = await API.graphql(graphqlOperation(listImagesQuery, { imageProductId: productId}));

            const imageItems = await Promise.all(imagesData.data.listImages.items.map(async item => {
                item.imageUrl = await Storage.get(item.fullsize.key);
                return item
            }))

            return imageItems;
        },

        async createUpdateImage(_, data) {
            try {
                const newImage = {
                    id: data.id,
                    contentType: data.contentType,
                    fullsize: data.fullsize,
                    imageProductId: data.imageProductId
                };
                
                console.log(newImage);

                const imageData = await API.graphql(graphqlOperation(getImageQuery, { id: newImage.id }))
                if (imageData != null && imageData.id != null) {
                    const image = await API.graphql(graphqlOperation(updateImageMutation, { input: newImage }));
                    return Promise.resolve(image.data.updateImage);
                }
                else {
                    const image = await API.graphql(graphqlOperation(createImageMutation, { input: newImage }));
                    return Promise.resolve(image.data.createImage);
                }
            } catch (error) {
                console.log("createUpdateImage", error);
            }
        },

        async uploadImage(_, data) {
            const {
                aws_user_files_s3_bucket_region: region,
                aws_user_files_s3_bucket: bucket
            } = awsconfig;
            const { file } = data;
            const extension = file.name.substr(file.name.lastIndexOf(".") + 1);
            const imageId = uuidv4();
            const key = `images/${imageId}.${extension}`;
            const newImage = {
                id: imageId,
                contentType: file.type,
                fullsize: {
                    key,
                    region,
                    bucket
                }
            };

            //s3 bucket storage add file to it
            try {
                const imageKey = await Storage.put(key, file, {
                    level: "public",
                    contentType: file.type,
                    metadata: { imageId }
                });

                newImage.imageUrl = await Storage.get(imageKey);

                return Promise.resolve(newImage);

            } catch (error) {
                console.log("uploadImage error", error)
                return Promise.reject(error);
            }
        }


    },
    getters: {
        products: (state) => state.products
    }
}