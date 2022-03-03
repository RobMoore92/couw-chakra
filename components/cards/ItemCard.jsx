import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { DotsThreeVertical, ImageSquare, Minus, Plus } from "phosphor-react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import React from "react";
import Alert from "../global/Alert";
import FormModal from "../modals/FormModal";
import ImageModal from "../modals/ImageModal";
import EditItem from "../forms/EditItem";
import numeral from "numeral";
import { removeItem } from "../firebase/queries/itemQueries";
import EditClient from "../forms/EditClient";
import {
  addInventoryItem,
  decreaseQuantity,
  increaseQuantity,
} from "../firebase/queries/inventoryQueries";
import { useRouter } from "next/router";
const ItemCard = (props) => {
  const { values, isButton, jobID } = props;

  console.log(values);
  const { id, brand, model, price, barcode, image, website, quantity } = values;
  const {
    isOpen: isOpenImage,
    onOpen: onOpenImage,
    onClose: onCloseImage,
  } = useDisclosure();
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
  const router = useRouter();
  const toast = useToast();
  return (
    <>
      <Box
        as={isButton ? "button" : "div"}
        onClick={async () => {
          if (isButton) {
            await addInventoryItem(jobID, id, values, toast);
          }
        }}
        bg={"gray.50"}
        mx="auto"
        p={3}
        w="100%"
        shadow={"md"}
        _hover={isButton && { shadow: "lg" }}
      >
        <Stack>
          <Flex justify={"space-between"} align={"center"} mb={1}>
            <Text
              fontSize={"xs"}
              letterSpacing={1.1}
              textTransform={"uppercase"}
            >
              {barcode}
            </Text>
            <HStack>
              <IconButton
                zIndex={40}
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenImage();
                }}
                shadow={"md"}
                size={"xs"}
                colorScheme="blue"
                aria-label="Search database"
                icon={<ImageSquare />}
                fontSize={"sm"}
              />
              <ItemMenu onOpenEdit={onOpenEdit} onOpenDelete={onOpenDelete} />
            </HStack>
          </Flex>
          <Flex justify={"space-between"}>
            <Text fontSize={"sm"} lineHeight={0.75}>
              {brand}
            </Text>
            {!isButton && (
              <HStack spacing={2}>
                <Button
                  onClick={() => increaseQuantity(jobID, id, values, toast)}
                  p={2}
                  rounded={"full"}
                  h={4}
                  w={4}
                  minW={4}
                  bg={"blue.100"}
                  _hover={{ backgroundColor: "lightblue" }}
                >
                  <Icon
                    color={"gray.800"}
                    h={2.5}
                    w={2.5}
                    as={Plus}
                    role={"button"}
                  />
                </Button>
                <Button
                  onClick={() => decreaseQuantity(jobID, id, quantity)}
                  p={2}
                  rounded={"full"}
                  h={3}
                  w={3}
                  minW={3}
                  bg={"blue.100"}
                  _hover={{ backgroundColor: "lightblue" }}
                >
                  <Icon
                    color={"gray.800"}
                    h={2.5}
                    w={2.5}
                    as={Minus}
                    role={"button"}
                  />
                </Button>

                {quantity && (
                  <Text fontSize={"sm"} lineHeight={0.75}>
                    X {quantity}
                  </Text>
                )}
              </HStack>
            )}
          </Flex>
          <Flex justify={"space-between"}>
            <Text fontSize="lg" fontWeight={"semibold"}>
              {model}
            </Text>
            <Text fontSize="lg" fontWeight={"semibold"}>
              {numeral(price).format("$0.00")}
            </Text>
          </Flex>
        </Stack>
      </Box>
      {isOpenImage && (
        <ImageModal
          path={image}
          isOpen={isOpenImage}
          onOpen={onOpenImage}
          onClose={onCloseImage}
        />
      )}
      <Alert
        header={"Delete Item"}
        message={"Are you sure you want to delete this item?"}
        successOnClick={async () => {
          await removeItem(id);
        }}
        isOpenDelete={isOpenDelete}
        onOpenDelete={onOpenDelete}
        onCloseDelete={onCloseDelete}
      />
      <FormModal isOpen={isOpenEdit} onClose={onCloseEdit} header={"Edit Item"}>
        <EditItem item={props} />
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
          Edit Item
        </MenuItem>
        <MenuItem onClick={onOpenDelete} icon={<DeleteIcon />}>
          Delete Item
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ItemCard;
