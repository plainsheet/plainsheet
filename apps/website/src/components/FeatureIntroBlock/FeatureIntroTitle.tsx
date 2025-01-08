import css from "./FeatureIntroBlock.module.css";
import { PropsWithChildren } from "react";

export const FeatureIntroTitle = ({ children }: PropsWithChildren) => {
  return <h3 className={css.title}>{children}</h3>;
};
