"use client";

import { BottomSheet, useBottomSheet } from "@plainsheet/react";
import {
  Box,
  Grid,
  Heading,
  Highlight,
  Input,
  RadioGroup,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { ProductOptionsForm } from "@/components/ecommerce-example/ProductOptionsForm";
import { Button } from "@/components/ui/button";
import { Radio } from "@/components/ui/radio";

export default function CommandsExamplePage() {
  return (
    <Grid
      width={"full"}
      height={"full"}
      padding={"8"}
      gridTemplateColumns={"50% 50%"}
      gridAutoRows={"50%"}
      justifyContent={"center"}
      gap="5px"
    >
      <MoveToExample />
      <CustomMountingPointExample />
    </Grid>
  );
}

function CustomMountingPointExample() {
  const mountingPointRef = useRef();
  const customMountingPointBottomSheet = useBottomSheet();

  return (
    <VStack
      backgroundColor={"whiteAlpha.300"}
      padding={6}
      borderRadius={5}
      width="full"
      height={"fit-content"}
      justifyContent={"center"}
      gap="6"
    >
      <Heading size={"xl"}>Custom mounting point</Heading>

      <Box
        background={"blue.100"}
        borderRadius={4}
        ref={mountingPointRef}
        width={"full"}
        height={"full"}
        padding={4}
        color={"black"}
      >
        <Text>
          <Highlight
            query={"The bottom sheet is inside of it!"}
            styles={{ px: "0.5", bg: "blue.subtle", color: "blue.fg" }}
          >
            Open the bottom sheet and inspect this element. The bottom sheet is
            inside of it!
          </Highlight>
        </Text>
      </Box>
      <VStack justifyContent={"center"} gap="6">
        <Button onClick={() => customMountingPointBottomSheet.instance.open()}>
          Custom Mounting Point Example
        </Button>
        <BottomSheet
          {...customMountingPointBottomSheet.props}
          mountingPointRef={mountingPointRef}
        >
          <ProductOptionsForm
            onSubmit={customMountingPointBottomSheet.instance.open}
          />
        </BottomSheet>
      </VStack>
    </VStack>
  );
}

type Unit = "px" | "percent";
export function MoveToExample() {
  const bottomSheet = useBottomSheet();
  const [whereToMove, setWhereToMove] = useState("100");
  const [unit, setUnit] = useState<Unit>("px");

  return (
    <VStack
      backgroundColor={"whiteAlpha.300"}
      padding={6}
      borderRadius={5}
      width="full"
      height={"fit-content"}
      justifyContent={"center"}
      gap="6"
    >
      <VStack justifyContent={"center"} gap="6">
        <Heading size={"xl"}>Moving bottom sheet</Heading>

        <Button onClick={() => bottomSheet.instance.open()}>Open</Button>

        <BottomSheet {...bottomSheet.props}>
          <VStack
            as={"form"}
            color="black"
            padding={5}
            onSubmit={(e) => {
              e.preventDefault();
              const position = Number(whereToMove);
              if (typeof position !== "number" || Number.isNaN(position)) {
                return;
              }

              if (unit === "percent") {
                bottomSheet.instance.snapTo(position);
              } else {
                bottomSheet.instance.moveTo(position);
              }
            }}
          >
            <Heading size={"xl"}>
              Change the value to move the bottom sheet
            </Heading>
            <RadioGroup.Root
              value={unit}
              onValueChange={(e) => setUnit(e.value as Unit)}
              display={"flex"}
              alignItems={"center"}
              gap={3}
            >
              <Radio id="unit-px" value="px">
                px(ex: 300)
              </Radio>
              <Radio id="unit-percent" value="percent">
                %(ex: 0.2)
              </Radio>
            </RadioGroup.Root>
            <Input
              value={whereToMove}
              onChange={(e) =>
                setWhereToMove(e.target.value.replace(/^D/g, ""))
              }
              width="40"
              placeholder="ex) 300, or 0.2"
            />

            <Button type="submit">
              Move it to {whereToMove} {unit}
            </Button>
          </VStack>
        </BottomSheet>
      </VStack>
    </VStack>
  );
}
