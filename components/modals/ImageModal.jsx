import React, { useEffect, useState } from "react";
import {
  Box,
  Center,
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";

import Image from "next/image";
import { getImage } from "../firebase/queries/itemQueries";
import { ImageSquare } from "phosphor-react";
const ImageModal = ({ isOpen, onClose, path }) => {
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent width={{ base: "xs", md: "md" }} pb={4}>
        <ModalBody>
          <Flex justify={"center"} items={"center"} h={"xs"}>
            {path ? (
              // eslint-disable-next-line @next/next/no-img-element
              <Image alt="123" src={path} layout="fill" objectFit={"cover"} />
            ) : (
              <Center>
                <Stack alignText={"center"}>
                  <Flex justify={"center"} items={"center"}>
                    <Icon
                      as={ImageSquare}
                      fontSize={"2xl"}
                      color={"gray.500"}
                    />
                  </Flex>
                  <Text fontSize={"2xl"} fontWeight={"semibold"}>
                    No Image
                  </Text>
                </Stack>
              </Center>
            )}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ImageModal;
