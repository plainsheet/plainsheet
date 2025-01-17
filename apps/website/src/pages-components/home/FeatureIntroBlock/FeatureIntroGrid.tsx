import { FeatureIntroBlock } from "./FeatureIntroBlock";
import css from "./FeatureIntroBlock.module.css";
import { FeatureIntroTitle } from "./FeatureIntroTitle";
import { FeatureIntroDescription } from "./FeatureIntroDescription";

export const FeatureIntroGrid = () => {
  return (
    <section className={css.grid}>
      <FeatureIntroBlock>
        <FeatureIntroTitle>🧩 Framework-agnostic</FeatureIntroTitle>
        <FeatureIntroDescription>
          Works with vanilla <strong>JavaScript</strong>, or{" "}
          <strong>React</strong>.
        </FeatureIntroDescription>
      </FeatureIntroBlock>

      <FeatureIntroBlock>
        <FeatureIntroTitle>⛓️‍💥 Zero Dependencies</FeatureIntroTitle>
        <FeatureIntroDescription>
          It does not depend on any other libraries, so{" "}
          <strong>you only load what you need</strong>.
        </FeatureIntroDescription>
      </FeatureIntroBlock>

      <FeatureIntroBlock>
        <FeatureIntroTitle>☁️ Super Lightweight</FeatureIntroTitle>
        <FeatureIntroDescription>
          It&apos;s <strong>Only 7 Kb</strong> when compressed, so you
          don&apos;t have to compromise performance for better UX.
        </FeatureIntroDescription>
      </FeatureIntroBlock>

      <FeatureIntroBlock>
        <FeatureIntroTitle>📱 Mobile-friendly</FeatureIntroTitle>
        <FeatureIntroDescription>
          Works just like the native bottom sheet.
        </FeatureIntroDescription>
      </FeatureIntroBlock>

      <FeatureIntroBlock>
        <FeatureIntroTitle>🎛 Highly Configurable</FeatureIntroTitle>
        <FeatureIntroDescription>
          Styling it anyway you want with CSS, changing its behaviors on the
          fly, listening to life-cycle events, you name it!
        </FeatureIntroDescription>
      </FeatureIntroBlock>

      <FeatureIntroBlock>
        <FeatureIntroTitle>🦮 Accessibility Support</FeatureIntroTitle>
        <FeatureIntroDescription>
          Keyboard interactions and focus management work out-of-box.
        </FeatureIntroDescription>
      </FeatureIntroBlock>

      <FeatureIntroBlock>
        <FeatureIntroTitle>🍰 Easy-to-use </FeatureIntroTitle>
        <FeatureIntroDescription>
          <strong>Works out of the box</strong> without needing any
          configurations.
        </FeatureIntroDescription>
      </FeatureIntroBlock>

      <FeatureIntroBlock>
        <FeatureIntroTitle>⚡️ Performant By Default</FeatureIntroTitle>
        <FeatureIntroDescription>
          Animations never trigger reflows, avoiding intensive computation.
        </FeatureIntroDescription>
      </FeatureIntroBlock>
    </section>
  );
};
