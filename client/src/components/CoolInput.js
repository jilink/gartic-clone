import { Input } from "@chakra-ui/input";
import React from "react";

const CoolInput = ({ ...props }) => {
  return (
    <Input
      maxLength="20"
      m="2"
      backgroundColor="rgba(255,255,255,.3)"
      border="2px solid"
      borderColor="rgba(255,255,255,.7)"
      borderRadius="7px"
      fontSize="28px"
      color="rgba(255,255,255,.8)"
      {...props}
    />
  );
};

export default CoolInput;
