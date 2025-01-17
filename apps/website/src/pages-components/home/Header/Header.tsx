import Image from "next/image";
import css from "./Header.module.css";

export const Header = () => {
  return (
    <figure className={css.header}>
      <div className={css.backdrop} />
      <Image
        src="/assets/header.png"
        width="328"
        height="167"
        alt="bottom-sheet"
      />
    </figure>
  );
};
