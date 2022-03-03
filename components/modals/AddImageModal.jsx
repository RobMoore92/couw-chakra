import React, { cloneElement, useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import SearchBar from "../SearchBar";
import { Check, ImageSquare, Minus, Plus } from "phosphor-react";
import { useDropzone } from "react-dropzone";
import { CheckCircleIcon, CloseIcon } from "@chakra-ui/icons";
import { uploadItemImage } from "../firebase/queries/itemQueries";
import { resizeFile } from "../../helpers/resizeImage";
import Image from "next/image";
const AddImageModal = ({
  isOpen,
  onClose,
  header,
  setFieldValue,
  field,
  values,
  image,
}) => {
  const onDrop = useCallback(
    (file) => {
      console.log(typeof file[0], file[0]);
      const resizedFile = resizeFile(file[0]);
      resizedFile.then((image) => {
        setFieldValue(field, image);
        console.log(image, 123);
      });
    },
    [field, setFieldValue]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent width={{ base: "xs", md: "md" }} pb={4}>
        <ModalHeader>{header}</ModalHeader>
        <ModalBody>
          {values[field] || image ? (
            <Box zIndex={20} position={"relative"} w={"100%"} h={"100%"}>
              <Image
                alt={"123"}
                src={
                  typeof values.image === "object"
                    ? URL.createObjectURL(values.image)
                    : values.image
                }
                layout="fill"
                objectFit={"cover"}
              />
            </Box>
          ) : (
            <Box {...getRootProps()}>
              <input {...getInputProps()} />
              <Flex
                justify={"center"}
                align={"center"}
                borderWidth={2}
                borderColor={"gray.400"}
                borderStyle={"dashed"}
                h={"14rem"}
                w={"100%"}
              >
                {isDragActive ? (
                  <Icon
                    as={CheckCircleIcon}
                    fontSize={"3xl"}
                    color={"green.500"}
                  />
                ) : (
                  <Icon as={ImageSquare} fontSize={"3xl"} color={"gray.500"} />
                )}
              </Flex>
            </Box>
          )}
          <HStack justify={"flex-end"} spacing={4} mt={4}>
            <Button
              colorScheme={"blue"}
              onClick={() => {
                setFieldValue(field, null);
              }}
            >
              Clear
            </Button>
            <Button colorScheme={"green"} onClick={onClose}>
              Done
            </Button>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddImageModal;
