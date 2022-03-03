import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import Calendar from "react-calendar";
import { format } from "date-fns";

const SelectDate = ({
  label,
  name,
  values,
  setFieldValue,
  isOpen,
  setOpen,
}) => {
  const onClose = () => setOpen(false);
  return (
    <Popover isOpen={isOpen} onClose={onClose}>
      <PopoverTrigger>
        <FormControl mt={4}>
          <FormLabel fontSize={"sm"} htmlFor="email">
            {label}
          </FormLabel>
          <InputGroup>
            <Input
              size={"sm"}
              bg={"gray.50"}
              onClick={() => setOpen(true)}
              value={format(values[name], "PPP")}
            />
          </InputGroup>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <Calendar
            className={"calendar"}
            onChange={(date) => {
              setFieldValue(name, date);
              onClose();
            }}
            value={values[name]}
          />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default SelectDate;
