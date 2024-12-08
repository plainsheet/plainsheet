"use client";

import { BottomSheet, useBottomSheet } from "@plainsheet/react";
import { Heading, VStack } from "@chakra-ui/react";
import { ProductOptionsForm } from "@/components/ecommerce-example/ProductOptionsForm";
import { Button } from "@/components/ui/button";
import { SourceCodeAlert } from "@/components/SourceCodeAlert";

export default function GettersExamplePage() {
  return (
    <VStack
      width={"full"}
      height={"full"}
      padding={"8"}
      justifyContent={"center"}
      gap="5px"
    >
      <SourceCodeAlert link="https://github.com/plainsheet/plainsheet/blob/main/apps/nextjs/app/getters/page.tsx" />
      <GettersExample />
    </VStack>
  );
}

function GettersExample() {
  const bottomSheet = useBottomSheet();

  return (
    <VStack gap={5}>
      <Heading size={"xl"}>
        See how getters change in response to events
      </Heading>
      <Button onClick={() => bottomSheet.open()}>Open it</Button>

      <VStack
        backgroundColor={"whiteAlpha.300"}
        padding={6}
        borderRadius={5}
        width="50%"
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
        <Heading size={"md"}>
          height: {bottomSheet.instance.getHeight()}
        </Heading>
        <Heading size={"md"}>
          position: {bottomSheet.instance.getPosition()}
        </Heading>
        <BottomSheet {...bottomSheet.props}>
          <ProductOptionsForm />
        </BottomSheet>
      </VStack>
    </VStack>
  );
}

function BooleanIndicator(flag: boolean) {
  return flag ? "✅" : "🔴";
}
