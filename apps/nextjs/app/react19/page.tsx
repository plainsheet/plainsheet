"use client";
import { VStack } from "@chakra-ui/react";
import ExampleFormBottomSheet from "./ExampleFormBottomSheet";
import { BottomSheet, useBottomSheet } from "@plainsheet/react";
import { Button } from "@/components/ui/button";
import { SourceCodeAlert } from "@/components/SourceCodeAlert";

export default function React19Page() {
  const bottomSheet = useBottomSheet({
    containerBackgroundColor: "black",
  });
  return (
    <VStack height={"100%"} justifyContent={"center"}>
      <Button width={"300px"} onClick={bottomSheet.open}>
        Open the BottomSheet
      </Button>

      <BottomSheet {...bottomSheet.props}>
        <VStack height={"100%"} justifyContent={"center"}>
          <ExampleFormBottomSheet />
        </VStack>
      </BottomSheet>
      <SourceCodeAlert link="https://github.com/plainsheet/plainsheet/blob/main/apps/nextjs/app/react19/page.tsx" />
    </VStack>
  );
}
