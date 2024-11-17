import { ColorPicker } from "./color-picker";
import { SizePicker } from "./size-picker";

export function ProductOptionsForm({ onSubmit }: { onSubmit?: () => void }) {
  return (
    <form
      className="p-8"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <h3>Customize your T-shirt</h3>

      <ColorPicker />

      <SizePicker />

      <button
        type="submit"
        className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-slate-600 px-8 py-3 text-base font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
        onClick={() => {
          alert("Added to the cart!");
          onSubmit?.();
        }}
      >
        Submit
      </button>
    </form>
  );
}
