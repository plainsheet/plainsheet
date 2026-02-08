"use client";

import {
  BottomSheet,
  useBottomSheet,
  useBottomSheetHistory,
} from "@plainsheet/react";
import { Heading, Text, VStack } from "@chakra-ui/react";
import { ProductOptionsForm } from "@/components/ecommerce-example/ProductOptionsForm";
import { Button } from "@/components/ui/button";
import { SourceCodeAlert } from "@/components/SourceCodeAlert";

export default function HistoryExamplePage() {
  return (
    <VStack
      width={"full"}
      height={"full"}
      padding={"8"}
      justifyContent={"center"}
      gap="5px"
    >
      <SourceCodeAlert link="https://github.com/plainsheet/plainsheet/blob/main/apps/nextjs/app/history/page.tsx" />
      <HistoryExample />
    </VStack>
  );
}

function HistoryExample() {
  const bottomSheet = useBottomSheet();
  const history = useBottomSheetHistory({
    isOpen: bottomSheet.isOpen,
    onClose: bottomSheet.close,
    hashPrefix: "pbs-example-",
  });

  return (
    <VStack gap={5} width="full">
      <Heading size={"xl"}>Sync the sheet with browser history</Heading>
      <Text maxWidth="720px" textAlign="center">
        Open the sheet, then use your browser back button to close it. The hash
        entry is pushed only while the sheet is open.
      </Text>
      <Button onClick={() => bottomSheet.open()}>Open it</Button>

      <VStack
        backgroundColor={"whiteAlpha.300"}
        padding={6}
        borderRadius={5}
        width="50%"
        height={"fit-content"}
        justifyContent={"center"}
        gap="3"
      >
        <Heading size={"md"}>hash: {history.hash}</Heading>
        <Heading size={"md"}>
          hasPushed: {BooleanIndicator(history.hasPushed)}
        </Heading>
        <Heading size={"md"}>
          isTopmost: {BooleanIndicator(history.isTopmost)}
        </Heading>
        <Heading size={"md"}>id: {history.id}</Heading>
      </VStack>

      <BottomSheet {...bottomSheet.props}>
        <ProductOptionsForm />
      </BottomSheet>
    </VStack>
  );
}

function BooleanIndicator(flag: boolean) {
  return flag ? "✅" : "🔴";
}
