"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

import { Button } from "../ui/button";

import { Label } from "../ui/label";

const CategoryFilters = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY >= 570);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Card className="sticky top-[80px] hidden h-[485px] overflow-y-auto overflow-x-hidden lg:block lg:w-[350px] ">
      <CardContent className=" flex w-full  flex-col items-start gap-y-4  pl-4 ">
        <Accordion className="w-full" type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg font-medium text-black dark:text-white ">
              {" "}
              Trending
            </AccordionTrigger>
            <AccordionContent
              className="flex h-[100p] w-full flex-wrap gap-x-4 gap-y-4 border-none"
              asChild
            ></AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion className="w-full" type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg font-medium text-black dark:text-white">
              {" "}
              Food Preference
            </AccordionTrigger>
            <AccordionContent
              className="flex h-[100p] w-full flex-wrap gap-x-4 gap-y-4"
              asChild
            ></AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion className="w-full" type="single" collapsible>
          <AccordionItem value="item-1" className="w-full">
            <AccordionTrigger className="text-lg font-medium text-black dark:text-white">
              {" "}
              Cuisine
            </AccordionTrigger>
            <AccordionContent
              className="flex h-[100p] w-full flex-wrap gap-x-4 gap-y-4"
              asChild
            ></AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion className="w-full border-none " type="single" collapsible>
          <AccordionItem value="item-1" className="w-full">
            <AccordionTrigger className="border-none text-lg font-medium text-black dark:text-white">
              {" "}
              CATEGORIES
            </AccordionTrigger>
            <AccordionContent
              className="flex h-[100p] w-full flex-col gap-y-4"
              asChild
            ></AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default CategoryFilters;
