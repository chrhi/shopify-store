import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Navigations } from "./Navigations";
import { CartSheet } from "@/components/cart/cart-sheet";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";
// import Cart from "@/components/cart";
import OpenCart from "@/components/cart/open-cart";
import Cart from "@/components/cart";

export function Header() {
  return (
    <nav className="sticky top-0 z-[50]   h-[70px] w-full  bg-white border-b dark:bg-zinc-900 dark:bg-opacity-10">
      <div className=" container mx-auto flex h-full w-full items-center  justify-between ">
        <div className="block flex-none md:hidden">
          {/* <MobileMenu menu={menu} /> */}
        </div>
        <div className="flex h-full w-[850px] items-center justify-start">
          <Link
            href="/"
            className="mr-2 flex w-full items-center justify-center md:w-auto "
          >
            <Image src="/assets/brand.png" alt="logo" width={80} height={80} />
          </Link>

          <div className="w-[700px] flex h-full pl-4 items-center justify-start">
            <Navigations />
          </div>
        </div>

        <div className="hidden h-full  w-[500px] items-center gap-x-4 justify-end lg:flex">
          <Button variant="ghost">
            <Icons.search className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button variant="ghost">SIGN IN TO GET REWARDS</Button>

          <Suspense fallback={<OpenCart />}>
            <Cart />
          </Suspense>
        </div>
        <div className="flex h-full w-[100px] items-center justify-end lg:hidden"></div>
      </div>
    </nav>
  );
}
