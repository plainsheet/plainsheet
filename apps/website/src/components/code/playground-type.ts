export interface CodePlaygroundBaseProps {
  code: string;
  /**
   * packages to install. Each package should be "name:version" format.
   */
  dependencies?: DependencyDescription[];
}

export type DependencyDescription = `${string}:${string}`;
