import {
  Box,
  Checkbox,
  Divider,
  Flex,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Progress,
  Spacer,
  Stack,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ShoppingCart } from "phosphor-react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import InventoryModal from "../modals/InventoryModal";
import Alert from "../global/Alert";
import FormModal from "../modals/FormModal";
import EditJob from "../forms/EditJob";
import { differenceInSeconds, format, parseISO, toDate } from "date-fns";

const JobCard = (props) => {
  const { id, name, description, start, due, clientID, clientName } = props;
  const formattedStart = format(parseISO(start), "PP");
  const formattedDue = format(parseISO(due), "PP");
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      const totalInSeconds = differenceInSeconds(
        parseISO(due),
        parseISO(start)
      );
      const diffInSeconds = differenceInSeconds(parseISO(due), new Date());
      setProgress(100 - (100 / totalInSeconds) * diffInSeconds);
    }, 1000);
    return () => clearInterval(interval);
  }, [due, start]);
  const {
    isOpen: isOpenInventory,
    onOpen: onOpenInventory,
    onClose: onCloseInventory,
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
  return (
    <>
      <Box bg={"gray.50"} mx="auto" p={8} w="100%" shadow={"lg"}>
        <Stack>
          <Flex justify={"space-between"} align={"center"} mb={3}>
            <Text
              fontSize={"xs"}
              letterSpacing={1.1}
              textTransform={"uppercase"}
            >
              {clientName}
            </Text>
            <HStack spacing={4}>
              <IconButton
                onClick={onOpenInventory}
                shadow={"md"}
                size={"xs"}
                colorScheme="blue"
                aria-label="Search database"
                icon={<ShoppingCart />}
                fontSize={"sm"}
              />
              <IconButton
                onClick={onOpenEdit}
                shadow={"md"}
                size={"xs"}
                colorScheme="orange"
                aria-label="Search database"
                icon={<EditIcon />}
                fontSize={"sm"}
              />

              <IconButton
                onClick={onOpenDelete}
                shadow={"md"}
                size={"xs"}
                colorScheme="red"
                aria-label="Search database"
                icon={<DeleteIcon />}
                fontSize={"sm"}
              />
            </HStack>
          </Flex>

          <Heading as="h3" size="md">
            {name}
          </Heading>
          <Text pt={2} noOfLines={3} fontSize={"sm"} fontStyle={"italic"}>
            {description}
          </Text>
          <Flex
            align={"center"}
            justify={"space-between"}
            w={"100%"}
            fontWeight={"semibold"}
          >
            {start && (
              <Text
                fontSize={["xs", "sm"]}
              >{`${formattedStart} - ${formattedDue}`}</Text>
            )}
            <Spacer />
            <Flex flex={1} justify={"end"}>
              <FormLabel mt={2} fontWeight={"regular"} fontSize={"xs"}>
                Completed
              </FormLabel>
              <Checkbox
                spacing={"1rem"}
                mt={0}
                size={"lg"}
                colorScheme={"green"}
              />
            </Flex>
          </Flex>

          <Box>
            <Progress mt={1} size={"sm"} hasStripe value={progress} />
          </Box>
          <Divider pb={4} />
          <StatGroup pt={4}>
            <Stat>
              <StatLabel>Gross</StatLabel>
              <StatNumber>$34,670</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Net</StatLabel>
              <StatNumber>$15,602</StatNumber>
            </Stat>
          </StatGroup>
          <StatGroup pt={4}>
            <Stat>
              <StatLabel>Tasks</StatLabel>
              <StatNumber>15</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Inventory</StatLabel>
              <StatNumber>$4,602</StatNumber>
            </Stat>
          </StatGroup>
        </Stack>
      </Box>
      <InventoryModal
        jobID={id}
        isOpenInventory={isOpenInventory}
        onOpenInventory={onOpenInventory}
        onCloseInventory={onCloseInventory}
      />
      <Alert
        header={"Delete Job"}
        message={"Are you sure you want to delete this job?"}
        successOnClick={() => {
          alert(123);
        }}
        isOpenDelete={isOpenDelete}
        onOpenDelete={onOpenDelete}
        onCloseDelete={onCloseDelete}
      />
      <FormModal isOpen={isOpenEdit} onClose={onCloseEdit} header={"Edit Job"}>
        <EditJob />
      </FormModal>
    </>
  );
};

export default JobCard;
