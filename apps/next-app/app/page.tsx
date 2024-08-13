"use client";

import { Fragment, useState } from "react";
import { ReactPlainBottomSheet } from "@plainsheet/react-plain-bottom-sheet";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const [contents, setContents] = useState<string[]>(
    new Array(20).fill(0).map((_, i) => `Test content line ${i}`)
  );

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
        Update Content
      </button>

      <ReactPlainBottomSheet isOpen={isOpen} setIsOpen={setIsOpen}>
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
