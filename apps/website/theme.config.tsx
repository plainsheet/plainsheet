import type { DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  useNextSeoProps() {
    return {
      titleTemplate: "Plain Bottom Sheet - %s",
    };
  },
  logo: <span>Plain Bottom Sheet</span>,
  project: {
    link: "https://github.com/plainsheet/plainsheet",
  },
  docsRepositoryBase:
    "https://github.com/plainsheet/plainsheet/tree/main/apps/website",
  head: (
    <>
      <link rel="icon" type="image/x-icon" href="/assets/favicon.png" />
    </>
  ),
};

export default config;
