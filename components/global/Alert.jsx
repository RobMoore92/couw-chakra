import React from "react";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

const Alert = ({
  isOpenDelete,
  onCloseDelete,
  header,
  message,
  successOnClick,
}) => {
  const cancelRef = React.useRef();
  return (
    <AlertDialog
      isCentered
      isOpen={isOpenDelete}
      leastDestructiveRef={cancelRef}
      onClose={onCloseDelete}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {header}
          </AlertDialogHeader>

          <AlertDialogBody>{message}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onCloseDelete}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={() => {
                successOnClick();
                onCloseDelete();
              }}
              ml={3}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default Alert;
