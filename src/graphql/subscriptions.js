/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($owner: String!) {
    onCreateUser(owner: $owner) {
      id
      ownerId
      username
      name
      email
      createdAt
      updatedAt
      owner
      role
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($owner: String!) {
    onUpdateUser(owner: $owner) {
      id
      ownerId
      username
      name
      email
      createdAt
      updatedAt
      owner
      role
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($owner: String!) {
    onDeleteUser(owner: $owner) {
      id
      ownerId
      username
      name
      email
      createdAt
      updatedAt
      owner
      role
    }
  }
`;
export const onCreateShop = /* GraphQL */ `
  subscription OnCreateShop($owner: String!) {
    onCreateShop(owner: $owner) {
      id
      name
      userId
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateShop = /* GraphQL */ `
  subscription OnUpdateShop($owner: String!) {
    onUpdateShop(owner: $owner) {
      id
      name
      userId
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteShop = /* GraphQL */ `
  subscription OnDeleteShop($owner: String!) {
    onDeleteShop(owner: $owner) {
      id
      name
      userId
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateCategory = /* GraphQL */ `
  subscription OnCreateCategory($owner: String!) {
    onCreateCategory(owner: $owner) {
      id
      name
      products {
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateCategory = /* GraphQL */ `
  subscription OnUpdateCategory($owner: String!) {
    onUpdateCategory(owner: $owner) {
      id
      name
      products {
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteCategory = /* GraphQL */ `
  subscription OnDeleteCategory($owner: String!) {
    onDeleteCategory(owner: $owner) {
      id
      name
      products {
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateProduct = /* GraphQL */ `
  subscription OnCreateProduct($owner: String!) {
    onCreateProduct(owner: $owner) {
      id
      name
      price
      category {
        id
        name
        createdAt
        updatedAt
        owner
      }
      images {
        nextToken
      }
      createdAt
      updatedAt
      owner
      categoryId
    }
  }
`;
export const onUpdateProduct = /* GraphQL */ `
  subscription OnUpdateProduct($owner: String!) {
    onUpdateProduct(owner: $owner) {
      id
      name
      price
      category {
        id
        name
        createdAt
        updatedAt
        owner
      }
      images {
        nextToken
      }
      createdAt
      updatedAt
      owner
      categoryId
    }
  }
`;
export const onDeleteProduct = /* GraphQL */ `
  subscription OnDeleteProduct($owner: String!) {
    onDeleteProduct(owner: $owner) {
      id
      name
      price
      category {
        id
        name
        createdAt
        updatedAt
        owner
      }
      images {
        nextToken
      }
      createdAt
      updatedAt
      owner
      categoryId
    }
  }
`;
export const onCreateImage = /* GraphQL */ `
  subscription OnCreateImage($owner: String!) {
    onCreateImage(owner: $owner) {
      id
      fullsize {
        region
        bucket
        key
      }
      thumbnail {
        region
        bucket
        key
      }
      contentType
      height
      width
      size
      product {
        id
        name
        price
        createdAt
        updatedAt
        owner
        categoryId
      }
      createdAt
      updatedAt
      owner
      productId
    }
  }
`;
export const onUpdateImage = /* GraphQL */ `
  subscription OnUpdateImage($owner: String!) {
    onUpdateImage(owner: $owner) {
      id
      fullsize {
        region
        bucket
        key
      }
      thumbnail {
        region
        bucket
        key
      }
      contentType
      height
      width
      size
      product {
        id
        name
        price
        createdAt
        updatedAt
        owner
        categoryId
      }
      createdAt
      updatedAt
      owner
      productId
    }
  }
`;
export const onDeleteImage = /* GraphQL */ `
  subscription OnDeleteImage($owner: String!) {
    onDeleteImage(owner: $owner) {
      id
      fullsize {
        region
        bucket
        key
      }
      thumbnail {
        region
        bucket
        key
      }
      contentType
      height
      width
      size
      product {
        id
        name
        price
        createdAt
        updatedAt
        owner
        categoryId
      }
      createdAt
      updatedAt
      owner
      productId
    }
  }
`;
