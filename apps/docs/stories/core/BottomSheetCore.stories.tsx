import type { Meta, StoryObj } from "@storybook/react";
import { BottomSheet } from "plain-bottom-sheet-core";
import { useRef } from "react";
import { BottomSheetReact } from "./BottomSheetReact";
import { ExampleForm } from "./examples/ExampleForm";

const meta: Meta<typeof BottomSheetReact> = {
  argTypes: {},
  title: "BottomSheet",
};
export default meta;
type Story = StoryObj<typeof BottomSheetReact>;

export const Basic: Story = {
  render: function Render(args) {
    const bottomSheetRef = useRef<BottomSheet | null>(null);

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
  },
};

export const WithForm: Story = {
  render: function Render(args) {
    const bottomSheetRef = useRef<BottomSheet | null>(null);

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

        <BottomSheetReact ref={bottomSheetRef}>
          {args.children}
          <ExampleForm />
        </BottomSheetReact>
      </section>
    );
  },
  name: "WithForm",
  args: {
    children: "Args content: Edit here via args.children",
  },
};
