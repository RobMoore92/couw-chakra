import React from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  MenuItem,
  MenuList,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

const DrawerMenu = ({ isOpenDrawer, onOpenDrawer, onCloseDrawer }) => {
  const router = useRouter();
  return (
    <>
      <Drawer isOpen={isOpenDrawer} placement="left" onClose={onCloseDrawer}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <VStack align={"flex-start"}>
              <Button
                onClick={() => {
                  router.push("/");
                }}
                isFullWidth
                colorScheme="teal"
                size="md"
              >
                Home
              </Button>
              <Button
                onClick={() => {
                  router.push("/jobs");
                }}
                isFullWidth
                colorScheme="teal"
                size="md"
              >
                Jobs
              </Button>
              <Button
                onClick={() => {
                  router.push("/clients");
                }}
                isFullWidth
                colorScheme="teal"
                size="md"
              >
                Clients
              </Button>
              <Button
                onClick={() => {
                  router.push("/items");
                }}
                isFullWidth
                colorScheme="teal"
                size="md"
              >
                Items
              </Button>
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onCloseDrawer}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerMenu;
