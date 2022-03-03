import React, { useEffect, useState } from "react";
import PageLayout from "../components/layouts/PageLayout";
import { Center, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import SearchBar from "../components/SearchBar";
import JobCard from "../components/cards/JobCard";
import FloatingButton from "../components/global/FloatingButton";
import FormModal from "../components/modals/FormModal";
import AddJob from "../components/forms/AddJob";
import { getJobs } from "../components/firebase/queries/jobQueries";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    const unsubscribe = async () => {
      await getJobs(setJobs);
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
        {jobs.map((item, i) => {
          return <JobCard {...item} key={i} />;
        })}
      </SimpleGrid>
      <FloatingButton onClick={onOpenAdd} title={"Add Job"} />
      <FormModal isOpen={isOpenAdd} onClose={onCloseAdd} header={"Add Job"}>
        <AddJob />
      </FormModal>
    </PageLayout>
  );
};

export default Jobs;
