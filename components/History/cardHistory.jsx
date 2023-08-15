import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import ModalSaran from "./modalSaran";
import moment from "moment";

const CardHistory = ({ home_team, away_team, match_results }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      borderRadius={"5px"}
      shadow="xl"
      bgColor={"#fff"}
      width={"100%"}
      height="auto"
      pb="20px"
    >
      <Flex
        justifyContent={"center"}
        direction={"row"}
        pt="45px"
        pb="30px"
        gap="60px"
      >
        <Flex direction={"row"} gap="100px">
          <VStack direction={"column"} spacing="24px">
            <Image
              width={"100px"}
              height="100px"
              src="fcb-team.png"
              alt="FCB"
            />
            <Box my="auto">
              <Text mb="8px" fontSize={"18px"} fontWeight="700" color="#1B262C">
                {home_team.name}
              </Text>
            </Box>
          </VStack>
          <Box my="auto">
            <Text mb="8px" fontSize={"70px"} fontWeight="700" color="#1B262C">
              {match_results[0].home}
            </Text>
          </Box>
        </Flex>
        <Box my="auto" textAlign={"center"}>
          <Text fontSize={"14px"} fontWeight="400" color="#172C41">
            Fulltime
          </Text>
          <Text fontSize={"14px"} fontWeight="400" color="#172C41">
            {moment(match_results.created_at).format("DD-MM-YYYY")}
          </Text>
        </Box>
        <Flex direction={"row"} gap="100px">
          <Box my="auto">
            <Text mb="8px" fontSize={"70px"} fontWeight="700" color="#1B262C">
              {match_results[0].away}
            </Text>
          </Box>
          <VStack direction={"column"} spacing="24px">
            <Image
              width={"100px"}
              height="100px"
              src="rma-team.png"
              alt="rma"
            />
            <Box my="auto">
              <Text mb="8px" fontSize={"18px"} fontWeight="700" color="#1B262C">
                {away_team.name}
              </Text>
            </Box>
          </VStack>
        </Flex>
      </Flex>

      <Center>
        <ModalSaran />
      </Center>
    </Box>
  );
};

export default CardHistory;
