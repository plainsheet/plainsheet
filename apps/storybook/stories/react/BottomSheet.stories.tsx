import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ExampleForm } from "../../src/examples/ExampleForm";

import miles from "../../assets/images/miles.jpg";
import { BottomSheet, useBottomSheet } from "@plainsheet/react";

const meta: Meta<typeof BottomSheet> = {
  argTypes: {},
  title: "BottomSheet",
};
export default meta;
type Story = StoryObj<typeof BottomSheet>;

export const Basic: Story = {
  render: function Render(args) {
    const { instance, props } = useBottomSheet();
    return (
      <section>
        <header>
          <button
            onClick={() => {
              instance.open();
            }}
          >
            Open
          </button>
          <button
            onClick={() => {
              instance.close();
            }}
          >
            Close
          </button>
        </header>
        <BottomSheet {...props}>{args.children}</BottomSheet>
      </section>
    );
  },
  args: {
    children: "Hello",
  },
};

export const WithForm: Story = {
  render: function Render(args) {
    const { instance, props } = useBottomSheet();
    return (
      <section>
        <header>
          <button
            onClick={() => {
              instance.open();
            }}
          >
            Open
          </button>
          <button
            onClick={() => {
              instance?.close();
            }}
          >
            Close
          </button>
        </header>

        <BottomSheet {...props}>
          {args.children}
          <ExampleForm />
        </BottomSheet>
      </section>
    );
  },
  args: {
    children: "Args content: Edit here via args.children",
  },
};

export const WithImage: Story = {
  render: function Render(args) {
    const { instance, props } = useBottomSheet();
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
              instance.open();
            }}
          >
            Open
          </button>

          <button
            onClick={() => {
              instance.close();
            }}
          >
            Close
          </button>

          <button
            onClick={() => {
              instance.moveTo(200);
            }}
          >
            Move to y 200
          </button>

          <button
            onClick={() => {
              instance.snapTo(0.4);
            }}
          >
            Snap to 40%
          </button>

          <button
            onClick={() => {
              setResult(String(instance.getIsMounted()));
            }}
          >
            getIsMounted
          </button>

          <button
            onClick={() => {
              setResult(String(instance.getIsOpen()));
            }}
          >
            getIsOpen
          </button>

          <button
            onClick={() => {
              setResult(String(instance.getIsClosed()));
            }}
          >
            getIsClosed
          </button>

          <button
            onClick={() => {
              setResult(instance.getPosition());
            }}
          >
            getPosition
          </button>

          <button
            onClick={() => {
              setResult(String(instance.getHeight()));
            }}
          >
            getHeight
          </button>
        </header>

        <article>Result: {result}</article>

        <BottomSheet {...props} mountingPoint={args.mountingPoint}>
          {args.children} <br />
          <img src={miles} alt="" />
        </BottomSheet>
      </section>
    );
  },
  name: "WithImage",
  args: {
    children: "Hello, Miles",
  },
};

export const WithTitleAndFixedButtons: Story = {
  render: function Render(args) {
    const { instance, props } = useBottomSheet();

    return (
      <section>
        <header>
          <button
            onClick={() => {
              instance.open();
            }}
          >
            Open
          </button>
          <button
            onClick={() => {
              instance.close();
            }}
          >
            Close
          </button>
        </header>
        <BottomSheet {...props}>
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
                instance.close();
              }}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                instance.close();
              }}
            >
              Proceed To Checkout
            </button>
          </div>
        </BottomSheet>
      </section>
    );
  },
  name: "WithTitleAndFixedButtons",
  args: {
    children: "Fried chicken🍗: $19.5",
  },
};
