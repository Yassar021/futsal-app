import { Button, HStack, Modal, ModalBody, Input, Text, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Stack, VStack, Select } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useAppSelector } from '../../../store/hooks';
import { useForm } from 'react-hook-form';
import { VenueField } from '../../../types/type';

type Props = {
    onClose: () => void;
    onSubmit: (data: EditForm) => Promise<void>;
    field: VenueField
}

type EditForm = {
    id: number;
    name: string;
    type_id: number;
}


function FieldEditModal({ onClose, onSubmit, field }: Props) {
    const { types } = useAppSelector(state => state.venueField)
    const [isLoading, setLoading] = useState(false)

    const { register, handleSubmit } = useForm<EditForm>({
        defaultValues: {
            id: field.id,
            name: field.name,
            type_id: field.type.id
        }
    });

    const handleConfirm = async (values: EditForm) => {
        setLoading(true);
        await onSubmit(values);
        setLoading(false);
    }

    return (
        <Modal isOpen={true} onClose={onClose} size={"lg"}>
            <form onSubmit={handleSubmit(handleConfirm)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Lapangan</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack mb={"20px"} align={'stretch'} spacing={15}>
                            <HStack >
                                <Text w={"50%"} fontSize={'16px'} fontWeight='600' color='#1B262C'>Nama</Text>
                                <Input isRequired type="text" {...register("name")} />
                            </HStack>
                            <HStack >
                                <Text w={"50%"} fontSize={'16px'} fontWeight='600' color='#1B262C'>Tipe Lapangan</Text>
                                <Select isRequired {...register("type_id")} >
                                    {
                                        types.map(type => (
                                            <option value={type.id} >{type.name}</option>
                                        ))
                                    }
                                </Select>
                            </HStack>
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Stack direction={"row"}>
                            <Button
                                bgColor={"#EB5757"}
                                color="#fff"
                                _hover={{ bg: "#EB5757" }}
                                _active={{
                                    bg: "#EB5757",
                                    transform: "scale(0.98)",
                                }}
                                mr={3}
                                onClick={onClose}
                                disabled={isLoading}
                            >
                                Batal
                            </Button>
                            <Button
                                bgColor={"#2DCC70"}
                                color="#fff"
                                _hover={{ bg: "#2DCC70" }}
                                _active={{
                                    bg: "#2DCC70",
                                    transform: "scale(0.98)",
                                }}
                                mr={3}
                                type='submit'
                                disabled={isLoading}
                            >
                                {
                                    isLoading ?
                                        <Spinner />
                                        :
                                        "Simpan"
                                }
                            </Button>
                        </Stack>
                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
    )
}

export default FieldEditModal