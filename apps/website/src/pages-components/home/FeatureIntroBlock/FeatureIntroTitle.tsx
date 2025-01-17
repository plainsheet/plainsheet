import { ReactNode } from "react";
import css from "./FeatureIntroBlock.module.css";

export const FeatureIntroTitle = ({ children }: { children: ReactNode }) => {
  return (
    <h3 className={css.title}>
      <>{children}</>
    </h3>
  );
};
