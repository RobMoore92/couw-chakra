import React, { useEffect, useState } from "react";
import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import InventoryItemsModal from "./InventoryItemsModal";
import { getInventory } from "../firebase/queries/inventoryQueries";
import ItemCard from "../cards/ItemCard";

const InventoryModal = ({ isOpenInventory, onCloseInventory, jobID }) => {
  const [inventory, setInventory] = useState([]);
  useEffect(() => {
    const unsubscribe = async () => {
      await getInventory(setInventory, jobID);
    };
    return unsubscribe();
  }, [jobID]);
  const {
    isOpen: isOpenItems,
    onOpen: onOpenItems,
    onClose: onCloseItems,
  } = useDisclosure();

  return (
    <>
      <Modal
        size={"full"}
        isCentered
        isOpen={isOpenInventory}
        onClose={onCloseInventory}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Inventory</ModalHeader>
          <ModalCloseButton mt={2} />
          <ModalBody>
            <SimpleGrid spacing={[2, 2, 12]} mt={4} pb={16}>
              {inventory.map((item, i) => {
                return <ItemCard values={item} jobID={jobID} key={i} />;
              })}
            </SimpleGrid>
          </ModalBody>
          <ModalFooter>
            <HStack w={"100%"}>
              <Text fontWeight={"semibold"} fontSize={"lg"} mr={4} h={"100%"}>
                Total: $230.22
              </Text>
              <Spacer />
              <Button onClick={onOpenItems} colorScheme="blue">
                Add Items
              </Button>
              <Button colorScheme="blue" onClick={onCloseInventory}>
                Close
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <InventoryItemsModal
        jobID={jobID}
        isOpenItems={isOpenItems}
        onCloseItems={onCloseItems}
        onOpenItems={onOpenItems}
      />
    </>
  );
};

export default InventoryModal;
