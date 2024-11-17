"use client";

import { Heading, Highlight, LinkBox, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { Link as ChakraLink } from "@chakra-ui/react";

export default function Example() {
  return (
    <VStack width={"full"} height={"full"} justifyContent={"center"} gap="20px">
      <Heading size={"2xl"} width={"fit-content"}>
        <Highlight
          query={"customize Plain Sheet for your needs!"}
          styles={{ px: "0.5", bg: "blue.subtle", color: "blue.fg" }}
        >
          Check out how you can customize Plain Sheet for your needs!
        </Highlight>
      </Heading>
      <VStack justify={"center"} height={"fit-content"}>
        <ChakraLink colorPalette="blue">
          <Link href={"/animation"}>Animation</Link>
        </ChakraLink>
        <ChakraLink colorPalette="blue">
          <Link href={"/commands"}>Commands</Link>{" "}
        </ChakraLink>
        <ChakraLink colorPalette="blue">
          <Link href={"/css"}>Css</Link>{" "}
        </ChakraLink>
        <ChakraLink colorPalette="blue">
          <Link href={"/getters"}>Getters</Link>{" "}
        </ChakraLink>
        <ChakraLink colorPalette="blue">
          <Link href={"/life-cycle-callbacks"}>Life Cycle Callbacks</Link>{" "}
        </ChakraLink>
        <ChakraLink colorPalette="blue">
          <Link href={"/mutable-props"}>Mutable Props</Link>{" "}
        </ChakraLink>
      </VStack>
    </VStack>
  );
}
