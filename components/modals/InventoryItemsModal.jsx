import React, { useEffect, useState } from "react";
import {
  Box,
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
  SimpleGrid,
  Spacer,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import SearchBar from "../SearchBar";
import { Minus, Plus } from "phosphor-react";
import { getItems } from "../firebase/queries/itemQueries";
import ItemCard from "../cards/ItemCard";

const InventoryItemsModal = ({
  isOpenItems,
  onOpenItems,
  onCloseItems,
  jobID,
}) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const unsubscribe = async () => {
      await getItems(setItems);
    };
    return unsubscribe();
  }, []);
  return (
    <Modal size={"full"} isCentered isOpen={isOpenItems} onClose={onCloseItems}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Items</ModalHeader>
        <ModalCloseButton mt={2} />
        <ModalBody>
          <SearchBar size={"lg"} maxWidth={"100%"} />
          <SimpleGrid spacing={[2, 2, 12]} mt={4} pb={16}>
            {items.map((item, i) => {
              return (
                <ItemCard isButton values={item} jobID={jobID} key={item.id} />
              );
            })}
          </SimpleGrid>
        </ModalBody>
        <ModalFooter>
          <HStack justify={"flex-end"} w={"100%"}>
            <Button colorScheme="blue" onClick={onCloseItems}>
              Close
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default InventoryItemsModal;
