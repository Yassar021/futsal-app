import { Box, Button, Flex, HStack, Image, Stack, Text } from "@chakra-ui/react"
import { BookingRequest, ChallengeStatus } from "../../types/challenge"
import { useMemo } from "react"
import dayjs from "dayjs"
import { getStatusColor, getStatusName } from "../../utils/statuses"

type Props = {
    request: BookingRequest
}

const CardList = ({ request }: Props) => {
    const { home_team: team } = request;

    const date = useMemo(() => {
        const date_start = dayjs(request.date_start);
        const date_end = dayjs(request.date_end);

        return {
            date: date_start.format("DD-MM-YYYY"),
            time_start: date_start.format("HH:mm"),
            time_end: date_end.format("HH:mm"),
        }

    }, [request.date_start, request.date_end])

    return (
        <Box mt='30px' py='35px' px='50px' width={'100%'} height={'210px'} borderRadius={'5px'} bgColor='#F3F4F7' boxShadow={'0px 4px 4px 0px rgba(0, 0, 0, 0.15)'}>
            <Flex direction={'row'} justifyContent={'space-between'}>
                <HStack spacing='32px'>
                    <Image borderRadius={'100%'} width={'150px'} height='150px' src={team.profile_picture} alt='bg-team' />
                    <Box my='auto'>
                        <Text mb='20px' fontSize={'18px'} fontWeight='600' letterSpacing={'0.02em'} color='#1B262C'>{team.name}</Text>
                        <Text fontSize={'16px'} fontWeight='400' letterSpacing={'0.02em'} color='#1B262C'>{date.date}</Text>
                        <Text fontSize={'16px'} fontWeight='400' letterSpacing={'0.02em'} color='#1B262C'>{date.time_start} - {date.time_end}</Text>
                        <Text fontSize={'16px'} fontWeight='400' letterSpacing={'0.02em'} color='#1B262C'> Whatsapp : {team.phone}</Text>
                    </Box>
                </HStack>
                <Box my='auto'>
                    <Stack direction={'row'}>
                       <Status status={request.status} />
                    </Stack>
                </Box>
            </Flex>
        </Box>
    )
}


type StatusProps = {
    status: ChallengeStatus
}

function Status({ status }: StatusProps) {
    const name = getStatusName(status);
    const color = getStatusColor(status);
    return (
        <Box p={"1.5"} px={"2"} borderRadius={'100px'} bgColor={color}
            mr={3}>
            <Text>{name}</Text>
        </Box>
    )
}

export default CardList