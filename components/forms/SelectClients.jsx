import React, { useEffect, useState } from "react";
import { Select } from "@chakra-ui/react";
import { getItems } from "../firebase/queries/itemQueries";
import { getClients } from "../firebase/queries/clientQueries";

const SelectClients = ({ field, handleBlur, handleChange }) => {
  const [clients, setClients] = useState([]);
  useEffect(() => {
    const unsubscribe = async () => {
      await getClients(setClients);
    };
    return unsubscribe();
  }, []);
  return (
    <Select
      name={field}
      size={"sm"}
      onChange={handleChange}
      onBlur={handleBlur}
    >
      <option value={null}>No Client</option>

      {clients.map((client) => {
        const value = JSON.stringify({
          name: `${client.fname} ${client.lname}`,
          id: client.id,
        });
        return (
          <option
            value={value}
            key={client.id}
          >{`${client.fname} ${client.lname}`}</option>
        );
      })}
    </Select>
  );
};

export default SelectClients;
