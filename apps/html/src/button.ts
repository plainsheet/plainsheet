export function setupButton(element: HTMLButtonElement, onClick: () => void) {
  const handleClick = () => {
    onClick();
  };

  element.addEventListener("click", handleClick);
}
