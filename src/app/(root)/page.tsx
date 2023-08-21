import { Header } from "@/components/layout/Header";
import StoreBanner from "@/components/shared/StoreBanner";
import Balance from "react-wrap-balancer";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";
import { productCategories } from "@/constants/products";
import FadeIn from "@/components/animations/FadeIn";
import Subscribe from "@/components/shared/Subscribe";
import Footer from "@/components/shared/Footer";

const callouts = [
  {
    name: "Desk and Office",
    description: "Work from home accessories",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg",
    imageAlt:
      "Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.",
    href: "#",
  },
  {
    name: "Self-Improvement",
    description: "Journals and note-taking",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg",
    imageAlt:
      "Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.",
    href: "#",
  },
  {
    name: "Travel",
    description: "Daily commute essentials",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg",
    imageAlt: "Collection of four insulated travel bottles on wooden shelf.",
    href: "#",
  },
];

export default function Home() {
  return (
    <>
      <StoreBanner />
      <div className="container w-full h-fit min-h-screen">
        <FadeIn>
          <section
            id="categories"
            aria-labelledby="categories-heading"
            className="space-y-6 py-6 md:pt-10 lg:pt-24"
          >
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
                Categories
              </h2>
              <Balance className="max-w-[46rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Explore our categories and find the best products for you
              </Balance>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {productCategories.map((category) => (
                <Link
                  aria-label={`Go to ${category.title}`}
                  key={category.title}
                  href={`/categories/${category.title}`}
                >
                  <div className="group relative overflow-hidden rounded-md">
                    <AspectRatio ratio={4 / 5}>
                      <div className="absolute inset-0 z-10 bg-black/60 transition-colors group-hover:bg-black/70" />
                      <Image
                        src={category.image}
                        alt={category.title}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        priority
                      />
                    </AspectRatio>
                    <div className="absolute inset-0 z-20 flex items-center justify-center">
                      <h3 className="text-3xl font-medium capitalize text-slate-100 md:text-2xl">
                        {category.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </FadeIn>
        <FadeIn>
          <section className="bg-gray-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
                <h2 className="text-2xl font-bold text-gray-900">
                  Collections
                </h2>

                <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                  {callouts.map((callout) => (
                    <div key={callout.name} className="group relative">
                      <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                        <img
                          src={callout.imageSrc}
                          alt={callout.imageAlt}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <h3 className="mt-6 text-sm text-gray-500">
                        <a href={callout.href}>
                          <span className="absolute inset-0" />
                          {callout.name}
                        </a>
                      </h3>
                      <p className="text-base font-semibold text-gray-900">
                        {callout.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </FadeIn>
        <FadeIn>
          <section className="px-4 sm:py-32 py-16 w-full">
            <Subscribe />
          </section>
        </FadeIn>
      </div>
      <FadeIn>
        <section className=" w-full bg-black px-8 pt-4 pb-8">
          <Footer />
        </section>
      </FadeIn>
    </>
  );
}
