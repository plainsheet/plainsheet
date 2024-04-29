import type { Meta, StoryObj } from "@storybook/react";
import {
  BOTTOM_SHEET_DEFAULT_PROPS,
  BottomSheet,
  createPlaceholderBottomSheet,
} from "plain-bottom-sheet-core";
import { useRef, useState } from "react";
import { BottomSheetReact } from "../../src/BottomSheetReact";
import { ExampleForm } from "../../src/examples/ExampleForm";

import miles from "../../assets/images/miles.jpg";

const meta: Meta<typeof BottomSheetReact> = {
  argTypes: {},
  title: "BottomSheet",
};
export default meta;
type Story = StoryObj<typeof BottomSheetReact>;

export const Basic: Story = {
  render: function Render(args) {
    const bottomSheetRef = useRef<BottomSheet>(createPlaceholderBottomSheet());

    return (
      <section>
        <header>
          <button
            onClick={() => {
              bottomSheetRef.current.open();
            }}
          >
            Open
          </button>
          <button
            onClick={() => {
              bottomSheetRef.current.close();
            }}
          >
            Close
          </button>
        </header>
        <BottomSheetReact ref={bottomSheetRef}>
          {args.children}
        </BottomSheetReact>
      </section>
    );
  },
  name: "Basic",
  args: {
    children: "Hello",
    options: BOTTOM_SHEET_DEFAULT_PROPS,
  },
};

export const WithForm: Story = {
  render: function Render(args) {
    // Make this a custom hook and export from the React adapter.
    const bottomSheetRef = useRef<BottomSheet>(createPlaceholderBottomSheet());

    const { children } = args;

    return (
      <section>
        <header>
          <button
            onClick={() => {
              bottomSheetRef.current.open();
            }}
          >
            Open
          </button>
          <button
            onClick={() => {
              bottomSheetRef.current?.close();
            }}
          >
            Close
          </button>
        </header>

        <BottomSheetReact ref={bottomSheetRef} options={args.options}>
          {children}
          <ExampleForm />
        </BottomSheetReact>
      </section>
    );
  },
  name: "WithForm",
  args: {
    children: "Args content: Edit here via args.children",
    options: BOTTOM_SHEET_DEFAULT_PROPS,
  },
};

export const WithImage: Story = {
  render: function Render(args) {
    const bottomSheetRef = useRef<BottomSheet>(createPlaceholderBottomSheet());
    const [result, setResult] = useState("");

    return (
      <section>
        <header
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "10px",
          }}
        >
          <button
            onClick={() => {
              bottomSheetRef.current.open();
            }}
          >
            Open
          </button>

          <button
            onClick={() => {
              bottomSheetRef.current.close();
            }}
          >
            Close
          </button>

          <button
            onClick={() => {
              bottomSheetRef.current.moveTo(200);
            }}
          >
            Move to y 200
          </button>

          <button
            onClick={() => {
              bottomSheetRef.current.snapTo(0.4);
            }}
          >
            Snap to 40%
          </button>

          <button
            onClick={() => {
              setResult(String(bottomSheetRef.current.getIsMounted()));
            }}
          >
            getIsMounted
          </button>

          <button
            onClick={() => {
              setResult(String(bottomSheetRef.current.getIsOpen()));
            }}
          >
            getIsOpen
          </button>

          <button
            onClick={() => {
              setResult(String(bottomSheetRef.current.getIsClosed()));
            }}
          >
            getIsClosed
          </button>

          <button
            onClick={() => {
              setResult(bottomSheetRef.current.getPosition());
            }}
          >
            getPosition
          </button>

          <button
            onClick={() => {
              setResult(String(bottomSheetRef.current.getHeight()));
            }}
          >
            getHeight
          </button>
        </header>

        <article>Result: {result}</article>

        <BottomSheetReact
          ref={bottomSheetRef}
          mountingPoint={args.mountingPoint}
          options={args.options}
        >
          {args.children} <br />
          <img src={miles} alt="" />
        </BottomSheetReact>
      </section>
    );
  },
  name: "WithImage",
  args: {
    children: "Hello, Miles",
    options: BOTTOM_SHEET_DEFAULT_PROPS,
  },
};

export const WithTitleAndFixedButtons: Story = {
  render: function Render(args) {
    const bottomSheetRef = useRef<BottomSheet>(createPlaceholderBottomSheet());

    return (
      <section>
        <header>
          <button
            onClick={() => {
              bottomSheetRef.current.open();
            }}
          >
            Open
          </button>
          <button
            onClick={() => {
              bottomSheetRef.current.close();
            }}
          >
            Close
          </button>
        </header>
        <BottomSheetReact ref={bottomSheetRef}>
          <h3
            style={{
              padding: "0 16px",
            }}
          >
            Order Summary
          </h3>
          <ul>
            <li>{args.children}</li>
            <li>Coke zero🥤: $4</li>
          </ul>

          <div
            style={{
              position: "relative",
              bottom: 0,
              left: 0,

              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",

              width: "100%",
              padding: "0 20%",
              boxSizing: "border-box",
            }}
          >
            <button
              onClick={() => {
                bottomSheetRef.current.close();
              }}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                bottomSheetRef.current.close();
              }}
            >
              Proceed To Checkout
            </button>
          </div>
        </BottomSheetReact>
      </section>
    );
  },
  name: "WithTitleAndFixedButtons",
  args: {
    children: "Fried chicken🍗: $19.5",
    options: BOTTOM_SHEET_DEFAULT_PROPS,
  },
};
