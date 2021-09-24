import { Input } from "@chakra-ui/input";
import React from "react";

const CoolInput = ({ setValue, ...props }) => {
  return (
    <Input
      maxLength="20"
      m="4"
      backgroundColor="rgba(255,255,255,.3)"
      border="2px solid"
      borderColor="rgba(255,255,255,.7)"
      borderRadius="7px"
      fontSize="28px"
      color="rgba(255,255,255,.8)"
      {...props}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default CoolInput;
