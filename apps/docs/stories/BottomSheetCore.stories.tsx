import type { Meta, StoryObj } from "@storybook/react";
import { CreateBottomSheet } from "plain-bottom-sheet-core";
import { useEffect } from "react";

const meta: Meta<typeof BottomSheetWrapper> = {
  argTypes: {},
  title: "BottomSheet",
};

export default meta;

type Story = StoryObj<typeof BottomSheetWrapper>;

export const Primary: Story = {
  render: () => {
    return <BottomSheetWrapper />;
  },
  name: "BottomSheetCore",
  args: {
    children: "Hello",
  },
};

function BottomSheetWrapper() {
  useEffect(() => {
    CreateBottomSheet({
      content: "Hello World.",
    }).mount();
  }, []);

  return <div>Hello</div>;
}
