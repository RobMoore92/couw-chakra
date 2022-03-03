import PageLayout from "../components/layouts/PageLayout";
import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Login from "../components/Login";
import Signup from "../components/Signup";

export default function Home() {
  const {
    isOpen: isOpenLogin,
    onOpen: onOpenLogin,
    onClose: onCloseLogin,
  } = useDisclosure();
  const {
    isOpen: isOpenSignup,
    onOpen: onOpenSignup,
    onClose: onCloseSignup,
  } = useDisclosure();
  return (
    <PageLayout>
      <Center h="100%">
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Couw Counter
          </Heading>
          <Text color={"gray.500"}>
            Monetize your content by charging your most loyal readers and reward
            them loyalty points. Give back to your loyal readers by granting
            them access to your pre-releases and sneak-peaks.
          </Text>
          <HStack
            direction={"column"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
          >
            <Button
              onClick={onOpenLogin}
              colorScheme={"green"}
              bg={"green.400"}
              rounded={"md"}
              px={6}
              _hover={{
                bg: "green.500",
              }}
            >
              Login
            </Button>
            <Button
              onClick={onOpenSignup}
              colorScheme={"green"}
              bg={"green.400"}
              rounded={"md"}
              px={6}
              _hover={{
                bg: "green.500",
              }}
            >
              Sign up
            </Button>
          </HStack>
        </Stack>
        <Login
          isOpenLogin={isOpenLogin}
          onOpenLogin={onOpenLogin}
          onCloseLogin={onCloseLogin}
        />
        <Signup
          isOpenSignup={isOpenSignup}
          onOpenSignup={onOpenSignup}
          onCloseSignup={onCloseSignup}
        />
      </Center>
    </PageLayout>
  );
}
