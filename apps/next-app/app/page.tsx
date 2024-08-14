"use client";

import { Fragment, useRef, useState } from "react";
import {
  BottomSheet,
  createPlaceholderBottomSheet,
  ReactPlainBottomSheet,
} from "@plainsheet/react-plain-bottom-sheet";

const placeHolderSheet = createPlaceholderBottomSheet();

export default function Home() {
  const bottomSheetRef = useRef<BottomSheet>(placeHolderSheet);

  const [isOpen, setIsOpen] = useState(false);

  const [contents, setContents] = useState<string[]>(
    new Array(20).fill(0).map((_, i) => `Test content line ${i}`)
  );

  const [width, setWidth] = useState<string | undefined>(undefined);

  return (
    <section>
      <button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Open
      </button>
      <button
        onClick={() => {
          setContents(
            new Array(20).fill(0).map((_, i) => `🐱 Test content line ${i}`)
          );
        }}
      >
        Update content
      </button>

      <button
        onClick={() => {
          setWidth("400px");
        }}
      >
        Update width
      </button>

      <ReactPlainBottomSheet
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        width={width}
        ref={bottomSheetRef}
      >
        {contents.map((text) => (
          <Fragment key={text}>
            <div>{text}</div>
            <br />
          </Fragment>
        ))}
      </ReactPlainBottomSheet>
    </section>
  );
}
