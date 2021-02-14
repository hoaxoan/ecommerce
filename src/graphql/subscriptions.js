/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateShop = /* GraphQL */ `
  subscription OnCreateShop {
    onCreateShop {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateShop = /* GraphQL */ `
  subscription OnUpdateShop {
    onUpdateShop {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteShop = /* GraphQL */ `
  subscription OnDeleteShop {
    onDeleteShop {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCategory = /* GraphQL */ `
  subscription OnCreateCategory {
    onCreateCategory {
      id
      name
      products {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCategory = /* GraphQL */ `
  subscription OnUpdateCategory {
    onUpdateCategory {
      id
      name
      products {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCategory = /* GraphQL */ `
  subscription OnDeleteCategory {
    onDeleteCategory {
      id
      name
      products {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateProduct = /* GraphQL */ `
  subscription OnCreateProduct {
    onCreateProduct {
      id
      name
      price
      category {
        id
        name
        createdAt
        updatedAt
      }
      photos {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateProduct = /* GraphQL */ `
  subscription OnUpdateProduct {
    onUpdateProduct {
      id
      name
      price
      category {
        id
        name
        createdAt
        updatedAt
      }
      photos {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteProduct = /* GraphQL */ `
  subscription OnDeleteProduct {
    onDeleteProduct {
      id
      name
      price
      category {
        id
        name
        createdAt
        updatedAt
      }
      photos {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateImage = /* GraphQL */ `
  subscription OnCreateImage {
    onCreateImage {
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
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateImage = /* GraphQL */ `
  subscription OnUpdateImage {
    onUpdateImage {
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
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteImage = /* GraphQL */ `
  subscription OnDeleteImage {
    onDeleteImage {
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
      }
      createdAt
      updatedAt
    }
  }
`;
