import type { DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  useNextSeoProps() {
    return {
      titleTemplate: "Plain Bottom Sheet - %s",
    };
  },
  logo: <span>Plain Bottom Sheet</span>,
  project: {
    link: "https://github.com/PeterByun/plain-bottom-sheet",
  },
  docsRepositoryBase:
    "https://github.com/plainsheet/plainsheet/tree/main/apps/pbs-docs",
};

export default config;
