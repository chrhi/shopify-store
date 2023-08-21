"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Expand, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "../ui/button";
import Link from "next/link";

type Props = {
  src: string;
  alt: string;
  name: string;
  price: number;
  image: string;
  id: string;
  handle: string;
};

const Item = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & Props
>(({ className, src, alt, name, price, image, id, handle, ...props }, ref) => {
  const router = useRouter();

  return (
    <Card ref={ref} className=" group relative cursor-pointer hover:shadow-md ">
      <CardContent className="h-[320px] w-full  !p-2">
        <Link
          href={`/product/${handle}`}
          onClick={() => router.push(`/item/${id}`)}
          style={{ width: "100%", height: "280px", position: "relative" }}
        >
          <Image
            alt={name + "image"}
            src={image}
            layout="fill"
            //    objectFit='contain'
          />
        </Link>
        <div className="absolute  bottom-0 left-0 right-0 top-[50%] hidden h-[60px] w-full justify-center gap-x-2 group-hover:flex">
          <Button
            className={cn(
              "bg-yellow-500 text-xs text-white hover:bg-yellow-600 "
            )}
          >
            <Plus className="mr-2 h-4 w-4 text-white" /> Add to cart
          </Button>
        </div>
      </CardContent>
      <CardFooter
        onClick={() => router.push("/item")}
        className="flex flex-col items-start  p-2"
      >
        <p className="text-md text-gray-700 dark:text-gray-200 ">{name}</p>
        <p className="text-lg font-semibold text-gray-900 dark:text-white ">
          ${price}.00
        </p>
      </CardFooter>
    </Card>
  );
});

export default Item;
