import { Text, Modal, ModalOverlay, ModalContent, Spinner, ModalHeader, ModalCloseButton, ModalBody, VStack, HStack, Input, Select, Button, ModalFooter, Stack, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter, Center } from '@chakra-ui/react'
import React, { useEffect, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setSelected } from '../../store/reducers/challengeReceived';
import dayjs from 'dayjs';
import { ChallengeStatus } from '../../types/challenge';
import WhatsappLink from '../Commons/WhatsappLink';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    challengeId: string | number;
    onAccept: () => void;
    onReject: () => void;
}


function ChallengeReceivedInfo({ isOpen, challengeId, onClose, onAccept, onReject }: Props) {
    const { selected: challenge, selectedLoading: isLoading, statusLoading } = useAppSelector(state => state.challengeReceived);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setSelected(challengeId));
    }, [])

    const challengeDate = useMemo(() => {
        if (challenge) {
            const date = new Date(challenge.date_start);
            const end = new Date(challenge.date_end);
            const formatedDate = dayjs(date).format('DD/MM/YYYY');
            const formatedTime = dayjs(date).format('HH:mm');
            const formatedEndTime = dayjs(end).format('HH:mm')
            return {
                date_start: formatedDate,
                time_start: formatedTime,
                time_end: formatedEndTime
            };
        }
        return {
            date_start: "",
            time_start: "",
            time_end: ""
        };

    }, [challenge])

    return (
        <Modal isOpen={isOpen} onClose={onClose} size={'lg'}>
            <ModalOverlay />
            <ModalContent>
                {
                    isLoading && (challenge === null) ?
                        <Spinner />
                        :
                        <>
                            <ModalHeader>{`${challenge?.away_team.name} vs ${challenge?.home_team.name}`}</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <VStack mb={"20px"} align={'stretch'} spacing={15}>
                                    <HStack >
                                        <Text w={"50%"} fontSize={'16px'} fontWeight='600' color='#1B262C'>Date</Text>
                                        <Text w={"50%"} fontSize={'16px'} fontWeight='500' color='#1B262C'>{challengeDate.date_start}</Text>
                                    </HStack>
                                    <HStack justifyContent={"space-between"} >
                                        <Text w={"50%"} fontSize={'16px'} fontWeight='600' color='#1B262C'>Time</Text>
                                        <Text w={"50%"} fontSize={'16px'} fontWeight='500' color='#1B262C'>{challengeDate.time_start} - {challengeDate.time_end}</Text>
                                    </HStack>
                                    <HStack justifyContent={"space-between"} >
                                        <Text w={"50%"} fontSize={'16px'} fontWeight='600' color='#1B262C'>Location</Text>
                                        <Text w={"50%"} mb='20px' fontSize={'16px'} fontWeight='500' color='#1B262C'>{`${challenge?.venue.name} - ${challenge?.venue.address}`}</Text>
                                    </HStack>
                                    <HStack justifyContent={"space-between"} >
                                        <Text w={"50%"} fontSize={'16px'} fontWeight='600' color='#1B262C'>Message</Text>
                                        <Text w={"50%"} mb='20px' fontSize={'16px'} fontWeight='500' color='#1B262C'>{challenge?.message}</Text>
                                    </HStack>
                                    <Center>
                                        <WhatsappLink phone={challenge.home_team.phone} />
                                    </Center>
                                </VStack>
                            </ModalBody>

                            <ModalFooter>
                                {
                                    (challenge?.status === ChallengeStatus.PENDING) ?
                                        statusLoading ?
                                            <Spinner />
                                            :
                                            <Stack direction={'row'}>
                                                <Button bgColor={'#EB5757'} color='#fff' _hover={{ bg: '#EB5757' }}
                                                    _active={{
                                                        bg: '#EB5757',
                                                        transform: 'scale(0.98)',
                                                    }} mr={3} onClick={onReject} >
                                                    Tolak
                                                </Button>
                                                <Button bgColor={'#2DCC70'} color='#fff' _hover={{ bg: '#2DCC70' }}
                                                    _active={{
                                                        bg: '#2DCC70',
                                                        transform: 'scale(0.98)',
                                                    }} mr={3}
                                                    onClick={onAccept}
                                                >
                                                    Terima
                                                </Button>
                                            </Stack>
                                        :
                                        null
                                }
                            </ModalFooter>
                        </>
                }
            </ModalContent>
        </Modal>
    )
}

export default ChallengeReceivedInfo