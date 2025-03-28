"use client";

import { Heading, Highlight, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { Link as ChakraLink } from "@chakra-ui/react";

export default function Example() {
  return (
    <VStack
      width={"fit-content"}
      height={"full"}
      padding={9}
      whiteSpace={"pre-line"}
      margin="0 auto"
      justifyContent={"center"}
      gap="20px"
    >
      <Heading size={"2xl"} width={"100%"} whiteSpace={"pre-line"}>
        <Highlight
          query={"customize Plain Sheet for your needs!"}
          styles={{ px: "0.5", bg: "blue.subtle", color: "blue.fg" }}
        >
          Check out how you can customize Plain Sheet for your needs!
        </Highlight>
      </Heading>
      <VStack justify={"center"} height={"fit-content"}>
        <ChakraLink colorPalette="blue" asChild>
          <Link href={"/mutable-props"}>Mutable Props</Link>
        </ChakraLink>
        <ChakraLink colorPalette="blue" asChild>
          <Link href={"/mutable-props/prevent-closing"}>Prevent Closing</Link>
        </ChakraLink>

        <ChakraLink colorPalette="blue" asChild>
          <Link href={"/style"}>Style</Link>
        </ChakraLink>
        <ChakraLink colorPalette="blue" asChild>
          <Link href={"/commands"}>Commands</Link>
        </ChakraLink>
        <ChakraLink colorPalette="blue" asChild>
          <Link href={"/animation"}>Animation</Link>
        </ChakraLink>
        <ChakraLink colorPalette="blue" asChild>
          <Link href={"/getters"}>Getters</Link>
        </ChakraLink>
        <ChakraLink colorPalette="blue" asChild>
          <Link href={"/life-cycle-callbacks"}>Life Cycle Callbacks</Link>
        </ChakraLink>

        <ChakraLink colorPalette="blue" asChild>
          <Link href={"/react19"}>React 19 Support</Link>
        </ChakraLink>
      </VStack>
    </VStack>
  );
}
