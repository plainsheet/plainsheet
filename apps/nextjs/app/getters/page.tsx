"use client";

import { BottomSheet, useBottomSheet } from "@plainsheet/react";
import { Heading, VStack } from "@chakra-ui/react";
import { ProductOptionsForm } from "@/components/ecommerce-example/ProductOptionsForm";
import { Button } from "@/components/ui/button";

export default function GettersExamplePage() {
  return (
    <VStack
      width={"full"}
      height={"full"}
      padding={"8"}
      justifyContent={"center"}
      gap="5px"
    >
      <GettersExample />
    </VStack>
  );
}

export function GettersExample() {
  const bottomSheet = useBottomSheet();

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
      <Heading size={"md"}>
        isMounted: {BooleanIndicator(bottomSheet.instance.getIsMounted())}
      </Heading>
      <Heading size={"md"}>
        isOpen: {BooleanIndicator(bottomSheet.isOpen)}
      </Heading>
      <Heading size={"md"}>
        isClosed: {BooleanIndicator(!bottomSheet.isOpen)}
      </Heading>
      <Heading size={"md"}>height: {bottomSheet.instance.getHeight()}</Heading>
      <Heading size={"md"}>
        position: {bottomSheet.instance.getPosition()}
      </Heading>

      <Button onClick={() => bottomSheet.instance.open()}>Open</Button>

      <BottomSheet {...bottomSheet.props} shouldCloseOnOutsideClick={false}>
        <ProductOptionsForm />
      </BottomSheet>
    </VStack>
  );
}

function BooleanIndicator(flag: boolean) {
  return flag ? "✅" : "🔴";
}
