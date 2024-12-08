"use client";

import { BottomSheet, useBottomSheet } from "@plainsheet/react";
import { Heading, VStack } from "@chakra-ui/react";
import { ProductOptionsForm } from "@/components/ecommerce-example/ProductOptionsForm";
import { Button } from "@/components/ui/button";
import { SourceCodeAlert } from "@/components/SourceCodeAlert";

export default function StyleExamplePage() {
  return (
    <VStack
      width={"full"}
      height={"full"}
      padding={"8"}
      justifyContent={"center"}
      gap="5px"
    >
      <SourceCodeAlert link="https://github.com/plainsheet/plainsheet/blob/main/apps/nextjs/app/style/page.tsx" />
      <StyleExample />
    </VStack>
  );
}

function StyleExample() {
  const bottomSheet = useBottomSheet();

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
        Check out how you can style each element of the bottom sheet
      </Heading>
      <Button onClick={() => bottomSheet.open()}>Open it</Button>

      <BottomSheet
        {...bottomSheet.props}
        containerStyle={{
          borderRadius: "15px 15px 0 0",
          boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.2)",
          backgroundColor: "white",
          padding: "20px",
        }}
        handleStyle={{
          height: "50px",
          width: "100%",
          borderRadius: "10px",
          backgroundColor: "#1a88e9",
          margin: "10px auto",
        }}
        contentWrapperStyle={{
          borderRadius: "40px",
          backgroundColor: "#818181",
          padding: "10px",
          marginTop: "20px",
        }}
        backdropStyle={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <ProductOptionsForm />
      </BottomSheet>
    </VStack>
  );
}
