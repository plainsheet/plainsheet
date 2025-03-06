import { DependencyDescription } from "./playground-type";

export const depsArrayToObj = (deps: DependencyDescription[]) => {
  return deps
    .map((dep) => {
      const [name, version] = dep.split(":");
      if (!name || !version) {
        throw TypeError(`Malformed dependencies: ${deps.toString()}`);
      }
      return {
        name,
        version,
      };
    })
    .reduce(
      (packagesObj, pack) => {
        packagesObj[pack.name] = packagesObj.version;
        return packagesObj;
      },
      {} as {
        [key: string]: string;
      }
    );
};
