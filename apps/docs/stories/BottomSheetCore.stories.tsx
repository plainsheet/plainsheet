import type { Meta, StoryObj } from "@storybook/react";
import { BottomSheet, CreateBottomSheet } from "plain-bottom-sheet-core";
import { useEffect, useRef } from "react";
import { render } from "react-dom";

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
        content: `<div id="bottom-sheet-contents"></div>`,
      });

      bottomSheetRef.current.mount(mountingPoint);

      render(
        <TodoForm></TodoForm>,
        document.getElementById("bottom-sheet-contents")
      );
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

function TodoForm() {
  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "0px 16px",
        gap: "10px",
      }}
    >
      <div>
        <input type="range" id="volume" name="volume" min="0" max="11" />
        <label htmlFor="volume">Volume</label>
      </div>

      <label htmlFor="name">Name (4 to 8 characters)</label>
      <input
        type="text"
        id="name"
        name="name"
        required
        minLength={4}
        maxLength={8}
        size={10}
        style={{
          fontSize: "16px",
        }}
      />

      <label htmlFor="age">Age</label>
      <input
        type="number"
        id="age"
        name="age"
        required
        size={4}
        style={{
          fontSize: "16px",
        }}
      />

      <label htmlFor="phone-number">Phone number</label>
      <input
        type="tel"
        id="phone-number"
        name="phone-number"
        required
        size={11}
        style={{
          fontSize: "16px",
        }}
      />

      <select name="pets" id="pet-select">
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="hamster">Hamster</option>
        <option value="parrot">Parrot</option>
        <option value="spider">Spider</option>
        <option value="goldfish">Goldfish</option>
      </select>

      <fieldset>
        <label htmlFor="workout"></label>
        <input id="workout" type="checkbox" />

        <label htmlFor="study"></label>
        <input id="study" type="checkbox" />

        <label htmlFor="chill"></label>
        <input id="chill" type="checkbox" />
      </fieldset>

      <fieldset>
        <label htmlFor="apple"></label>
        <input id="apple" type="radio" />

        <label htmlFor="orange"></label>
        <input id="orange" type="radio" />

        <label htmlFor="banana"></label>
        <input id="banana" type="radio" />
      </fieldset>

      <input type="date" name="date" />

      <input type="file" accept="image/*, text/*" name="file" />
    </form>
  );
}
