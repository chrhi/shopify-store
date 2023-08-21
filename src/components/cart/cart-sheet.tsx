"use client";

import Image from "next/image";

import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UpdateCart } from "@/components/cart/update-cart";
import { Icons } from "@/components/shared/icons";

import Price from "@/components/shared/price";
import { DEFAULT_OPTION } from "@/lib/constants";
import type { Cart } from "@/lib/shopify/types";
import { createUrl } from "@/lib/utils";

import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";

import DeleteItemButton from "./delete-item-button";
import EditItemQuantityButton from "./edit-item-quantity-button";
import { ShoppingCartIcon } from "lucide-react";

type MerchandiseSearchParams = {
  [key: string]: string;
};

export async function CartSheet({ cart }: { cart: Cart | undefined }) {
  const [isOpen, setIsOpen] = useState(false);
  const quantityRef = useRef(cart?.totalQuantity);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  useEffect(() => {
    // Open cart modal when quantity changes.
    if (cart?.totalQuantity !== quantityRef.current) {
      // But only if it's not already open (quantity also changes when editing items in cart).
      if (!isOpen) {
        setIsOpen(true);
      }

      // Always update the quantity reference
      quantityRef.current = cart?.totalQuantity;
    }
  }, [isOpen, cart?.totalQuantity, quantityRef]);

  return (
    <Sheet open={isOpen} onOpenChange={(val) => setIsOpen(val.valueOf())}>
      <SheetTrigger asChild>
        <Button
          aria-label="Open cart"
          variant="outline"
          size="icon"
          className="relative"
        >
          {cart?.totalQuantity && cart?.totalQuantity > 0 && (
            <Badge
              variant="secondary"
              className="absolute -right-2 -top-2 h-6 w-6 rounded-full p-2"
            >
              {cart?.totalQuantity}
            </Badge>
          )}
          <Icons.cart className="h-4 w-4" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-1">
          <SheetTitle>
            Cart{" "}
            {cart?.totalQuantity &&
              cart?.totalQuantity > 0 &&
              `(${cart?.totalQuantity})`}
          </SheetTitle>
        </SheetHeader>
        <Separator />

        {!cart || cart.lines.length === 0 ? (
          <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
            <ShoppingCartIcon className="h-16" />
            <p className="mt-6 text-center text-2xl font-bold">
              Your cart is empty.
            </p>
          </div>
        ) : (
          <div className="flex h-full flex-col justify-between overflow-hidden p-1">
            <ul className="flex-grow overflow-auto py-4">
              {cart.lines.map((item, i) => {
                const merchandiseSearchParams = {} as MerchandiseSearchParams;

                item.merchandise.selectedOptions.forEach(({ name, value }) => {
                  if (value !== DEFAULT_OPTION) {
                    merchandiseSearchParams[name.toLowerCase()] = value;
                  }
                });

                const merchandiseUrl = createUrl(
                  `/product/${item.merchandise.product.handle}`,
                  new URLSearchParams(merchandiseSearchParams)
                );

                return (
                  <li
                    key={i}
                    className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700"
                  >
                    <div className="relative flex w-full flex-row justify-between px-1 py-4">
                      <div className="absolute z-40 -mt-2 ml-[55px]">
                        <DeleteItemButton item={item} />
                      </div>
                      <Link
                        href={merchandiseUrl}
                        onClick={closeCart}
                        className="z-30 flex flex-row space-x-4"
                      >
                        <div className="relative h-16 w-16 cursor-pointer overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                          <Image
                            className="h-full w-full object-cover"
                            width={64}
                            height={64}
                            alt={
                              item.merchandise.product.featuredImage.altText ||
                              item.merchandise.product.title
                            }
                            src={item.merchandise.product.featuredImage.url}
                          />
                        </div>

                        <div className="flex flex-1 flex-col text-base">
                          <span className="leading-tight">
                            {item.merchandise.product.title}
                          </span>
                          {item.merchandise.title !== DEFAULT_OPTION ? (
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">
                              {item.merchandise.title}
                            </p>
                          ) : null}
                        </div>
                      </Link>
                      <div className="flex h-16 flex-col justify-between">
                        <Price
                          className="flex justify-end space-y-2 text-right text-sm"
                          amount={item.cost.totalAmount.amount}
                          currencyCode={item.cost.totalAmount.currencyCode}
                        />
                        <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
                          <EditItemQuantityButton item={item} type="minus" />
                          <p className="w-6 text-center">
                            <span className="w-full text-sm">
                              {item.quantity}
                            </span>
                          </p>
                          <EditItemQuantityButton item={item} type="plus" />
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
              <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700">
                <p>Taxes</p>
                <Price
                  className="text-right text-base text-black dark:text-white"
                  amount={cart.cost.totalTaxAmount.amount}
                  currencyCode={cart.cost.totalTaxAmount.currencyCode}
                />
              </div>
              <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                <p>Shipping</p>
                <p className="text-right">Calculated at checkout</p>
              </div>
              <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                <p>Total</p>
                <Price
                  className="text-right text-base text-black dark:text-white"
                  amount={cart.cost.totalAmount.amount}
                  currencyCode={cart.cost.totalAmount.currencyCode}
                />
              </div>
            </div>
            <a
              href={cart.checkoutUrl}
              className="block w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
            >
              Proceed to Checkout
            </a>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
