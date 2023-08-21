import { gql, GraphQLClient } from "graphql-request";

const storefrontAccessToken = process.env.STOREFRONT_API_ACCESS_TOKEN ?? "";

const endpoint = process.env.SHOP_URL ?? "";

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
  },
});

export async function getProducts() {
  const getAllProductsQuery = gql`
    {
      products(first: 10) {
        edges {
          node {
            id
            title
            handle
            priceRange {
              minVariantPrice {
                amount
              }
            }
            featuredImage {
              altText
              url
            }
          }
        }
      }
    }
  `;
  try {
    return await graphQLClient.request(getAllProductsQuery);
  } catch (error) {
    console.log(error);
    throw new Error("here it is the error in getproduct");
  }
}

export const getProduct = async (id: string) => {
  const productQuery = gql`
    query getProduct($id: ID!) {
      product(id: $id) {
        id
        handle
        title
        description
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        featuredImage {
          url
          altText
        }
        variants(first: 10) {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  `;
  const variables = {
    id,
  };
  try {
    const data = await graphQLClient.request(productQuery, variables);
    //@ts-ignore
    return data?.product;
  } catch (error) {
    console.log(error);
    throw new Error("there is an error in getting a single product");
  }
};

export async function addToCart(itemId: string, quantity: string) {
  const createCartMutation = gql`
    mutation createCart($cartInput: CartInput) {
      cartCreate(input: $cartInput) {
        cart {
          id
        }
      }
    }
  `;
  const variables = {
    cartInput: {
      lines: [
        {
          quantity: parseInt(quantity),
          merchandiseId: itemId,
        },
      ],
    },
  };
  try {
    return await graphQLClient.request(createCartMutation, variables);
  } catch (error) {
    console.log(error);
    throw new Error("there is an error in the add to cart button");
  }
}

export async function updateCart(
  cartId: string,
  itemId: string,
  quantity: string
) {
  const updateCartMutation = gql`
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
        }
      }
    }
  `;
  const variables = {
    cartId: cartId,
    lines: [
      {
        quantity: parseInt(quantity),
        merchandiseId: itemId,
      },
    ],
  };
  try {
    return await graphQLClient.request(updateCartMutation, variables);
  } catch (error) {
    console.log(error);
    throw new Error("there is an error in the updatecard button");
  }
}

export async function retrieveCart(cartId: string) {
  const cartQuery = gql`
    query cartQuery($cartId: ID!) {
      cart(id: $cartId) {
        id
        createdAt
        updatedAt

        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                }
              }
            }
          }
        }
        estimatedCost {
          totalAmount {
            amount
          }
        }
      }
    }
  `;
  const variables = {
    cartId,
  };
  try {
    const data = await graphQLClient.request(cartQuery, variables);
    //@ts-ignore
    return data?.cart;
  } catch (error) {
    console.log(error);
    throw new Error("failed to fetch the card data");
  }
}

//Retrieving the checkout URL

export const getCheckoutUrl = async (cartId: string) => {
  const getCheckoutUrlQuery = gql`
    query checkoutURL($cartId: ID!) {
      cart(id: $cartId) {
        checkoutUrl
      }
    }
  `;
  const variables = {
    cartId,
  };
  try {
    return await graphQLClient.request(getCheckoutUrlQuery, variables);
  } catch (error) {
    console.log(error);
    throw new Error("error in the checkout uel");
  }
};
