import { Modal, ModalOverlay, ModalContent, ModalHeader, Spinner, Text, ModalCloseButton, ModalBody, ModalFooter, VStack, HStack, Input, Button, Stack, Textarea, Select, AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { BookingInfo } from '../../types/booking';
import { getBookingInfo } from '../../services/API/venue';
import dayjs from 'dayjs';
import WhatsappLink from '../Commons/WhatsappLink';
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { VenueField } from '../../types/type';
import { BookingSubmit } from '../../types/request';
import TimePicker from '../Commons/TimePicker';

type Props = {
    onClose: () => void;
    booking_id: number;
    fields: VenueField[];
    onUpdate: (payload: BookingSubmit) => Promise<any>;
    onDelete: (booking_id: number) => Promise<any>;
}

type BookingForm = {
    by_name: string;
    by_phone: string;
    date: string;
    time_start: string;
    time_end: string;
    description: string;
    field_id: string;
}

function BookingInfo({ onClose, booking_id, fields, onUpdate, onDelete }: Props) {

    const { register, handleSubmit, setValue, control } = useForm<BookingForm>();

    const alertRef = useRef();
    const { isOpen: isAlertOpen, onOpen: openAlert, onClose: closeAlert } = useDisclosure();

    const [isLoading, setLoading] = useState(true);
    const [isEditing, setEditing] = useState(false);
    const [booking, setBooking] = useState<BookingInfo>();

    const fetchInfo = async () => {
        setLoading(true);

        let response = await getBookingInfo(booking_id).catch(() => {
            onClose();
            return null;
        })

        if (response) {
            setBooking(response);
        }

        setLoading(false);
    }

    const bookedTime = useMemo(() => {
        if (booking) {
            const date = new Date(booking.date_start);
            const end = new Date(booking.date_end);
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

    }, [booking])

    useEffect(() => {
        if (booking && bookedTime) {
            setValue("by_name", booking.by_name);
            setValue("by_phone", booking.by_phone);
            setValue("date", dayjs(booking.date_start).format("YYYY-MM-DD"));
            setValue("time_start", bookedTime.time_start);
            setValue("time_end", bookedTime.time_end);
            setValue("description", booking.description);
            setValue("field_id",booking.field.id.toString());
        }
    }, [booking, bookedTime])

    useEffect(() => {
        fetchInfo();
    }, [])

    const handleUpdate = async (values: BookingForm) => {
        setLoading(true);
        const date_start = dayjs(values.date).hour(parseInt(values.time_start.split(":")[0]));
        const date_end = dayjs(values.date).hour(parseInt(values.time_end.split(":")[0]))
        await onUpdate({
            by_name: values.by_name,
            by_phone: values.by_phone,
            description: values.description,
            field_id: parseInt(values.field_id),
            date_start: date_start.format("YYYY-MM-DD HH:mm"),
            date_end: date_end.format("YYYY-MM-DD HH:mm"),
        })
        setEditing(false);
        await fetchInfo();
        setLoading(false);
    }


    const handleDelete = async () => {
        setLoading(true);
        await onDelete(booking.id);
        setLoading(false);
    }

    return (
        <Modal isOpen={true} onClose={onClose} size={'lg'}>
            <ModalOverlay />
            <ModalContent>
                
                    <ModalHeader>Informasi Booking</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {
                            isLoading ?
                                <Spinner />
                                :
                                <VStack mb={"20px"} align={'stretch'} spacing={15}>
                                    <HStack >
                                        <Text w={"50%"} fontSize={'16px'} fontWeight='600' color='#1B262C'>Atas Nama</Text>
                                        {
                                            isEditing ?
                                                <Input type="text" {...register("by_name")} />
                                                :
                                                <Text w={"50%"} fontSize={'16px'} fontWeight='500' color='#1B262C'>{booking.by_name}</Text>
                                        }
                                    </HStack>
                                    <HStack >
                                        <Text w={"50%"} fontSize={'16px'} fontWeight='600' color='#1B262C'>Tanggal</Text>
                                        {
                                            isEditing ?
                                                <Input type="date" {...register("date")} />
                                                :
                                                <Text w={"50%"} fontSize={'16px'} fontWeight='500' color='#1B262C'>{bookedTime.date_start}</Text>
                                        }
                                    </HStack>
                                    <HStack >
                                        <Text w={"50%"} fontSize={'16px'} fontWeight='600' color='#1B262C'>Jam</Text>
                                        {
                                            isEditing ?
                                                <HStack>
                                                    <Controller 
                                                        name='time_start'
                                                        control={control}
                                                        render={({field}) => (
                                                            <TimePicker w={"100%"}
                                                                value={field.value}
                                                                onChange={e => {
                                                                    const [hour, minute] = e.target.value.split(":")
                                                                    console.log(e.target.value)
                                                                    field.onChange(`${hour}:00`);
                                                                }}
                                                            />
                                                        )}
                                                    />

                                                    <Controller 
                                                        control={control}
                                                        name='time_end'
                                                        render={({field}) => (
                                                            <TimePicker w={"100%"}
                                                                value={field.value} 
                                                                onChange={e => {
                                                                    const [hour, minute] = e.target.value.split(":")
                                                                    field.onChange(`${hour}:00`)
                                                                }}
                                                            />
                                                        )}
                                                    />
                                                    
                                                </HStack>
                                                :
                                                <Text w={"50%"} fontSize={'16px'} fontWeight='500' color='#1B262C'>{`${bookedTime.time_start} - ${bookedTime.time_end}`}</Text>
                                        }
                                    </HStack>
                                    <HStack >
                                        <Text w={"50%"} fontSize={'16px'} fontWeight='600' color='#1B262C'>Deskripsi</Text>
                                        {
                                            isEditing ?
                                                <Textarea {...register("description")} />
                                                :
                                                <Text w={"50%"} fontSize={'16px'} fontWeight='500' color='#1B262C'>{booking.description}</Text>
                                        }
                                    </HStack>
                                    {
                                        isEditing ?
                                        <HStack>
                                            <Text w={"50%"} fontSize={'16px'} fontWeight='600' color='#1B262C'>Lapangan</Text>
                                            <Select {...register("field_id")} >
                                                {
                                                    fields.map((field) => {
                                                        return <option key={field.id} value={field.id}>{`${field.name} - ${field.type.name}`}</option>
                                                    })
                                                }
                                            </Select>
                                        </HStack>
                                        :
                                        <HStack >
                                            <Text w={"50%"} fontSize={'16px'} fontWeight='600' color='#1B262C'>Tanggal Booking</Text>
                                            <Text w={"50%"} fontSize={'16px'} fontWeight='500' color='#1B262C'>{dayjs(booking.created_at).format('DD/MM/YYYY HH:mm')}</Text>
                                        </HStack>

                                    }
                                    <HStack >
                                        <Text w={"50%"} fontSize={'16px'} fontWeight='600' color='#1B262C'>Whatsapp</Text>
                                        {
                                            isEditing ?
                                                <Input type="text" {...register("by_phone")} />
                                                :
                                                <WhatsappLink phone={booking.by_phone} />
                                        }
                                    </HStack>
                                </VStack>
                        }
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
                                        type='button'
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
                                        onClick={handleSubmit(handleUpdate)}
                                    >
                                        Simpan
                                    </Button>
                                </Stack>
                        }
                    </ModalFooter>
                
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

export default BookingInfo