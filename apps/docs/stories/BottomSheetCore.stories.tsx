import type { Meta, StoryObj } from "@storybook/react";
import { BottomSheet, CreateBottomSheet } from "plain-bottom-sheet-core";
import { useEffect, useRef } from "react";

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
  const bottomSheetRef = useRef<BottomSheet | null>(null);

  useEffect(() => {
    const mountingPoint = document.querySelector("#pbs-mounting-point");
    if (mountingPoint) {
      bottomSheetRef.current = CreateBottomSheet({
        content: "Hello World. 🐯",
      });

      bottomSheetRef.current.mount(mountingPoint);
    }
  }, []);

  const handleOpen = () => {
    bottomSheetRef.current?.open();
  };

  const handleClose = () => {
    bottomSheetRef.current?.close();
  };

  return (
    <section>
      <header>
        <button onClick={handleOpen}>Open</button>
        <button onClick={handleClose}>Close</button>
      </header>

      <div id="pbs-mounting-point" />
    </section>
  );
}
