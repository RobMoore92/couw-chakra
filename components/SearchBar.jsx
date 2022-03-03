import React from "react";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { PhoneIcon, SearchIcon } from "@chakra-ui/icons";

const SearchBar = ({ size, maxWidth }) => {
  return (
    <InputGroup variant={"filled"} size={size} maxWidth={maxWidth}>
      <InputLeftElement pointerEvents="none">
        <SearchIcon color="blue.400" />
      </InputLeftElement>
      <Input type="tel" placeholder="Search" />
    </InputGroup>
  );
};

export default SearchBar;
