import { Button, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Stack, Table, TableContainer, Tbody, Td, Tr, Text, VStack, HStack, Select, Input, AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Challenge } from '../../types/challenge';
import { getChallengeDetail } from '../../services/API/challenge';
import dayjs from 'dayjs';
import { getOptionFields } from '../../services/API/fields';
import { UpdateChallengeRequest } from '../../types/request';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deleteChallenge, setSelectedChallenge, updateChallenge } from '../../store/reducers/challengeSent';
import TimePicker from '../Commons/TimePicker';


type Props = {
    isOpen: boolean;
    onClose: () => void;
    challengeId: number | string;
    onDelete: () => void;
}

function ChallengeSentInfo({ isOpen, onClose, challengeId, onDelete }: Props) {
    const { selectedLoading: isLoading, selected: challenge } = useAppSelector(state => state.challengeSent);
    const dispatch = useAppDispatch();

    const alertRef = useRef();
    const { isOpen: isAlertOpen, onOpen: openAlert, onClose: closeAlert } = useDisclosure();

    const [isEditing, setEditing] = useState(false);
    const [fields, setFields] = useState<{ id: number, label: string }[]>([]);

    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [fieldId, setFieldId] = useState(0);
    const [message, setMessage] = useState("");


    const fetchChallenge = async () => {
        dispatch(setSelectedChallenge(challengeId));
    }

    const handleUpdate = () => {
        if (challenge) {
            let payload = {
                datetime: `${date} ${time}`,
                field_id: fieldId.toString(),
                message: message
            }

            dispatch(updateChallenge({
                id: challenge.id,
                payload: payload
            }))
        }
    }

    const handleDelete = () => {
        onDelete();
    }

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

    useEffect(() => {
        if (challenge) {
            const start_date = dayjs(new Date(challenge.date_start)).format("YYYY-MM-DD");
            const start_time = dayjs(new Date(challenge.date_start)).format("HH:mm");

            setDate(start_date);
            setTime(start_time);
            setMessage(challenge.message);
            setFieldId(challenge.venue.id);

        }
    }, [isEditing, challenge])

    useEffect(() => {
        fetchChallenge();
    }, [])

    useEffect(() => {
        getOptionFields().then((data) => {
            setFields(data);
        })
    }, [])

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
                                        {
                                            isEditing ?
                                                <Input value={date} onChange={(e) => setDate(e.target.value)} type="date" placeholder="Tentukan Hari" />
                                                :
                                                <Text w={"50%"} fontSize={'16px'} fontWeight='500' color='#1B262C'>{challengeDate.date_start}</Text>
                                        }
                                    </HStack>
                                    <HStack justifyContent={"space-between"} >
                                        <Text w={"50%"} fontSize={'16px'} fontWeight='600' color='#1B262C'>Time</Text>
                                        {
                                            isEditing ?
                                                <TimePicker
                                                    my={"6px"}
                                                    value={time}
                                                    placeholder="Tentukan Waktu"
                                                    onChange={e => {
                                                        const [hour, minute] = e.target.value.split(":")
                                                        setTime(`${hour}:00`)
                                                    }}
                                                    disabled={isLoading}
                                                />
                                                :
                                                <Text w={"50%"} fontSize={'16px'} fontWeight='500' color='#1B262C'>{challengeDate.time_start} - {challengeDate.time_end}</Text>
                                        }
                                    </HStack>
                                    <HStack justifyContent={"space-between"} >
                                        <Text w={"50%"} fontSize={'16px'} fontWeight='600' color='#1B262C'>Location</Text>
                                        {
                                            isEditing ?
                                                <Select value={fieldId} disabled={isLoading} onChange={e => setFieldId(parseInt(e.target.value))} placeholder="Tentukan Tempat">
                                                    {
                                                        fields.map((field) => {
                                                            return <option key={field.id} value={field.id}>{field.label}</option>
                                                        })
                                                    }
                                                </Select>
                                                :
                                                <Text w={"50%"} mb='20px' fontSize={'16px'} fontWeight='500' color='#1B262C'>{`${challenge?.venue.name} - ${challenge?.venue.address}`}</Text>
                                        }
                                    </HStack>
                                    <HStack justifyContent={"space-between"} >
                                        <Text w={"50%"} fontSize={'16px'} fontWeight='600' color='#1B262C'>Message</Text>
                                        {
                                            isEditing ?
                                                <Input value={message} onChange={e => setMessage(e.target.value)} placeholder="Masukkan pesan" />
                                                :
                                                <Text w={"50%"} mb='20px' fontSize={'16px'} fontWeight='500' color='#1B262C'>{challenge?.message}</Text>
                                        }
                                    </HStack>
                                </VStack>
                                {
                                    isEditing ? 
                                    <Button colorScheme='red' onClick={openAlert}>
                                        Hapus
                                    </Button>
                                    :
                                    null
                                }
                            </ModalBody>

                            <ModalFooter>
                                {
                                    !isEditing ?
                                        <Stack direction={'row'}>
                                            <Button bgColor={'#EB5757'} color='#fff' _hover={{ bg: '#EB5757' }}
                                                _active={{
                                                    bg: '#EB5757',
                                                    transform: 'scale(0.98)',
                                                }} mr={3} onClick={onClose}>
                                                Tutup
                                            </Button>
                                            <Button bgColor={'#2DCC70'} color='#fff' _hover={{ bg: '#2DCC70' }}
                                                _active={{
                                                    bg: '#2DCC70',
                                                    transform: 'scale(0.98)',
                                                }} mr={3}
                                                onClick={() => setEditing(true)}
                                            >
                                                Edit
                                            </Button>
                                        </Stack>
                                        :
                                        <Stack direction={'row'}>
                                            <Button bgColor={'#EB5757'} color='#fff' _hover={{ bg: '#EB5757' }}
                                                _active={{
                                                    bg: '#EB5757',
                                                    transform: 'scale(0.98)',
                                                }} mr={3}
                                                onClick={() => setEditing(false)}
                                            >
                                                Cancel
                                            </Button>
                                            <Button bgColor={'#2DCC70'} color='#fff' _hover={{ bg: '#2DCC70' }}
                                                _active={{
                                                    bg: '#2DCC70',
                                                    transform: 'scale(0.98)',
                                                }} mr={3}
                                                onClick={handleUpdate}
                                            >
                                                Simpan
                                            </Button>
                                        </Stack>
                                }
                            </ModalFooter>
                        </>
                }
            </ModalContent>
            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={alertRef}
                onClose={closeAlert}
                isOpen={isAlertOpen}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader>Hapus?</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        Apakah anda yakin?
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={alertRef} onClick={onClose}>
                            Batalkan
                        </Button>
                        <Button colorScheme='red' ml={3} onClick={handleDelete}>
                            Lanjutkan
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Modal>

    )
}

export default ChallengeSentInfo