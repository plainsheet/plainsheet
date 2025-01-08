import css from "./FeatureIntroBlock.module.css";
import { PropsWithChildren } from "react";

export const FeatureIntroDescription = ({ children }: PropsWithChildren) => {
  return <p className={css.description}>{children}</p>;
};
