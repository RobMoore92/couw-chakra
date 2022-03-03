import React from "react";
import {Box, Button, Flex, IconButton, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import {AddIcon, EditIcon, ExternalLinkIcon, HamburgerIcon, RepeatIcon} from "@chakra-ui/icons";
const MenuBar = ({isOpenDrawer, onOpenDrawer, onCloseDrawer}) => {
    return(
        <Flex alignItems={"center"} px={3} bg={"gray.300"} w="100%" h={16}>
            <Button
                as={IconButton}
                aria-label='Options'
                icon={<HamburgerIcon />}
                variant='outline'
                onClick={() => onOpenDrawer()}
            />
        </Flex>

    )
}

export default MenuBar;