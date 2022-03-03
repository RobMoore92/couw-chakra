import React, { cloneElement } from "react";
import {
  Button,
  Flex,
  HStack,
  Icon,
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
import { Minus, Plus } from "phosphor-react";

const FormModal = ({ isOpen, onClose, header, buttonText, children }) => {
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent width={{ base: "xs", md: "md" }} pb={4}>
        <ModalHeader>{header}</ModalHeader>
        <ModalCloseButton mt={2} />
        <ModalBody>{cloneElement(children, { onClose: onClose })}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FormModal;
