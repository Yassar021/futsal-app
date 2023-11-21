import { Box, Button, Center, Editable, EditablePreview, EditableTextarea, Flex, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Spinner, TableContainer, Text, useDisclosure } from "@chakra-ui/react"
import dynamic from "next/dynamic";
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import React from "react";
import { VenueField } from "../../types/type";
import { getFieldVenue } from "../../services/API/venue";
import { setToLoading } from "../../store/reducers/venue";
import { fetchBookingSlots } from "../../store/reducers/bookingSlots";

const CalenderSlot = dynamic(() => import("./CalenderSlot"), { ssr: false });

type Props = {
    onClose: () => void;
    venueName: string;
    venueId: number;

}

const ModalVenue = ({ onClose, venueId, venueName }: Props) => {

    const { isLoading, data: slots } = useAppSelector(state => state.bookingSlots);
    const [fields, setFields] = useState<VenueField[]>([]);
    const [selectedField, setSelectedFields] = useState<number>(0);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setToLoading());
        getFieldVenue(venueId).then((res) => {
            setFields(res);
            setSelectedFields(res[0].id);
        })
    }, [venueId])

    useEffect(() => {
        dispatch(fetchBookingSlots({venueId, fieldId: selectedField}))
    },[selectedField])

    return (
        <Modal isOpen={true} onClose={onClose} size={'xxl'}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader pb='60px'>Jadwal lapangan {venueName}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <HStack m={10} justifyContent={"space-between"} >
                        <Text w={"50%"} fontSize={'16px'} fontWeight='600' color='#1B262C'>Pilih Lapangan</Text>
                        <Select value={selectedField} disabled={isLoading} onChange={e => setSelectedFields(parseInt(e.target.value))} placeholder="Pilih Lapangan">
                            {
                                fields.map((field) => {
                                    return <option value={field.id}>{`${field.name} - ${field.type.name}`}</option>
                                })
                            }
                        </Select>

                    </HStack>
                    {
                        isLoading ?
                            <Spinner />
                            :
                            <CalenderSlot slots={slots} />
                    }
                </ModalBody>
                <ModalFooter>
                    <Button
                        bgColor={'#EB5757'}
                        color='#fff'
                        mr={3}
                        _hover={{ bg: '#EB5757' }}
                        _active={{
                            bg: '#EB5757',
                            transform: 'scale(0.98)',
                        }}
                        onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ModalVenue