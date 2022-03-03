import React, { useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Select,
} from "@chakra-ui/react";
import { Formik } from "formik";
import SelectDate from "./SelectDate";

const EditJob = () => {
  const [startOpen, setStartOpen] = useState(false);
  const [dueOpen, setDueOpen] = useState(false);
  const initialValues = {
    name: "",
    description: "",
    start: new Date(),
    due: new Date(),
    client: "",
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {(formikProps) => {
        const { values, handleChange, handleBlur, handleSubmit } = formikProps;
        return (
          <form onSubmit={handleSubmit}>
            <FormControl mt={4}>
              <FormLabel htmlFor="email">Name</FormLabel>
              <InputGroup>
                <Input
                  bg={"gray.50"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name={"name"}
                  value={values.name}
                  type="text"
                />
              </InputGroup>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor="email">Description</FormLabel>
              <InputGroup>
                <Input
                  bg={"gray.50"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name={"description"}
                  value={values.description}
                  type="text"
                />
              </InputGroup>
            </FormControl>
            <SelectDate
              {...formikProps}
              name={"start"}
              label={"Start Date"}
              isOpen={startOpen}
              setOpen={setStartOpen}
            />
            <SelectDate
              {...formikProps}
              name={"due"}
              label={"Due Date"}
              isOpen={dueOpen}
              setOpen={setDueOpen}
            />
            <FormControl mt={4}>
              <FormLabel htmlFor="email">Client</FormLabel>
              <Select bg={"gray.50"} placeholder="Select option">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </FormControl>
            <Flex justify={"flex-end"}>
              <Button type={"submit"} colorScheme={"blue"} mt={12}>
                Submit
              </Button>
            </Flex>
          </form>
        );
      }}
    </Formik>
  );
};

export default EditJob;
