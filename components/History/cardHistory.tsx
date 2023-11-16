import {
  Box,
  Center,
  Flex,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import ModalSaran from "./modalSaran";
import React, { useMemo } from "react";
import { MatchHistory } from "../../types/schedule";
import dayjs from "dayjs";

type Props = {
  match: MatchHistory
}

const CardHistory = ({ match }: Props) => {
  const { home_team, away_team, date, result } = match;

  const matchDateTime = useMemo(() => {
    const dateObj = dayjs(date);
    const matchDate = dateObj.format("DD MMMM YYYY");
    const matchTime = dateObj.format("HH:mm");

    return {
      date: matchDate,
      time: matchTime
    }
  }, [date])

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
              {result.home}
            </Text>
          </Box>
        </Flex>
        <Box my="auto" textAlign={"center"}>
          {
            !result.isSettle &&
            <Text fontSize={"14px"} fontWeight="400" color="#ff0000">
              Skor yang di masukan belum sama
            </Text>
          }
          <Text fontSize={"14px"} fontWeight="400" color="#172C41">
            Fulltime
          </Text>
          <Text fontSize={"14px"} fontWeight="400" color="#172C41">
            {`${matchDateTime.date} ${matchDateTime.time}`}
          </Text>
        </Box>
        <Flex direction={"row"} gap="100px">
          <Box my="auto">
            <Text mb="8px" fontSize={"70px"} fontWeight="700" color="#1B262C">
              {result.away}
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
