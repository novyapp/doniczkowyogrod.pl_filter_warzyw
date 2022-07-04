import { API_URL } from "../config/index";
import Select from "react-select";
import { useQuery, useQueryClient } from "react-query";
import { useState } from "react";
import Image from "next/image";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  Text,
} from "@chakra-ui/react";
import { Center } from "@chakra-ui/react";

const getWarzywa = async (key) => {
  const warzywniak = key.queryKey[1].warzywniak;
  const balkonMiesiac = key.queryKey[1].balkon;
  const doniczkaMiesiac = key.queryKey[1].doniczka;
  const rozsadaMiesiac = key.queryKey[1].rozsada;

  const url = `${API_URL}/api/warzywas?populate=*`;
  if (balkonMiesiac) {
    url += `&filters[balkon][kiedy][$eq]=${balkonMiesiac}`;
  }
  if (warzywniak) {
    url += `&filters[id][$eq]=${warzywniak}`;
  }
  if (rozsadaMiesiac) {
    url += `&filters[rozsada][kiedy][$eq]=${rozsadaMiesiac}`;
  }
  if (doniczkaMiesiac) {
    url += `&filters[doniczka][kiedy][$eq]=${doniczkaMiesiac}`;
  }
  const res = await fetch(url);
  return res.json();
};

