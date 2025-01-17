import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
import { useClient } from "./useClient";
import { CodePlaygroundBaseProps } from "./playground-type";
import { depsArrayToObj } from "./playground-props-parser";

export function CodePlayground(props: CodePlaygroundBaseProps) {
  const { isClient } = useClient();
  if (!isClient) {
    return;
  }

  const { dependencies = [] } = props;
  const deps = dependencies ?? [];
  const depsToInstall = depsArrayToObj(deps);

  return (
    <SandpackProvider
      template={"react"}
      files={{
        "/App.js": {
          code: props.code,
        },
      }}
      customSetup={{
        dependencies: {
          "@plainsheet/react": "latest",
          ...depsToInstall,
        },
      }}
    >
      <SandpackLayout>
        <SandpackCodeEditor showLineNumbers showInlineErrors />
        <SandpackPreview showOpenInCodeSandbox={false} showRefreshButton />
      </SandpackLayout>
    </SandpackProvider>
  );
}
