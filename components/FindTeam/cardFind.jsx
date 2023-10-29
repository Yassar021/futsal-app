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

const CardFind = ({ id, name, description, onRequest = () => {} }) => {

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
          onClick={onRequest}
          _hover={{ bg: "#0F4C75" }}
          _active={{
            bg: "#0F4C75",
            transform: "scale(0.98)",
          }}
        >
          <Text fontSize={"14px"} fontWeight="500" color="#fff">
            Kirim Tantangan
          </Text>
        </Button>
      </Flex>
    </Box>
  );
};

export default CardFind;
