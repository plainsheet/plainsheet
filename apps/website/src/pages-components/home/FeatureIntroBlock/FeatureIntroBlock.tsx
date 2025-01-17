import css from "./FeatureIntroBlock.module.css";
import { ReactNode } from "react";

export const FeatureIntroBlock = ({ children }: { children: ReactNode }) => {
  return (
    <article className={css.block}>
      <>{children}</>
    </article>
  );
};
