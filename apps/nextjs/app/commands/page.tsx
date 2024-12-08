"use client";

import { BottomSheet, useBottomSheet } from "@plainsheet/react";
import {
  Box,
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
import { SourceCodeAlert } from "@/components/SourceCodeAlert";

export default function CommandsExamplePage() {
  return (
    <VStack
      width={"full"}
      height={"full"}
      padding={"8"}
      justifyContent={"center"}
      gap="5px"
    >
      <SourceCodeAlert link="https://github.com/plainsheet/plainsheet/blob/main/apps/nextjs/app/commands/page.tsx" />

      <MoveToExample />
      <CustomMountingPointExample />
    </VStack>
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
      width="90%"
      height={"fit-content"}
      justifyContent={"center"}
      gap="6"
    >
      <Heading size={"xl"}>Custom mounting point</Heading>

      <Box
        borderRadius={4}
        ref={mountingPointRef}
        width={"100%"}
        height={"full"}
        padding={4}
        color={"white"}
        textAlign={"center"}
      >
        <Text>
          Open the bottom sheet and inspect this element. <br />
          <Highlight
            query={"The bottom sheet is inside of it!"}
            styles={{ px: "0.5", bg: "blue.subtle", color: "blue.fg" }}
          >
            The bottom sheet is inside of it!
          </Highlight>
        </Text>
      </Box>

      <VStack width="100%" justifyContent={"center"} gap="6">
        <Button onClick={() => customMountingPointBottomSheet.open()}>
          Custom Mounting Point Example
        </Button>
        <BottomSheet
          {...customMountingPointBottomSheet.props}
          mountingPointRef={mountingPointRef}
        >
          <ProductOptionsForm onSubmit={customMountingPointBottomSheet.open} />
        </BottomSheet>
      </VStack>
    </VStack>
  );
}

type Unit = "px" | "percent";
function MoveToExample() {
  const bottomSheet = useBottomSheet();
  const [whereToMove, setWhereToMove] = useState("100");
  const [unit, setUnit] = useState<Unit>("px");

  const formattedWhereToMove =
    unit === "percent" ? Number(whereToMove) * 100 : whereToMove;

  return (
    <VStack
      backgroundColor={"whiteAlpha.300"}
      padding={6}
      borderRadius={5}
      width="90%"
      height={"fit-content"}
      justifyContent={"center"}
      gap="6"
    >
      <VStack justifyContent={"center"} gap="6">
        <Heading size={"xl"}>Moving bottom sheet</Heading>

        <Button onClick={() => bottomSheet.open()}>Open</Button>

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
                bottomSheet.snapTo(position);
              } else {
                bottomSheet.moveTo(position);
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
              Move it to {formattedWhereToMove} {unit}
            </Button>
          </VStack>
        </BottomSheet>
      </VStack>
    </VStack>
  );
}
