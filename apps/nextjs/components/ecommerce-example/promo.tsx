"use client";

import Image from "next/image";
import summer from "../public/etienne-girardet-Xh6BpT-1tXo-unsplash.jpg";

export function Promo() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-lg">
          <div className="absolute inset-0">
            <Image
              src={summer}
              alt=""
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="relative  px-6 py-32 sm:px-12 sm:py-16 lg:px-16">
            <div className="relative mx-auto flex max-w-3xl flex-col items-start text-left">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                <span className="block sm:inline">Summer Sale</span>
              </h2>
              <p className="mt-3 text-xl text-white">
                Enjoy 20% off all summer styles,
                <br />
                from bright dresses to pastel-hued tops.
              </p>
              <button
                type="button"
                className="mt-8 block w-full rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
              >
                Shop now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
