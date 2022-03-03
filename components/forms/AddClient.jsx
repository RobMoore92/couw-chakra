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
import { addClient } from "../firebase/queries/clientQueries";
const AddClient = ({ onClose }) => {
  const {
    isOpen: isOpenImage,
    onOpen: onOpenImage,
    onClose: onCloseImage,
  } = useDisclosure();
  const initialValues = {
    fname: "",
    lname: "",
    email: "",
    company: "",
    phone: "",
    image: "",
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          addClient(values).then(() => {
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
                <FormLabel fontSize={"sm"} htmlFor="fname">
                  First name
                </FormLabel>
                <InputGroup>
                  <Input
                    size={"sm"}
                    bg={"gray.50"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name={"fname"}
                    value={values.fname}
                    type="text"
                  />
                </InputGroup>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel fontSize={"sm"} htmlFor="lname">
                  Last name
                </FormLabel>
                <InputGroup>
                  <Input
                    size={"sm"}
                    bg={"gray.50"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name={"lname"}
                    value={values.lname}
                    type="text"
                  />
                </InputGroup>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel fontSize={"sm"} htmlFor="company">
                  Company
                </FormLabel>
                <InputGroup>
                  <Input
                    size={"sm"}
                    bg={"gray.50"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name={"company"}
                    value={values.company}
                    type="text"
                  />
                </InputGroup>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel fontSize={"sm"} htmlFor="email">
                  Email
                </FormLabel>
                <InputGroup>
                  <Input
                    size={"sm"}
                    bg={"gray.50"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name={"email"}
                    value={values.email}
                    type="email"
                  />
                </InputGroup>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel fontSize={"sm"} htmlFor="email">
                  Phone
                </FormLabel>
                <InputGroup>
                  <Input
                    size={"sm"}
                    bg={"gray.50"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name={"phone"}
                    value={values.phone}
                    type="tel"
                  />
                </InputGroup>
              </FormControl>
              <Flex justify={"space-between"}>
                <Button
                  onClick={onOpenImage}
                  size={"sm"}
                  leftIcon={<ImageSquare />}
                  colorScheme={"blue"}
                  mt={12}
                >
                  Add Image
                </Button>
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

export default AddClient;
