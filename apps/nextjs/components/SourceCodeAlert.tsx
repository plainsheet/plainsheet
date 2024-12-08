import { Link } from "@chakra-ui/react";
import { Alert } from "@/components/ui/alert";

import React from "react";
import { LuTerminal } from "react-icons/lu";

export const SourceCodeAlert = ({ link }: { link: string }) => {
  return (
    <Alert
      variant="solid"
      title={
        <Link color={"white"} whiteSpace={"nowrap"} href={link}>
          Check out the source code!
        </Link>
      }
      icon={<LuTerminal />}
      position={"fixed"}
      top={"2vh"}
      zIndex={10}
      width={"50%"}
      minWidth={"fit-content"}
    />
  );
};
