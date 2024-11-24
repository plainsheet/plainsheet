"use client";

import { useState } from "react";
import { BottomSheet, useBottomSheet } from "@plainsheet/react";
import {
  VStack,
  Heading,
  Text,
  Input,
  Box,
  createListCollection,
  HStack,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  BottomSheetPosition,
  DraggingAnimationTimings,
} from "@plainsheet/core";
import { Slider } from "@/components/ui/slider";

export default function MutablePropsExamplePage() {
  return (
    <VStack
      width="full"
      height="full"
      padding="8"
      justifyContent="center"
      gap="5px"
    >
      <MutablePropsExamples />
    </VStack>
  );
}

function MutablePropsExamples() {
  const [defaultPosition, setDefaultPosition] =
    useState<BottomSheetPosition>("middle");
  const [shouldCloseOnOutsideClick, setShouldCloseOnOutsideClick] =
    useState(true);

  // Dragging
  const [isDraggable, setIsDraggable] = useState(true);
  const [backgroundDraggable, setBackgroundDraggable] = useState(true);
  const [expandable, setExpandable] = useState(true);
  const [snapPoints, setSnapPoints] = useState("0.5,0.7");
  const [dragTriggers, setDragTriggers] = useState("#frank-iframe");
  const [draggingDuration, setDraggingDuration] = useState(500);
  const [draggingAnimationTimings, setDraggingAnimationTimings] =
    useState("spring");

  // Appearances
  const [sheetWidth, setSheetWidth] = useState("600px");
  const [marginTop, setMarginTop] = useState(100);
  const [containerRadius, setContainerRadius] = useState("20px");
  const [shouldShowBackdrop, setShouldShowBackdrop] = useState(false);
  const [shouldShowHandle, setShouldShowHandle] = useState(true);

  // Classes
  const [rootClass, setRootClass] = useState("my-root");
  const [containerClass, setContainerClass] = useState("my-container");
  const [handleClass, setHandleClass] = useState("my-handle");
  const [contentWrapperClass, setContentWrapperClass] =
    useState("my-content-wrapper");

  const bottomSheet = useBottomSheet({
    defaultPosition,
    shouldCloseOnOutsideClick,
    draggable: isDraggable,
    backgroundDraggable,
    expandable,
    dragTriggers: dragTriggers.split(","),
    snapPoints: snapPoints.split(",").map(Number),
    draggingAnimationDuration: draggingDuration,
    draggingAnimationTimings:
      draggingAnimationTimings as DraggingAnimationTimings,
    width: sheetWidth,
    marginTop,
    containerBorderRadius: containerRadius,
    shouldShowBackdrop,
    shouldShowHandle,
    rootClass,
    containerClass,
    handleClass,
    contentWrapperClass,
  });

  return (
    <HStack
      backgroundColor={"transparent"}
      width={"full"}
      alignItems={"flex-start"}
      justifyContent={"space-between"}
    >
      <VStack
        backgroundColor={"whiteAlpha.300"}
        width="fit-content"
        borderRadius={5}
        padding={6}
        justifyContent="center"
        gap="6"
      >
        <Heading size="xl">Mutable Props in Action</Heading>
        <Button onClick={() => bottomSheet.instance.open()}>
          Open Bottom Sheet
        </Button>
        <Button onClick={() => bottomSheet.instance.close()}>
          Close Bottom Sheet
        </Button>
      </VStack>

      <VStack
        backgroundColor={"whiteAlpha.300"}
        width="content-fit"
        height={"60vh"}
        padding={6}
        borderRadius={5}
        alignItems="start"
        gap={4}
        overflowY={"scroll"}
      >
        <Heading size="lg">Controllers</Heading>
        <Box>
          <Text>Default Position</Text>
          <VStack>
            <SelectRoot
              collection={positionOptions}
              onValueChange={(item) =>
                setDefaultPosition(item.value[0] as BottomSheetPosition)
              }
            >
              <SelectTrigger>
                <SelectValueText placeholder="Select the default position" />
              </SelectTrigger>
              <SelectContent>
                {positionOptions.items.map((position) => (
                  <SelectItem item={position} key={position.value}>
                    {position.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
          </VStack>
        </Box>
        <Checkbox
          checked={shouldCloseOnOutsideClick}
          onCheckedChange={(e) =>
            setShouldCloseOnOutsideClick(e.checked === true)
          }
        >
          Close on Outside Click
        </Checkbox>
        <Checkbox
          checked={isDraggable}
          onCheckedChange={(e) => setIsDraggable(e.checked === true)}
        >
          Draggable
        </Checkbox>
        <Checkbox
          checked={backgroundDraggable}
          onCheckedChange={(e) => setBackgroundDraggable(e.checked === true)}
        >
          Background Draggable
        </Checkbox>
        <Checkbox
          checked={expandable}
          onCheckedChange={(e) => setExpandable(e.checked === true)}
        >
          Expandable
        </Checkbox>
        <Box>
          <Text>Snap Points (comma-separated)</Text>
          <Input
            value={snapPoints}
            onChange={(e) => setSnapPoints(e.target.value)}
          />
        </Box>
        <Box>
          <Text>Drag Triggers (comma-separated selectors)</Text>
          <Input
            value={dragTriggers}
            onChange={(e) => setDragTriggers(e.target.value)}
          />
        </Box>
        <Box>
          <Text>Dragging Animation Duration: {draggingDuration}ms</Text>
          <Slider
            defaultValue={[draggingDuration]}
            min={100}
            max={1000}
            step={50}
            onValueChange={(e) => setDraggingDuration(e.value.at(0) ?? 0)}
          />
        </Box>
        <Box>
          <Text>Dragging Animation Timings</Text>
          <SelectRoot
            onValueChange={(e) => setDraggingAnimationTimings(e.value[0])}
            collection={animationCollection}
          >
            <SelectTrigger>
              <SelectValueText placeholder="Select the animation timing" />
            </SelectTrigger>
            <SelectContent>
              {animationCollection.items.map((anim) => (
                <SelectItem item={anim} key={anim.value}>
                  {anim.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </Box>
        <Box>
          <Text>Width</Text>
          <Input
            value={sheetWidth}
            onChange={(e) => setSheetWidth(e.target.value)}
          />
        </Box>
        <Box>
          <Text>Margin Top (px)</Text>
          <Input
            type="number"
            value={marginTop}
            onChange={(e) => setMarginTop(Number(e.target.value))}
          />
        </Box>
        <Box>
          <Text>Container Border Radius</Text>
          <Input
            value={containerRadius}
            onChange={(e) => setContainerRadius(e.target.value)}
          />
        </Box>
        <Checkbox
          checked={shouldShowBackdrop}
          onCheckedChange={(e) => setShouldShowBackdrop(e.checked === true)}
        >
          Show Backdrop
        </Checkbox>
        <Checkbox
          checked={shouldShowHandle}
          onCheckedChange={(e) => setShouldShowHandle(e.checked === true)}
        >
          Show Handle
        </Checkbox>
        <Box>
          <Text>Root Class</Text>
          <Input
            value={rootClass}
            onChange={(e) => setRootClass(e.target.value)}
          />
        </Box>
        <Box>
          <Text>Container Class</Text>
          <Input
            value={containerClass}
            onChange={(e) => setContainerClass(e.target.value)}
          />
        </Box>
        <Box>
          <Text>Handle Class</Text>
          <Input
            value={handleClass}
            onChange={(e) => setHandleClass(e.target.value)}
          />
        </Box>
        <Box>
          <Text>Content Wrapper Class</Text>
          <Input
            value={contentWrapperClass}
            onChange={(e) => setContentWrapperClass(e.target.value)}
          />
        </Box>
      </VStack>

      <BottomSheet {...bottomSheet.props}>
        <VStack padding={6} color={"blackAlpha.900"} id="frank-iframe">
          <Heading size={"2xl"}>
            Frank Sinatra & Count Basie - The Best Is Yet To Come
          </Heading>
          <Text>The best is yet to come, folks.</Text>
          <iframe
            src="https://www.youtube.com/embed/IXpIoRhJeLQ"
            width="560"
            height="315"
            title="Legendary musicians"
            allowFullScreen
          ></iframe>
        </VStack>
      </BottomSheet>
    </HStack>
  );
}

const animationCollection = createListCollection({
  items: [
    { label: "Spring", value: "spring" },
    { label: "Ease-in", value: "ease-in" },
    { label: "Ease-out", value: "ease-out" },
    { label: "Linear", value: "linear" },
  ],
});

const positionOptions = createListCollection({
  items: [
    { value: "top", label: "Top" },
    { value: "middle", label: "Middle" },
    { value: "content-height", label: "Content Height" },
    { value: "closed", label: "Closed" },
  ],
});
