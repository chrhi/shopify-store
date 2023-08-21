import { getProducts } from "@/lib/shopify";
import Image from "next/image";
import React from "react";

async function page() {
  const data = await getProducts();
  //@ts-ignore
  const products = data?.products?.edges as unknown[];
  console.log("here there is the products from shopify");

  return (
    <div>
      {products.map((item) => {
        return (
          <div className="w-[300px] h-[400px] flex flex-col">
            {/* @ts-ignore */}
            <Image
              //@ts-ignore
              src={item?.node?.featuredImage?.url}
              //@ts-ignore
              alt={item?.node?.featuredImage?.alttext}
              width={100}
              height={200}
            />
            {/* @ts-ignore */}
            <p>{item.node.title}</p>
            {/* @ts-ignore */}
            <p>{item.node.id}</p>
            {/* @ts-ignore */}
            <p>{item.node.handle}</p>
          </div>
        );
      })}
    </div>
  );
}

export default page;
