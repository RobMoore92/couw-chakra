import React, { useEffect, useState } from "react";
import PageLayout from "../components/layouts/PageLayout";
import {
  Avatar,
  Box,
  Center,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
  WrapItem,
} from "@chakra-ui/react";
import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import { Briefcase, Envelope, Phone } from "phosphor-react";
import SearchBar from "../components/SearchBar";
import ClientCard from "../components/cards/ClientCard";
import FloatingButton from "../components/global/FloatingButton";
import FormModal from "../components/modals/FormModal";
import AddItem from "../components/forms/AddItem";
import { getItems } from "../components/firebase/queries/itemQueries";
import AddClient from "../components/forms/AddClient";
import { getClients } from "../components/firebase/queries/clientQueries";
import ItemCard from "../components/cards/ItemCard";

const Clients = () => {
  const [clients, setClients] = useState([]);
  useEffect(() => {
    const unsubscribe = async () => {
      await getClients(setClients);
    };
    return unsubscribe();
  }, []);
  const {
    isOpen: isOpenAdd,
    onOpen: onOpenAdd,
    onClose: onCloseAdd,
  } = useDisclosure();
  return (
    <PageLayout>
      <Center>
        <SearchBar />
      </Center>
      <SimpleGrid spacing={[2, 2, 12]} mt={4} pb={16}>
        {clients.map((client, i) => {
          return <ClientCard {...client} key={i} />;
        })}
      </SimpleGrid>
      <FloatingButton onClick={onOpenAdd} title={"Add Client"} />
      <FormModal isOpen={isOpenAdd} onClose={onCloseAdd} header={"Add Item"}>
        <AddClient />
      </FormModal>
    </PageLayout>
  );
};

export default Clients;
