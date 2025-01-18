import type { DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  logo: <span>Plain Sheet</span>,
  project: {
    link: "https://github.com/plainsheet/plainsheet",
  },
  docsRepositoryBase:
    "https://github.com/plainsheet/plainsheet/tree/main/apps/website",
  head: (
    <>
      <title>Plain Sheet</title>
      <link rel="icon" type="image/x-icon" href="/assets/favicon.png" />
    </>
  ),
};

export default config;
