import { VStack } from "@chakra-ui/react";
import { AnimationsExample } from "./AnimationExample";

import { SourceCodeAlert } from "@/components/SourceCodeAlert";

export default function AnimationsExamplePage() {
  return (
    <VStack
      width="100%"
      height={"full"}
      justifyContent={"center"}
      gap="6"
      overflow="scroll"
    >
      <SourceCodeAlert link="https://github.com/plainsheet/plainsheet/blob/main/apps/nextjs/app/animation/page.tsx" />

      <AnimationsExample />
    </VStack>
  );
}
