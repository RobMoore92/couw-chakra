import React from "react";
import { Button } from "@chakra-ui/react";
import { Plus } from "phosphor-react";

const FloatingButton = ({ title, onClick }) => {
  return (
    <Button
      onClick={onClick}
      size={"sm"}
      leftIcon={<Plus />}
      colorScheme={"blue"}
      position={"fixed"}
      right={4}
      bottom={4}
    >
      {title}
    </Button>
  );
};

export default FloatingButton;
