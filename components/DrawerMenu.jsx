import React from "react";
import {Box, Button, DrawerBody, DrawerFooter, DrawerHeader, Input} from "@chakra-ui/react";

const DrawerMenu = ({ onCloseDrawer}) => {
    return(
        <Box>
            <DrawerHeader>Create your account</DrawerHeader>
            <DrawerBody>
                <Input placeholder='Type here...' />
            </DrawerBody>

            <DrawerFooter>
                <Button variant='outline' mr={3} onClick={onCloseDrawer}>
                    Cancel
                </Button>
                <Button colorScheme='blue'>Save</Button>
            </DrawerFooter>
        </Box>
    )
}

export default DrawerMenu;