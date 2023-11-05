import { Box, Button, Center, Flex, Image, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Table, TableContainer, Tbody, Td, Text, Tr, useDisclosure } from "@chakra-ui/react"
import React from "react";
import { ChallengeItem, ChallengeStatus, ChallengeType } from "../../types/challenge";
import { getStatusColor, getStatusName } from "../../utils/statuses";

type Props = ChallengeItem & {
    onSelect?: () => void;
}

const CardInbox = ({ type, team, message, status, id, onSelect = () => { } }: Props) => {

    return (
        <Box mb='60px' borderRadius={'5px'} shadow='xl' bgColor={'#fff'} width={'100%'} height='350px'>
            <Box borderRadius={'5px'} width={'100%'} height='60px' bgColor='#1B262C' py='16px'>
                <Center>
                    <Text fontWeight={'500'} fontSize='18px' color='#fff'>
                        {
                            type === ChallengeType.RECEIVED ?
                                "Penantang"
                                :
                                "Ditantang"
                        }
                    </Text>
                </Center>
            </Box>
            <Flex alignItems={'center'} direction={'column'} mt='20px' gap='30px' >
                <Text fontSize={'18px'} fontWeight='600' color='#1B262C'>{team.name}</Text>
                <Text width={'242px'} fontSize={'18px'} fontWeight='400' color='#A0A8B1'>{message}</Text>
                <Button bgColor={'#0F4C75'} width='140px' height={'40px'} onClick={onSelect} _hover={{ bg: '#0F4C75' }}
                    _active={{
                        bg: '#0F4C75',
                        transform: 'scale(0.98)',
                    }}>
                    <Text fontSize={'14px'} fontWeight='500' color='#fff'>View Detail</Text>
                </Button>
                <Stack direction={'row'} spacing='6px'>
                    <Status status={status} />
                </Stack>
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
        <>
            <Stack>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="10" fill={color} />
                </svg>
            </Stack>
            <Text fontWeight={'500'} fontSize='14px'>{name}</Text>
        </>
    )
}

export default CardInbox