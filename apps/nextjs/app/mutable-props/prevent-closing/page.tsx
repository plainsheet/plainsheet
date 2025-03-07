"use client";

import { BottomSheet, useBottomSheet } from "@plainsheet/react";
import { Code, Heading, VStack } from "@chakra-ui/react";
import { ProductOptionsForm } from "@/components/ecommerce-example/ProductOptionsForm";
import { Button } from "@/components/ui/button";
import { SourceCodeAlert } from "@/components/SourceCodeAlert";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

export default function StyleExamplePage() {
  return (
    <VStack
      width={"full"}
      height={"full"}
      padding={"8"}
      justifyContent={"center"}
      gap="5px"
    >
      <SourceCodeAlert link="https://github.com/plainsheet/plainsheet/blob/main/apps/nextjs/app/mutable-props/prevent-closing/page.tsx" />
      <StyleExample />
    </VStack>
  );
}

function StyleExample() {
  const [preventClosing, setPreventClosing] = useState(false);
  const bottomSheet = useBottomSheet({
    preventClosing,
  });

  return (
    <VStack
      padding={6}
      borderRadius={5}
      width="full"
      height={"fit-content"}
      justifyContent={"center"}
      gap="6"
    >
      <Heading size={"xl"}>
        You can prevent a user from closing a bottom sheet using
        <Code>preventClosing</Code>!
      </Heading>
      <VStack
        backgroundColor={"whiteAlpha.300"}
        padding={6}
        borderRadius={5}
        width="50%"
        height={"fit-content"}
        justifyContent={"center"}
        gap="6"
      >
        <Checkbox
          checked={preventClosing}
          onCheckedChange={(e) => setPreventClosing(e.checked === true)}
        >
          Toggle preventClosing
        </Checkbox>

        <Button onClick={() => bottomSheet.open()}>
          Open it and see how it works!
        </Button>
      </VStack>

      <BottomSheet {...bottomSheet.props}>
        <ProductOptionsForm onSubmit={() => bottomSheet.close()} />
      </BottomSheet>
    </VStack>
  );
}
