import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, VStack, HStack, Input, Text, Select, Textarea, Button, Stack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { VenueField } from '../../types/type';
import dayjs from 'dayjs';
import { BookingSubmit } from '../../types/request';


type Props = {
    onClose: () => void;
    fields: VenueField[];
    onAdd: (payload: BookingSubmit) => Promise<any>;
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

function BookingAdd({ onClose, fields, onAdd }: Props) {
    const { register, handleSubmit, setValue } = useForm<BookingForm>();
    const [isLoading,setLoading] = useState(false); 

    const handleAdd = async (values: BookingForm) => {
        setLoading(true);
        const date_start = dayjs(values.date).hour(parseInt(values.time_start.split(":")[0]));
        const date_end = dayjs(values.date).hour(parseInt(values.time_end.split(":")[0]))
        await onAdd({
            by_name: values.by_name,
            by_phone: values.by_phone,
            description: values.description,
            field_id: parseInt(values.field_id),
            date_start: date_start.format("YYYY-MM-DD HH:mm"),
            date_end: date_end.format("YYYY-MM-DD HH:mm"),
        })
        setLoading(false);
    }

    return (
        <Modal isOpen={true} onClose={onClose} size={'lg'}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Tambah Booking</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack mb={"20px"} align={'stretch'} spacing={15}>
                        <HStack >
                            <Text w={"50%"} fontSize={'16px'} fontWeight='600' color='#1B262C'>Atas Nama</Text>
                            <Input type="text" {...register("by_name")} />
                        </HStack>
                        <HStack >
                            <Text w={"50%"} fontSize={'16px'} fontWeight='600' color='#1B262C'>Tanggal</Text>
                            <Input type="date" {...register("date")} />
                        </HStack>
                        <HStack >
                            <Text w={"50%"} fontSize={'16px'} fontWeight='600' color='#1B262C'>Jam</Text>
                            <HStack>
                                <Input w={"100%"} type="time" {...register("time_start")}
                                    onChange={e => {
                                        const [hour] = e.target.value.split(":")
                                        setValue("time_start", `${hour}:00`)
                                    }}
                                />
                                <Input w={"100%"} type="time" {...register("time_end")}
                                    onChange={e => {
                                        const [hour] = e.target.value.split(":")
                                        setValue("time_end", `${hour}:00`)
                                    }}
                                />
                            </HStack>
                        </HStack>
                        <HStack >
                            <Text w={"50%"} fontSize={'16px'} fontWeight='600' color='#1B262C'>Deskripsi</Text>
                            <Textarea {...register("description")} />
                        </HStack>
                        <HStack>
                            <Text w={"50%"} fontSize={'16px'} fontWeight='600' color='#1B262C'>Lapangan</Text>
                            <Select {...register("field_id")} >
                                {
                                    fields.map((field) => {
                                        return <option value={field.id}>{`${field.name} - ${field.type.name}`}</option>
                                    })
                                }
                            </Select>
                        </HStack>
                        <HStack >
                            <Text w={"50%"} fontSize={'16px'} fontWeight='600' color='#1B262C'>Whatsapp</Text>
                            <Input type="text" {...register("by_phone")} />
                        </HStack>
                    </VStack>
                </ModalBody>
            <ModalFooter>
                <Stack direction={'row'}>
                    <Button bgColor={'#EB5757'} color='#fff' _hover={{ bg: '#EB5757' }}
                        _active={{
                            bg: '#EB5757',
                            transform: 'scale(0.98)',
                        }} mr={3}
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button bgColor={'#2DCC70'} color='#fff' _hover={{ bg: '#2DCC70' }}
                        _active={{
                            bg: '#2DCC70',
                            transform: 'scale(0.98)',
                        }} mr={3}
                        onClick={handleSubmit(handleAdd)}
                    >
                        Simpan
                    </Button>
                </Stack>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default BookingAdd