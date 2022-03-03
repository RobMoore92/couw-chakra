import React, { useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  useDisclosure,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { ImageSquare } from "phosphor-react";
import AddImageModal from "../modals/AddImageModal";
import { getStorage, ref } from "firebase/storage";
import numeral from "numeral";
import { addItem } from "../firebase/queries/itemQueries";
import SelectClients from "./SelectClients";
import SelectDate from "./SelectDate";
import { addJob } from "../firebase/queries/jobQueries";
const AddJob = ({ onClose }) => {
  const [startOpen, setStartOpen] = useState(false);
  const [dueOpen, setDueOpen] = useState(false);
  const {
    isOpen: isOpenImage,
    onOpen: onOpenImage,
    onClose: onCloseImage,
  } = useDisclosure();
  const initialValues = {
    name: "",
    description: "",
    client: "",
    start: new Date(),
    due: new Date(),
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          addJob(values).then(() => {
            onClose();
          });
        }}
      >
        {(formikProps) => {
          const {
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          } = formikProps;
          return (
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel fontSize={"sm"} htmlFor="email">
                  Job Name
                </FormLabel>
                <InputGroup>
                  <Input
                    size={"sm"}
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
                <FormLabel fontSize={"sm"} htmlFor="email">
                  Description
                </FormLabel>
                <InputGroup>
                  <Input
                    size={"sm"}
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
                <FormLabel fontSize={"sm"} htmlFor="email">
                  Select Client
                </FormLabel>
                <SelectClients
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  field={"client"}
                />
              </FormControl>

              <Flex justify={"flex-end"}>
                <Button
                  size={"sm"}
                  type={"submit"}
                  colorScheme={"blue"}
                  mt={12}
                >
                  Submit
                </Button>
              </Flex>
              <AddImageModal
                field={"image"}
                values={values}
                setFieldValue={setFieldValue}
                isOpen={isOpenImage}
                onOpen={onOpenImage}
                onClose={onCloseImage}
                header={"Add Image"}
              />
            </form>
          );
        }}
      </Formik>
    </>
  );
};

export default AddJob;
