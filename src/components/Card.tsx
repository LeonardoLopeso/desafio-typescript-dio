import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

export const Card = ({ children }: { children: ReactNode }) => {
  return (
    <Box backgroundColor="#FFFFFF" borderRadius="25px" padding="15px">
      { children }
    </Box>
  );
};
