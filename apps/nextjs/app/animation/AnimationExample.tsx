"use client";

import { BottomSheet, useBottomSheet } from "@plainsheet/react";
import { Heading, Input, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { ProductOptionsForm } from "@/components/ecommerce-example/ProductOptionsForm";
import { Button } from "@/components/ui/button";

export function AnimationsExample() {
  const bottomSheetEase = useBottomSheet();
  const bottomSheetEaseIn = useBottomSheet();
  const bottomSheetEaseOut = useBottomSheet();
  const bottomSheetEaseInOut = useBottomSheet();
  const bottomSheetSpring = useBottomSheet();

  const bottomSheetCustom = useBottomSheet();
  const [customAnimationTiming, setCustomAnimationTiming] = useState("");
  const [p1x, p1y, p2x, p2y] = customAnimationTiming
    .split(",")
    .map((timing) => Number(timing));

  return (
    <VStack width={"full"} justifyContent={"center"} gap="6">
      <VStack justifyContent={"center"} gap="6">
        <Heading size={"2xl"}>Common Animations</Heading>
        <Button onClick={() => bottomSheetEase.open()}>
          Common Animation Timing - Ease
        </Button>
        <BottomSheet
          {...bottomSheetEase.props}
          draggingAnimationTimings={"ease"}
        >
          <ProductOptionsForm onSubmit={bottomSheetEase.open} />
        </BottomSheet>

        <Button onClick={() => bottomSheetEaseIn.open()}>
          Common Animation Timing - Ease In
        </Button>
        <BottomSheet
          {...bottomSheetEaseIn.props}
          draggingAnimationTimings={"ease-in"}
        >
          <ProductOptionsForm onSubmit={bottomSheetEaseIn.open} />
        </BottomSheet>

        <Button onClick={() => bottomSheetEaseOut.open()}>
          Common Animation Timing - Ease Out
        </Button>
        <BottomSheet
          {...bottomSheetEaseOut.props}
          draggingAnimationTimings={"ease-out"}
        >
          <ProductOptionsForm onSubmit={bottomSheetEaseOut.open} />
        </BottomSheet>

        <Button onClick={() => bottomSheetEaseInOut.open()}>
          Common Animation Timing - Ease In Out
        </Button>
        <BottomSheet
          {...bottomSheetEaseInOut.props}
          draggingAnimationTimings={"ease-in-out"}
        >
          <ProductOptionsForm onSubmit={bottomSheetEaseInOut.open} />
        </BottomSheet>

        <Button onClick={() => bottomSheetSpring.open()}>
          Common Animation Timing - Spring
        </Button>
        <BottomSheet
          {...bottomSheetSpring.props}
          draggingAnimationTimings={"spring"}
        >
          <ProductOptionsForm onSubmit={bottomSheetSpring.open} />
        </BottomSheet>
      </VStack>

      <VStack gap="6">
        <Heading size={"2xl"}>Custom Animations</Heading>
        <Input
          value={customAnimationTiming}
          onChange={(e) => setCustomAnimationTiming(e.target.value)}
          placeholder="ex) 0.45, 1.5, 0.55, 1.0"
        />
        <Button onClick={() => bottomSheetCustom.open()}>
          Custom Animation Timing
        </Button>
        <BottomSheet
          {...bottomSheetCustom.props}
          draggingAnimationTimings={{
            p1x,
            p1y,
            p2x,
            p2y,
          }}
        >
          <ProductOptionsForm onSubmit={bottomSheetCustom.open} />
        </BottomSheet>
      </VStack>
    </VStack>
  );
}