export default function Home({ warzywa }) {
  const queryClient = useQueryClient();
  const [warzywniak, setWarzywniak] = useState(null);
  const [balkonMiesiac, setBalkonMiesiac] = useState(null);
  const [doniczkaMiesiac, setDoniczkaMiesiac] = useState(null);
  const [rozsadaMiesiac, setRozsadaMiesiac] = useState(null);

  const { data, status } = useQuery(
    [
      "warzywa",
      {
        warzywniak: warzywniak,
        balkon: balkonMiesiac,
        doniczka: doniczkaMiesiac,
        rozsada: rozsadaMiesiac,
      },
    ],
    getWarzywa,
    {
      initialData: warzywa,
    }
  );

  const rozsadaList = [
    { value: "uprawa bez rozsady", label: "Uprawa bez rozsady" },
    { value: "styczeń", label: "Styczeń" },
    { value: "luty", label: "Luty" },
    { value: "marzec", label: "Marzec" },
    { value: "kwiecień", label: "Kwiecień" },
    { value: "maj", label: "Maj" },
    { value: "czerwiec", label: "Czerwiec" },
    { value: "lipiec", label: "Lipiec" },
    { value: "sierpień", label: "Sierpień" },
    { value: "wrzesień", label: "Wrzesień" },
    { value: "październik", label: "Październik" },
    { value: "listopad", label: "Listopad" },
    { value: "grudzień", label: "Grudzień" },
  ];
  const doniczkaList = [
    { value: "uprawa tylko z rozsady", label: "Uprawa tylko z rozsady" },
    { value: "styczeń", label: "Styczeń" },
    { value: "luty", label: "Luty" },
    { value: "marzec", label: "Marzec" },
    { value: "kwiecień", label: "Kwiecień" },
    { value: "maj", label: "Maj" },
    { value: "czerwiec", label: "Czerwiec" },
    { value: "lipiec", label: "Lipiec" },
    { value: "sierpień", label: "Sierpień" },
    { value: "wrzesień", label: "Wrzesień" },
    { value: "październik", label: "Październik" },
    { value: "listopad", label: "Listopad" },
    { value: "grudzień", label: "Grudzień" },
  ];
  const balkonList = [
    { value: "uprawa bez rozsady", label: "Uprawa bez rozsady" },
    { value: "styczeń", label: "Styczeń" },
    { value: "luty", label: "Luty" },
    { value: "marzec", label: "Marzec" },
    { value: "kwiecień", label: "Kwiecień" },
    { value: "maj", label: "Maj" },
    { value: "czerwiec", label: "Czerwiec" },
    { value: "lipiec", label: "Lipiec" },
    { value: "sierpień", label: "Sierpień" },
    { value: "wrzesień", label: "Wrzesień" },
    { value: "październik", label: "Październik" },
    { value: "listopad", label: "Listopad" },
    { value: "grudzień", label: "Grudzień" },
  ];

  const customStyles = {
    menuPortal: (provided) => ({ ...provided, zIndex: 5 }),
  };

  return (
    <>
      {status === "loading" && <Text fontSize="6xl">Ładowanie wrzywniaka</Text>}
      {status === "error" && <div>Ups... coś przestało działać</div>}
      {status === "success" && (
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th w="25%">
                  <Select
                    menuPosition={"fixed"}
                    styles={customStyles}
                    options={warzywa.data}
                    instanceId="warzywa"
                    placeholder="Roślina"
                    getOptionLabel={(option) => `${option.attributes.name}`}
                    getOptionValue={(option) => `${option.id}`}
                    onChange={(values) =>
                      setWarzywniak(values ? values.id : null)
                    }
                    isClearable
                  />
                </Th>
                <Th w="25%">
                  <Select
                    menuPosition={"fixed"}
                    styles={customStyles}
                    options={rozsadaList}
                    instanceId="rozsada"
                    placeholder="Siew na rozsadę w domu"
                    getOptionLabel={(option) => `${option.label}`}
                    getOptionValue={(option) => `${option.value}`}
                    onChange={(values) =>
                      setRozsadaMiesiac(values ? values.value : null)
                    }
                    isClearable
                  />
                </Th>
                <Th w="25%">
                  <Select
                    menuPosition={"fixed"}
                    styles={customStyles}
                    options={doniczkaList}
                    instanceId="doniczka"
                    placeholder="Siew do doniczki na balkonie"
                    getOptionLabel={(option) => `${option.label}`}
                    getOptionValue={(option) => `${option.value}`}
                    onChange={(values) =>
                      setDoniczkaMiesiac(values ? values.value : null)
                    }
                    isClearable
                  />
                </Th>
                <Th w="25%">
                  <Select
                    menuPosition={"fixed"}
                    styles={customStyles}
                    options={balkonList}
                    instanceId="balkon"
                    placeholder="Od kiedy wystawić na stałe na balkon"
                    isOptionUnique="true"
                    getOptionLabel={(option) => `${option.label}`}
                    getOptionValue={(option) => `${option.value}`}
                    onChange={(values) =>
                      setBalkonMiesiac(values ? values.value : null)
                    }
                    isClearable
                  />
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.data.map((warzywo, index) => (
                <Tr key={index}>
                  <Td>
                    <Flex>
                      <Center w="90px">
                        <Image
                          src={
                            warzywo.attributes.image.data
                              ? warzywo.attributes.image.data.attributes.url
                              : "https://res.cloudinary.com/novyapp/image/upload/v1656858203/placeholder-450x450_yqdlyo.png"
                          }
                          layout="intrinsic"
                          width={60}
                          height={60}
                        />
                      </Center>
                      <Center>{warzywo.attributes.name}</Center>
                    </Flex>
                  </Td>
                  <Td>
                    <Flex>
                      {status === "success" &&
                        warzywo.attributes.rozsada.map((kiedy, index) => (
                          <Center key={index}>
                            {index ? ", " : ""}
                            {kiedy.kiedy}
                            {kiedy.prefix ? ` (${kiedy.prefix})` : null}
                          </Center>
                        ))}
                    </Flex>
                  </Td>
                  <Td>
                    <Flex>
                      {warzywo.attributes.doniczka.map((kiedy, index) => (
                        <Center key={index}>
                          {index ? ", " : ""}
                          {kiedy.kiedy}
                          {kiedy.prefix ? ` (${kiedy.prefix})` : null}
                        </Center>
                      ))}
                    </Flex>
                  </Td>
                  <Td>
                    <Flex>
                      {status === "success" &&
                        warzywo.attributes.balkon.map((kiedy, index) => (
                          <Center key={index}>
                            {kiedy.kiedy} {index ? ", " : ""}
                            {kiedy.prefix ? ` (${kiedy.prefix})` : null}
                          </Center>
                        ))}
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}

export async function getStaticProps() {
  const resWarzywa = await fetch(`${API_URL}/api/warzywas?populate=%2A`);
  const warzywa = await resWarzywa.json();

  return {
    props: {
      warzywa,
    },
    revalidate: 1, // In seconds
  };
}
