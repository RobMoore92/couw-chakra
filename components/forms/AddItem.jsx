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
const AddItem = ({ onClose }) => {
  const {
    isOpen: isOpenImage,
    onOpen: onOpenImage,
    onClose: onCloseImage,
  } = useDisclosure();
  const initialValues = {
    brand: "",
    model: "",
    price: "",
    barcode: "",
    website: "",
    image: "",
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          addItem(values).then(() => {
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
                  Brand
                </FormLabel>
                <InputGroup>
                  <Input
                    size={"sm"}
                    bg={"gray.50"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name={"brand"}
                    value={values.brand}
                    type="text"
                  />
                </InputGroup>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel fontSize={"sm"} htmlFor="email">
                  Model
                </FormLabel>
                <InputGroup>
                  <Input
                    size={"sm"}
                    bg={"gray.50"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name={"model"}
                    value={values.model}
                    type="text"
                  />
                </InputGroup>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel fontSize={"sm"} htmlFor="email">
                  Price
                </FormLabel>
                <InputGroup>
                  <Input
                    size={"sm"}
                    bg={"gray.50"}
                    onChange={handleChange}
                    onBlur={(e) => {
                      const value = e.target.value;
                      setFieldValue("price", numeral(value).format("$0.00"));
                    }}
                    name={"price"}
                    value={values.price}
                    placeholder={"$0.00"}
                    type="text"
                  />
                </InputGroup>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel fontSize={"sm"} htmlFor="email">
                  Barcode
                </FormLabel>
                <InputGroup>
                  <Input
                    size={"sm"}
                    bg={"gray.50"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name={"barcode"}
                    value={values.barcode}
                    type="text"
                  />
                </InputGroup>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel fontSize={"sm"} htmlFor="email">
                  Website
                </FormLabel>
                <InputGroup>
                  <Input
                    size={"sm"}
                    bg={"gray.50"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name={"website"}
                    value={values.website}
                    type="text"
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

export default AddItem;
