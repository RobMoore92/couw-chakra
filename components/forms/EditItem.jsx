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
import numeral from "numeral";
import { ImageSquare } from "phosphor-react";
import AddImageModal from "../modals/AddImageModal";
import { updateItem } from "../firebase/queries/itemQueries";

const EditItem = ({ item, onClose }) => {
  const {
    isOpen: isOpenImage,
    onOpen: onOpenImage,
    onClose: onCloseImage,
  } = useDisclosure();
  return (
    <Formik
      initialValues={{
        brand: item.brand,
        model: item.brand,
        price: numeral(item.price).format("$0.00"),
        barcode: item.barcode,
        website: item.website,
        image: item.image,
      }}
      onSubmit={(values) => {
        updateItem({ id: item.id, ...values }).then(() => {
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
                  type={"text"}
                  size={"sm"}
                  bg={"gray.50"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name={"model"}
                  value={values.model}
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
                Edit Image
              </Button>
              <Button size={"sm"} type={"submit"} colorScheme={"blue"} mt={12}>
                Submit
              </Button>
            </Flex>
            <AddImageModal
              image={values.image}
              field={"image"}
              values={values}
              setFieldValue={setFieldValue}
              isOpen={isOpenImage}
              onOpen={onOpenImage}
              onClose={onCloseImage}
              header={"Edit Image"}
            />
          </form>
        );
      }}
    </Formik>
  );
};

export default EditItem;
