import "./bottom-sheet.css";

interface BottomSheetProps {
  content: string;
  width?: string;
  marginTop?: string;
  defaultPosition?: BottomSheetPosition;
}

type BottomSheetPosition = "top" | "middle" | "content-height";

// enum ClassNames {
//   Root = "root",
//   Handle = "handle",
//   ContentWrapper = "contentWrapper",
//   Backdrop = "backdrop",
// }

interface BottomSheet {
  mount: (mountingPoint?: HTMLElement) => void;
  unmount: () => void;
}

export function CreateBottomSheet(props: BottomSheetProps): BottomSheet {
  const {
    // width = "100%",
    // defaultPosition = "content-height",
    // marginTop = "3vh",
    content = "",
  } = props;

  const bottomSheetRoot = document.createElement("dialog");
  const bottomSheetHandle = document.createElement("button");
  const bottomSheetContentWrapper = document.createElement("article");
  // TODO: Use a better html element
  const bottomSheetBackdrop = document.createElement("div");

  bottomSheetRoot.appendChild(bottomSheetHandle);
  bottomSheetRoot.appendChild(bottomSheetContentWrapper);

  const contentElement = document.createElement("div");
  // TODO: sanitize the content
  contentElement.innerHTML = content;
  bottomSheetContentWrapper.appendChild(contentElement);

  const mount = (mountingPoint?: HTMLElement): void => {
    const mountingPointOrFallback = mountingPoint ?? window.document.body;

    mountingPointOrFallback.appendChild(bottomSheetRoot);
    mountingPointOrFallback.appendChild(bottomSheetBackdrop);
    // TODO: setup event-listeners
  };

  const unmount = (): void => {
    bottomSheetRoot.remove();
    // TODO: remove event-listeners, timers, references, etc...
  };

  return {
    mount,
    unmount,
  };

  // TODO: Methods to expose
  // open: () => void
  // close: () => void
  // setPosition: (position) => void

  // TODO: Properties to expose
  // getSize
  // getPosition
}
