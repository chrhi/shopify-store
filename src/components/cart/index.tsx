import { getCookie } from "cookies-next";
import { getCart } from "@/lib/shopify";

import { CartSheet } from "./cart-sheet";

export default async function Cart() {
  const cartId = getCookie("cartId")?.valueOf().toString();

  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }

  return <CartSheet cart={cart} />;
}
