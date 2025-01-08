import css from "./FeatureIntroBlock.module.css";
import { PropsWithChildren } from "react";

export const FeatureIntroBlock = ({ children }: PropsWithChildren) => {
  return <article className={css.block}>{children}</article>;
};
