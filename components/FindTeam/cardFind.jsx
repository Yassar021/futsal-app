import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";

const CardFind = ({ id, name, description }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      mb="60px"
      borderRadius={"5px"}
      shadow="xl"
      bgColor={"#fff"}
      width={"100%"}
      height="350px"
    >
      <Box
        borderRadius={"5px"}
        width={"100%"}
        height="60px"
        bgColor="#1B262C"
        py="16px"
      >
        <Center>
          <Text fontWeight={"500"} fontSize="18px" color="#fff">
            Penantang
          </Text>
        </Center>
      </Box>
      <Flex alignItems={"center"} direction={"column"} mt="20px" gap="30px">
        <Text fontSize={"18px"} fontWeight="600" color="#1B262C">
          {name}
        </Text>
        <Text
          width={"242px"}
          fontSize={"18px"}
          fontWeight="400"
          color="#A0A8B1"
        >
          {" "}
          {description}
        </Text>
        <Button
          bgColor={"#0F4C75"}
          width="140px"
          height={"40px"}
          onClick={onOpen}
          _hover={{ bg: "#0F4C75" }}
          _active={{
            bg: "#0F4C75",
            transform: "scale(0.98)",
          }}
        >
          <Text fontSize={"14px"} fontWeight="500" color="#fff">
            View Detail
          </Text>
        </Button>
        <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Valencia CF vs FC Barcelona</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <TableContainer>
                <Table variant="unstyled">
                  <Tbody py="10px">
                    <Tr>
                      <Td>
                        <Text
                          fontSize={"16px"}
                          fontWeight="600"
                          color="#1B262C"
                        >
                          Date
                        </Text>
                        <Text
                          my="20px"
                          fontSize={"16px"}
                          fontWeight="600"
                          color="#1B262C"
                        >
                          Time
                        </Text>
                        <Text
                          mb="20px"
                          fontSize={"16px"}
                          fontWeight="600"
                          color="#1B262C"
                        >
                          Location
                        </Text>
                        <Text
                          mb="20px"
                          fontSize={"16px"}
                          fontWeight="600"
                          color="#1B262C"
                        >
                          Message
                        </Text>
                      </Td>
                      <Td>
                        {/* <Text fontSize={'16px'} fontWeight='500' color='#1B262C'>13 December 2022</Text> */}
                        {/* <Text my='20px' fontSize={'16px'} fontWeight='500' color='#1B262C'>16:00 - 18:00 WITA</Text> */}
                        {/* <Text mb='20px' fontSize={'16px'} fontWeight='500' color='#1B262C'>Let have a friendly match</Text> */}
                        {/* <Text mb='20px' fontSize={'16px'} fontWeight='500' color='#1B262C'>Lorem ipsum dolor sit amet consectetur.</Text> */}
                        <Input type="date" placeholder="Tentukan Hari" /> <br />
                        <Input
                          my={"6px"}
                          type="time"
                          placeholder="Tentukan Waktu"
                        />
                        <Select placeholder="Tentukan Tempat">
                          <option value="option1">Lapangan 1</option>
                          <option value="option2">Lapangan 2</option>
                          <option value="option3">Lapangan 3</option>
                        </Select>
                        <Input placeholder="Masukkan pesan" /> <br />
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
              {/* <Stack direction={'row'} spacing='6px'>
                                    <Text fontSize={'16px'} fontWeight='500' color='#1B262C'>Negotiate Date on </Text>
                                    <Link href='#'>
                                        <Stack direction={'row'}>
                                            <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect width="24" height="23" fill="white"/>
                                                <path d="M6.67962 3.32038L7.29289 2.70711C7.68342 2.31658 8.31658 2.31658 8.70711 2.70711L11.2929 5.29289C11.6834 5.68342 11.6834 6.31658 11.2929 6.70711L9.50048 8.49952C9.2016 8.7984 9.1275 9.255 9.31653 9.63307C10.4093 11.8186 12.1814 13.5907 14.3669 14.6835C14.745 14.8725 15.2016 14.7984 15.5005 14.4995L17.2929 12.7071C17.6834 12.3166 18.3166 12.3166 18.7071 12.7071L21.2929 15.2929C21.6834 15.6834 21.6834 16.3166 21.2929 16.7071L20.6796 17.3204C18.5683 19.4317 15.2257 19.6693 12.837 17.8777L11.6286 16.9714C9.88504 15.6638 8.33622 14.115 7.02857 12.3714L6.12226 11.163C4.33072 8.7743 4.56827 5.43173 6.67962 3.32038Z" fill="#2DCC70"/>
                                            </svg>
                                            <Text>Whatsapp</Text>
                                        </Stack> 
                                    </Link>  
                                </Stack> */}
            </ModalBody>

            <ModalFooter>
              <Stack direction={"row"}>
                <Button
                  bgColor={"#EB5757"}
                  color="#fff"
                  _hover={{ bg: "#EB5757" }}
                  _active={{
                    bg: "#EB5757",
                    transform: "scale(0.98)",
                  }}
                  mr={3}
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  bgColor={"#2DCC70"}
                  color="#fff"
                  _hover={{ bg: "#2DCC70" }}
                  _active={{
                    bg: "#2DCC70",
                    transform: "scale(0.98)",
                  }}
                  mr={3}
                >
                  Send
                </Button>
              </Stack>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </Box>
  );
};

export default CardFind;
