import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  HStack,
  Image,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import ModalSaran from "./modalSaran";
import React, { useMemo } from "react";
import { InsertedResult, MatchHistory } from "../../types/schedule";
import dayjs from "dayjs";
import MatchResultModal from "./matchResultModal";

type Props = {
  match: MatchHistory
}

const CardHistory = ({ match }: Props) => {
  const { isOpen: isFeedbackOpen, onOpen: openFeedback, onClose: closeFeedback } = useDisclosure()
  const { isOpen: isResultOpen, onOpen: openResult, onClose: closeResult } = useDisclosure()

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

  const home_submited = useMemo(() => {
    const submited = result.submited.find(item => item.created_by === home_team.id);
    if (submited) {
      return submited;
    }

    return null;
  }, [result.submited])

  const away_submited = useMemo(() => {
    const submited = result.submited.find(item => item.created_by === away_team.id);
    if (submited) {
      return submited;
    }

    return null;
  }, [result.submited])

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
              {
                !result.isSettle &&
                <InsertedScore submited={home_submited} home_name={home_team.name} away_name={away_team.name} />

              }
            </Box>
          </VStack>
          <HStack my="auto">
            <Text mb="8px" fontSize={"70px"} fontWeight="700" color="#1B262C">
              {result.home}
            </Text>
            {
              result.isPenalty ?
                <Text fontSize={"30px"}>{`(${result.home_penalty})`}</Text>
                :
                null
            }
          </HStack>
        </Flex>
        <Box my="auto" textAlign={"center"}>
          {
            !result.isSettle &&
            <Text fontSize={"14px"} fontWeight="400" color="#ff0000">
              Skor yang di masukan belum sama
            </Text>
          }
          {
            !result.isSettle &&
            <Button
              onClick={openResult}
              color='#fff'
              fontFamily={'DM Sans'}
              bgColor={'#0F4C75'}
              height={'40px'}
              _hover={{ bg: '#0F4C75' }}
              fontSize={'14px'}
              fontWeight={'500'}
              _active={{
                bg: '#0F4C75',
                transform: 'scale(0.98)',
              }}
            >
              Masukan Skor
            </Button>
          }
          <Text fontSize={"14px"} fontWeight="400" color="#172C41">
            {
              result.isPenalty ? "Extra time" : "Fulltime"
            }
          </Text>
          <Text fontSize={"14px"} fontWeight="400" color="#172C41">
            {`${matchDateTime.date} ${matchDateTime.time}`}
          </Text>
        </Box>
        <Flex direction={"row"} gap="100px">
          <HStack my="auto">
            {
              result.isPenalty ?
                <Text fontSize={"30px"}>{`(${result.away_penalty})`}</Text>
                :
                null
            }
            <Text mb="8px" fontSize={"70px"} fontWeight="700" color="#1B262C">
              {result.away}
            </Text>
          </HStack>
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
              {
                !result.isSettle &&
                <InsertedScore submited={away_submited} home_name={home_team.name} away_name={away_team.name} />
              }
            </Box>
          </VStack>
        </Flex>
      </Flex>

      <Center>
        <Button
          onClick={openFeedback}
          color='#fff'
          fontFamily={'DM Sans'}
          bgColor={'#0F4C75'}
          width='140px'
          height={'40px'}
          _hover={{ bg: '#0F4C75' }}
          fontSize={'14px'}
          fontWeight={'500'}
          _active={{
            bg: '#0F4C75',
            transform: 'scale(0.98)',
          }}
        >
          Masukan dan saran
        </Button>
        {
          isFeedbackOpen && <ModalSaran gameId={match.id} onClose={closeFeedback} />
        }
      </Center>
      {
        isResultOpen && <MatchResultModal match={match} onClose={closeResult} />
      }
    </Box>
  );
};

type InsertedScoreProps = {
  submited: InsertedResult | null;
  home_name: string;
  away_name: string;
};

function InsertedScore({ submited, home_name, away_name }: InsertedScoreProps) {

  if (submited === null) {
    return (
      <Box>
        <Text color={"red"} fontSize={"xs"}>Belum Memasukan score</Text>
      </Box>
    )
  }

  return (
    <Box>
      <Text fontSize={"xs"}>{`Memasukan score`}</Text>
      <Text fontSize={"xs"}>{`${home_name} : ${submited.home}`}</Text>
      <Text fontSize={"xs"}>{`${away_name} : ${submited.away}`}</Text>
      {
        submited.isPenalty ?
          <>
            <Divider />
            <Text fontSize={"xs"}>{`Dengan Penalty score`}</Text>
            <Text fontSize={"xs"}>{`${home_name} : ${submited.home_penalty}`}</Text>
            <Text fontSize={"xs"}>{`${away_name} : ${submited.away_penalty}`}</Text>
          </>
          :
          null
      }
    </Box>
  )
}

export default CardHistory;
