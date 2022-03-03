import React from "react";
import {
  Avatar,
  Box,
  Center,
  Heading,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useDisclosure,
  WrapItem,
} from "@chakra-ui/react";
import {
  Briefcase,
  DotsThreeVertical,
  Envelope,
  Phone,
  ShoppingCart,
} from "phosphor-react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import Alert from "../global/Alert";
import { removeItem } from "../firebase/queries/itemQueries";
import FormModal from "../modals/FormModal";
import EditItem from "../forms/EditItem";
import EditClient from "../forms/EditClient";
import { removeClient } from "../firebase/queries/clientQueries";

const ClientCard = (props) => {
  const { id, fname, lname, company, email, phone, image } = props;
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  return (
    <>
      <Box bg={"gray.50"} mx="auto" w={"100%"} p={3} shadow={"lg"}>
        <Stack>
          <HStack justify={"flex-end"} spacing={4} mb={4}>
            <ItemMenu onOpenEdit={onOpenEdit} onOpenDelete={onOpenDelete} />
          </HStack>
          <Center>
            <WrapItem textAlign={"center"} mt={1}>
              <Avatar size="xl" name={`${fname} ${lname}`} src={image} />{" "}
            </WrapItem>
          </Center>
          <Heading as="h3" size="md" pt={4} textAlign={"center"}>
            {`${fname} ${lname}`}
          </Heading>
          <Stack spacing={3} pt={6} px={6} pb={6}>
            <HStack spacing={3} bg="gray.100" p={2} rounded={"full"}>
              <Center
                w={8}
                h={8}
                rounded={"full"}
                shadow={"md"}
                bg={"green.400"}
              >
                <Icon as={Phone} color={"gray.100"} w={4} h={4} />
              </Center>
              <Text fontSize={["xs", "sm"]}>{phone}</Text>
            </HStack>
            <HStack spacing={3} bg="gray.100" p={2} rounded={"full"}>
              <Center
                w={8}
                h={8}
                rounded={"full"}
                shadow={"md"}
                bg={"blue.400"}
              >
                <Icon as={Envelope} color={"gray.100"} w={4} h={4} />
              </Center>
              <Text fontSize={["xs", "sm"]}>{email}</Text>
            </HStack>
            <HStack spacing={3} bg="gray.100" p={2} rounded={"full"}>
              <Center
                w={8}
                h={8}
                rounded={"full"}
                shadow={"md"}
                bg={"purple.400"}
              >
                <Icon as={Briefcase} color={"gray.100"} w={4} h={4} />
              </Center>
              <Text fontSize={["xs", "sm"]}>{company}</Text>
            </HStack>
          </Stack>
        </Stack>
      </Box>
      <Alert
        header={"Delete Client"}
        message={"Are you sure you want to delete this client?"}
        successOnClick={async () => {
          await removeClient(id);
        }}
        isOpenDelete={isOpenDelete}
        onOpenDelete={onOpenDelete}
        onCloseDelete={onCloseDelete}
      />
      <FormModal
        isOpen={isOpenEdit}
        onClose={onCloseEdit}
        header={"Edit Client"}
      >
        <EditClient client={props} />
      </FormModal>
    </>
  );
};

const ItemMenu = ({ onOpenEdit, onOpenDelete }) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<DotsThreeVertical fontSize={"1.2rem"} />}
        variant="outline"
        size={"xs"}
      />
      <MenuList>
        <MenuItem onClick={onOpenEdit} icon={<EditIcon />}>
          Edit Client
        </MenuItem>
        <MenuItem onClick={onOpenDelete} icon={<DeleteIcon />}>
          Delete Client
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ClientCard;
