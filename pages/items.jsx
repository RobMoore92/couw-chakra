import React, { useEffect, useState } from "react";
import PageLayout from "../components/layouts/PageLayout";
import { SimpleGrid, useDisclosure } from "@chakra-ui/react";
import SearchBar from "../components/SearchBar";
import ItemCard from "../components/cards/ItemCard";
import FloatingButton from "../components/global/FloatingButton";
import FormModal from "../components/modals/FormModal";
import AddItem from "../components/forms/AddItem";
import { getItems } from "../components/firebase/queries/itemQueries";

const Items = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const unsubscribe = async () => {
      try {
        getItems(setItems).then((data) => {
          console.log("toast");
        });
      } catch (e) {
        console.log(e);
      }
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
      <SearchBar maxWidth={["full", "md"]} />
      <SimpleGrid spacing={[2, 2, 12]} mt={4} pb={16}>
        {items.map((item, i) => {
          return <ItemCard values={item} key={i} />;
        })}
      </SimpleGrid>
      <FloatingButton onClick={onOpenAdd} title={"Add Item"} />
      <FormModal isOpen={isOpenAdd} onClose={onCloseAdd} header={"Add Item"}>
        <AddItem />
      </FormModal>
    </PageLayout>
  );
};

export default Items;
