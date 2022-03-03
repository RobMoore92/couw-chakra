import {
  useDisclosure,
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  InputGroup,
  InputLeftElement,
  FormControl,
  FormLabel,
  FormHelperText,
  Divider,
} from "@chakra-ui/react";
import {
  ArrowForwardIcon,
  EmailIcon,
  LockIcon,
  PhoneIcon,
} from "@chakra-ui/icons";

const Signup = ({ isOpenSignup, onOpenSignup, onCloseSignup }) => {
  return (
    <>
      <Modal
        isCentered
        blockScrollOnMount={false}
        isOpen={isOpenSignup}
        onClose={onCloseSignup}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign up</ModalHeader>
          <ModalCloseButton mt={2} />
          <Divider />
          <ModalBody mt={6}>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <EmailIcon color="gray.300" />
                </InputLeftElement>
                <Input type="email" />
              </InputGroup>
              <FormHelperText>
                We&apos;ll never share your email.
              </FormHelperText>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor="email">Password</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <LockIcon color="gray.300" />
                </InputLeftElement>
                <Input type="password" />
              </InputGroup>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor="email">Confirm Password</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <LockIcon color="gray.300" />
                </InputLeftElement>
                <Input type="password" />
              </InputGroup>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              rightIcon={<ArrowForwardIcon />}
              colorScheme="teal"
              variant="outline"
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Signup;
