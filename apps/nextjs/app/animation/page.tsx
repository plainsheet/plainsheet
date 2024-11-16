"use client";

import { Header } from "@/components/header";
import { Reviews } from "@/components/reviews";
import { RelatedProducts } from "@/components/related-products";
import { ProductDetailReviews } from "@/components/product-detail-reviews";
import { ImageGallery } from "@/components/image-gallery";
import { ColorPicker } from "@/components/color-picker";
import { SizePicker } from "@/components/size-picker";
import { Policies } from "@/components/policies";
import { ProductDetails } from "@/components/product-details";
import { Footer } from "@/components/footer";
import { Materials } from "@/components/materials";
import { ProductHeading } from "@/components/product-heading";
import { Promo } from "@/components/promo";
import { TopBanner } from "@/components/top-banner";

import { BottomSheet, useBottomSheet } from "@plainsheet/react";

export default function Example() {
  const bottomSheet = useBottomSheet();

  return (
    <div className="bg-white">
      <TopBanner />
      <Header />
      <Promo />

      <main className="mx-auto mt-8 max-w-2xl px-4 pb-16 sm:px-6 sm:pb-24 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-5 lg:col-start-8">
            <ProductHeading />
            <ProductDetailReviews />
          </div>

          <ImageGallery />

          <div className="mt-8 lg:col-span-5">
            <button
              type="submit"
              className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-slate-600 px-8 py-3 text-base font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
              onClick={() => bottomSheet.instance.open()}
            >
              Pick options
            </button>

            <ProductDetails />
            <Materials />
            <Policies />
          </div>
        </div>

        <Reviews />
        <RelatedProducts />

        <BottomSheet {...bottomSheet.props}>
          <form
            className="p-8"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <h3>Customize your T-shirt</h3>

            <ColorPicker />

            <SizePicker />

            <button
              type="submit"
              className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-slate-600 px-8 py-3 text-base font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
              onClick={() => {
                alert("Added to the cart!");
                bottomSheet.instance.close();
              }}
            >
              Submit
            </button>
          </form>
        </BottomSheet>
      </main>

      <Footer />
    </div>
  );
}
