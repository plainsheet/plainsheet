"use client";

import { ColorPicker } from "@/components/color-picker";
import { SizePicker } from "@/components/size-picker";

import { BottomSheet, useBottomSheet } from "@plainsheet/react";
import { Button, Heading, Input, VStack } from "@chakra-ui/react";
import { useState } from "react";

export default function Example() {
  const bottomSheetEase = useBottomSheet();
  const bottomSheetEaseIn = useBottomSheet();
  const bottomSheetEaseOut = useBottomSheet();
  const bottomSheetEaseInOut = useBottomSheet();
  const bottomSheetSpring = useBottomSheet();

  const [customAnimationTiming, setCustomAnimationTiming] = useState("");
  const [p1x, p1y, p2x, p2y] = customAnimationTiming
    .split(",")
    .map((timing) => Number(timing));

  return (
    <VStack height={"full"} justifyContent={"center"} gap="6">
      <Heading size={"lg"}>Common Animations</Heading>
      <VStack justifyContent={"center"} gap="6">
        <Button
          onClick={() => bottomSheetEase.instance.open()}
          backgroundColor={"blue.100"}
          color={"blue.500"}
        >
          Common Animation Timing - Ease
        </Button>
        <BottomSheet
          {...bottomSheetEase.props}
          draggingAnimationTimings={"ease"}
        >
          <BottomSheetContent onSubmit={bottomSheetEase.instance.open} />
        </BottomSheet>

        <Button
          onClick={() => bottomSheetEaseIn.instance.open()}
          backgroundColor={"blue.100"}
          color={"blue.500"}
        >
          Common Animation Timing - Ease In
        </Button>
        <BottomSheet
          {...bottomSheetEaseIn.props}
          draggingAnimationTimings={"ease-in"}
        >
          <BottomSheetContent onSubmit={bottomSheetEaseIn.instance.open} />
        </BottomSheet>

        <Button
          onClick={() => bottomSheetEaseOut.instance.open()}
          backgroundColor={"blue.100"}
          color={"blue.500"}
        >
          Common Animation Timing - Ease Out
        </Button>
        <BottomSheet
          {...bottomSheetEaseOut.props}
          draggingAnimationTimings={"ease-out"}
        >
          <BottomSheetContent onSubmit={bottomSheetEaseOut.instance.open} />
        </BottomSheet>

        <Button
          onClick={() => bottomSheetEaseInOut.instance.open()}
          backgroundColor={"blue.100"}
          color={"blue.500"}
        >
          Common Animation Timing - Ease In Out
        </Button>
        <BottomSheet
          {...bottomSheetEaseInOut.props}
          draggingAnimationTimings={"ease-in-out"}
        >
          <BottomSheetContent onSubmit={bottomSheetEaseInOut.instance.open} />
        </BottomSheet>

        <Button
          onClick={() => bottomSheetSpring.instance.open()}
          backgroundColor={"blue.100"}
          color={"blue.500"}
        >
          Common Animation Timing - Spring
        </Button>
        <BottomSheet
          {...bottomSheetSpring.props}
          draggingAnimationTimings={"spring"}
        >
          <BottomSheetContent onSubmit={bottomSheetSpring.instance.open} />
        </BottomSheet>
      </VStack>

      <VStack gap="6">
        <Heading size={"lg"}>Customize Animation</Heading>
        <Input
          value={customAnimationTiming}
          onChange={(e) => setCustomAnimationTiming(e.target.value)}
          placeholder="ex) 0.45, 1.5, 0.55, 1.0"
        />
        <Button
          onClick={() => bottomSheetSpring.instance.open()}
          backgroundColor={"blue.100"}
          color={"blue.500"}
        >
          Custom Animation Timing
        </Button>
        <BottomSheet
          {...bottomSheetSpring.props}
          draggingAnimationTimings={{
            p1x,
            p1y,
            p2x,
            p2y,
          }}
        >
          <BottomSheetContent onSubmit={bottomSheetSpring.instance.open} />
        </BottomSheet>
      </VStack>
    </VStack>
  );
}

function BottomSheetContent({ onSubmit }: { onSubmit: () => void }) {
  return (
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
          onSubmit();
        }}
      >
        Submit
      </button>
    </form>
  );
}
