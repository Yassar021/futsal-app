import React, { useMemo, useRef, useState } from "react";
import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Flex, HStack, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack, Text, Textarea, VStack, useDisclosure } from "@chakra-ui/react"
import { BookingRequest } from "../../types/challenge";
import dayjs from "dayjs";
import { VenueField } from "../../types/type";


type Props = {
    request: BookingRequest,
    fields: VenueField[],
    onAccept: (challenge_id: number, field_id: number, description: string) => Promise<any>;
    onReject: (challenge_id: number) => Promise<any>
}

const CardRequest = ({ request, fields, onAccept, onReject }: Props) => {
    const alertRef = useRef();
    const { isOpen: isAlertOpen, onOpen: openAlert, onClose: closeAlert } = useDisclosure();
    const { isOpen: acceptModalOpen, onOpen: openAcceptModal, onClose: closeAcceptModal } = useDisclosure()
    
    const { home_team: team } = request;
    const [selectedField, setSelectedFields] = useState<number>(0);
    const [description, setDescription] = useState("");
    const [isLoading, setLoading] = useState(false);

    const date = useMemo(() => {
        const date_start = dayjs(request.date_start);
        const date_end = dayjs(request.date_end);

        return {
            date: date_start.format("DD-MM-YYYY"),
            time_start: date_start.format("HH:mm"),
            time_end: date_end.format("HH:mm"),
        }

    }, [request.date_start, request.date_end])

    const handleAccept = async () => {
        setLoading(true);

        await onAccept(request.id,selectedField,description);

        setLoading(false);
    }

    const handleReject = async () => {
        setLoading(true)

        await onReject(request.id);

        setLoading(false)
    }

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
                        <Button width='100px' height={'40px'} borderRadius={'2px'} bgColor={'#2DCC70'} color='#fff' _hover={{ bg: '#2DCC70' }}
                            _active={{
                                bg: '#2DCC70',
                                transform: 'scale(0.98)',
                            }}
                            onClick={openAcceptModal}
                            mr={3}>
                            Accept
                        </Button>
                        <Button width='100px' height={'40px'} borderRadius={'2px'} bgColor={'#EB5757'} color='#fff' _hover={{ bg: '#EB5757' }}
                            _active={{
                                bg: '#EB5757',
                                transform: 'scale(0.98)',
                            }} mr={3}
                            onClick={openAlert}
                            >
                            Reject
                        </Button>
                    </Stack>
                </Box>
            </Flex>
            <Modal isOpen={acceptModalOpen} onClose={closeAcceptModal} size={'lg'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Terima</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack mb={"20px"} align={'stretch'} spacing={15}>
                            <HStack >
                                <Text w={"50%"} fontSize={'16px'} fontWeight='600' color='#1B262C'>Tanggal</Text>
                                <Text w={"50%"} fontSize={'16px'} fontWeight='500' color='#1B262C'>{date.date}</Text>
                            </HStack>
                            <HStack >
                                <Text w={"50%"} fontSize={'16px'} fontWeight='600' color='#1B262C'>Jam</Text>
                                <Text w={"50%"} fontSize={'16px'} fontWeight='500' color='#1B262C'>{date.time_start} - {date.time_end}</Text>
                            </HStack>
                            <HStack >
                                <Text w={"50%"} fontSize={'16px'} fontWeight='600' color='#1B262C'>Pilih Lapangan</Text>
                                <Select w={"50%"} value={selectedField} disabled={isLoading} onChange={e => setSelectedFields(parseInt(e.target.value))} placeholder="Pilih Lapangan">
                                    {
                                        fields.map((field) => {
                                            return <option value={field.id}>{`${field.name} - ${field.type.name}`}</option>
                                        })
                                    }
                                </Select>
                            </HStack>
                            <HStack >
                                <Text w={"50%"} fontSize={'16px'} fontWeight='600' color='#1B262C'>Keterangan</Text>
                                <Textarea disabled={isLoading} w={"50%"} value={description} onChange={e => setDescription(e.target.value)} />
                            </HStack>
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Stack direction={'row'}>
                            <Button bgColor={'#EB5757'} color='#fff' _hover={{ bg: '#EB5757' }}
                                _active={{
                                    bg: '#EB5757',
                                    transform: 'scale(0.98)',
                                }} mr={3} onClick={closeAcceptModal} >
                                Batal
                            </Button>
                            <Button bgColor={'#2DCC70'} color='#fff' _hover={{ bg: '#2DCC70' }}
                                _active={{
                                    bg: '#2DCC70',
                                    transform: 'scale(0.98)',
                                }} mr={3}
                                isLoading={isLoading}
                                onClick={handleAccept}
                            >
                                Terima
                            </Button>
                        </Stack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={alertRef}
                onClose={closeAlert}
                isOpen={isAlertOpen}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader>Tolak?</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        Apakah anda yakin?
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button disabled={isLoading} ref={alertRef} onClick={closeAlert}>
                            Batalkan
                        </Button>
                        <Button isLoading={isLoading} disabled={isLoading} colorScheme='red' ml={3} onClick={handleReject}>
                            Lanjutkan
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Box>
    )
}

export default CardRequest