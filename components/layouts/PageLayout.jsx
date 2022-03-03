import Head from "next/head";
import { Box, Container, useDisclosure } from "@chakra-ui/react";
import MenuBar from "../MenuBar";
import Drawer from "../Drawer";

const PageLayout = ({ children }) => {
  const {
    isOpen: isOpenDrawer,
    onOpen: onOpenDrawer,
    onClose: onCloseDrawer,
  } = useDisclosure();
  return (
    <>
      <Box>
        <MenuBar
          isOpenDrawer={isOpenDrawer}
          onOpenDrawer={onOpenDrawer}
          onCloseDrawer={onCloseDrawer}
        />
        <Drawer
          isOpenDrawer={isOpenDrawer}
          onOpenDrawer={onOpenDrawer}
          onCloseDrawer={onCloseDrawer}
        />

        <Container maxW={"6xl"} mt={4} px={4}>
          {children}
        </Container>
      </Box>
    </>
  );
};

export default PageLayout;
