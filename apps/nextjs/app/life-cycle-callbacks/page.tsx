"use client";

import { BottomSheet, useBottomSheet } from "@plainsheet/react";
import { VStack, Heading, Text, Box } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { SourceCodeAlert } from "@/components/SourceCodeAlert";

export default function LifeCycleHooksExamplePage() {
  return (
    <VStack
      width="full"
      height="full"
      padding="8"
      justifyContent="center"
      gap="5px"
    >
      <SourceCodeAlert link="https://github.com/plainsheet/plainsheet/blob/main/apps/nextjs/app/life-cycle-callbacks/page.tsx" />
      <LifeCycleHooksExamples />
    </VStack>
  );
}

function LifeCycleHooksExamples() {
  const logsContainerRef = useRef<HTMLDivElement | null>(null);

  const [logs, setLogs] = useState<string[]>([]);
  const logEvent = (message: string) => {
    setLogs((prevLogs) => [
      ...prevLogs,
      `${new Date().toLocaleTimeString()}: ${message}`,
    ]);

    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTo({
        top: logsContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const bottomSheet = useBottomSheet({
    beforeOpen: () => logEvent("beforeOpen"),
    afterOpen: () => logEvent("afterOpen"),
    beforeClose: () => logEvent("beforeClose"),
    afterClose: () => logEvent("afterClose"),
    onDragStart: () => logEvent("onDragStart"),
    onDragMove: (direction, progress) =>
      logEvent(
        `onDragMove: Dragging in ${direction} direction. Progress: ${progress.toFixed(2)}`
      ),
    onDragEnd: () => logEvent("onDragEnd"),
  });

  return (
    <VStack
      padding={6}
      borderRadius={5}
      width="full"
      justifyContent="center"
      gap="6"
    >
      <Heading size="xl">Lifecycle Hooks in Action</Heading>
      <Button onClick={() => bottomSheet.open()}>Open Bottom Sheet</Button>

      <VStack
        backgroundColor={"whiteAlpha.300"}
        padding={6}
        borderRadius={5}
        width="full"
        justifyContent="center"
        gap="6"
      >
        <VStack
          ref={logsContainerRef}
          color="gray.800"
          width="full"
          height={"50vh"}
          overflowY="auto"
          backgroundColor="blue.100"
          borderRadius="md"
          padding="4"
          marginTop="4"
          boxShadow="sm"
        >
          <Box width={"fit-content"} minWidth={"1/4"}>
            {logs.length > 0 ? (
              logs.map((log, index) => (
                <Text key={index} fontSize="sm">
                  {log}
                </Text>
              ))
            ) : (
              <Text fontSize="sm">Logs will appear here...</Text>
            )}
          </Box>
        </VStack>

        <BottomSheet {...bottomSheet.props}>
          <VStack padding={6}>
            <Heading size={"2xl"} color={"blackAlpha.900"}>
              Oscar Peterson & Count Basie & Joe Pass 1980 - Words & Music
            </Heading>
            <iframe
              src="https://www.youtube.com/embed/2HAZP7nWo6A"
              width="560"
              height="315"
              title="A YouTube video"
              allowFullScreen
            />
          </VStack>
        </BottomSheet>
      </VStack>
    </VStack>
  );
}
