import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
import { CodePlaygroundBaseProps } from "./playground-type";
import { useClient } from "./useClient";
import { depsArrayToObj } from "./playground-props-parser";

export function VanillaCodePlayground(props: CodePlaygroundBaseProps) {
  const { isClient } = useClient();
  if (!isClient) {
    return;
  }

  const { dependencies = [] } = props;
  const deps = dependencies ?? [];
  const depsToInstall = depsArrayToObj(deps);

  return (
    <SandpackProvider
      template="vite"
      files={{
        "/index.html": {
          code: `<!DOCTYPE html>
<html>
  <head>
    <title>Vanilla JavaScript</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/index.js"></script>
  </body>
</html>
`,
        },
        "/index.js": {
          code: props.code,
        },
      }}
      customSetup={{
        dependencies: {
          "@plainsheet/core": "0.7.9",
          ...depsToInstall,
        },
      }}
    >
      <SandpackLayout>
        <SandpackCodeEditor />
        <SandpackPreview />
      </SandpackLayout>
    </SandpackProvider>
  );
}
