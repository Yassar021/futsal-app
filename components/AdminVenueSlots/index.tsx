import { Box, Center, Container, Flex, HStack, Select, Spinner, Text, useDisclosure } from "@chakra-ui/react"
import LayoutVenue from "../../layout/LayoutVenue"
import { useEffect, useState } from "react";
import { VenueField } from "../../types/type";
import { getFieldVenue } from "../../services/API/venue";
import { setToLoading } from "../../store/reducers/venue";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { VenueInfo, AccountType } from "../../types/user";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchAddBooking, fetchBookingSlots, fetchDeleteBooking, fetchUpdateBooking } from "../../store/reducers/bookingSlots";
import dynamic from "next/dynamic";
import BookingInfo from "./bookingInfo";
import { BookingSubmit } from "../../types/request";
import BookingAdd from "./bookingAdd";

const CalenderSlot = dynamic(() => import("../Venue/CalenderSlot"), { ssr: false });


const AdminVenueSlots = () => {
    const venue: VenueInfo | null = useSelector((state: RootState) => {
        if (state.account.userInfo?.type === AccountType.VENUE) {
            return state.account.userInfo.data
        }
        return null 
    })

    const {isOpen: isBookingInfoOpen, onOpen: openBookingInfo, onClose: closeBookingInfo} = useDisclosure()
    const { isOpen: isBookingAddOpen, onOpen: openBookingAdd, onClose: closeBookingAdd } = useDisclosure()

    const { isLoading, data: slots } = useAppSelector(state => state.bookingSlots);
    const dispatch = useAppDispatch();

    const [selectedBookingId, setSelectedBookingId] = useState<number>(0);
    const [fields, setFields] = useState<VenueField[]>([]);
    const [selectedField, setSelectedFields] = useState<number>(0);
    

    useEffect(() => {
        getFieldVenue(venue.id).then((res) => {
            dispatch(setToLoading());
            setFields(res);
            setSelectedFields(res[0].id);
        })
    }, [venue.id])

    useEffect(() => {
        dispatch(fetchBookingSlots({venueId: venue.id, fieldId: selectedField}))
    },[selectedField])


    const handleSelectedSlot = (selecteds: [], selected: any,booking: any | undefined) => {
        if (booking) {
            setSelectedBookingId(booking.booking_id);
            openBookingInfo();
        }else{
            openBookingAdd();
        }
    }


    const handleUpdate = async (payload: BookingSubmit) => {
        await dispatch(fetchUpdateBooking({
            booking_id: selectedBookingId,
            payload: payload
        }))
        await dispatch(fetchBookingSlots({venueId: venue.id, fieldId: selectedField}))
    }

    const handleDelete = async (booking_id: number) => {
        await dispatch(fetchDeleteBooking(booking_id));
        setSelectedBookingId(0);
        closeBookingInfo();
        await dispatch(fetchBookingSlots({venueId: venue.id, fieldId: selectedField}))
    }

    const handleAdd = async (payload: BookingSubmit ) => {
        await dispatch(fetchAddBooking(payload));
        await dispatch(fetchBookingSlots({venueId: venue.id, fieldId: selectedField}))
        closeBookingAdd();
    }

    return(
        <LayoutVenue pageTitle={'Sparing List'}>
            <Container maxW='10xl'>
            <Box mb='60px' borderRadius={'5px'} shadow='xl' bgColor={'#fff'} width={'100%'} height='310px'>
            <Box borderRadius={'5px'} width={'100%'} height='60px' bgColor='#1B262C' py='16px'>
                <Center>
                    <Text fontWeight={'500'} fontSize='18px' color='#fff'>Booking Slots</Text>
                </Center>
            </Box>
                <Flex direction={'column'} gap='40px' pb='40px'>
                <HStack m={10} justifyContent={"space-between"} >
                        <Text w={"50%"} fontSize={'16px'} fontWeight='600' color='#1B262C'>Pilih Lapangan</Text>
                        <Select value={selectedField} disabled={isLoading} onChange={e => setSelectedFields(parseInt(e.target.value))} placeholder="Pilih Lapangan">
                            {
                                fields.map((field) => {
                                    return <option key={field.id} value={field.id}>{`${field.name} - ${field.type.name}`}</option>
                                })
                            }
                        </Select>
                    </HStack>
                    {
                        isLoading ?
                            <Spinner />
                            :
                            <CalenderSlot closing_hour={venue.closing_hour} opening_hour={venue.opening_hour} onSelect={handleSelectedSlot} slots={slots.map(item => ({date_start: item.date_start, by: item.name, booking_id: item.booking_id}))} />
                    }
                </Flex>
            </Box>
            {
                isBookingInfoOpen && <BookingInfo onDelete={handleDelete} onUpdate={handleUpdate} fields={fields} booking_id={selectedBookingId} onClose={closeBookingInfo} />
            }
            {
                isBookingAddOpen && <BookingAdd onAdd={handleAdd} fields={fields} onClose={closeBookingAdd} />
            }
            </Container>
        </LayoutVenue>
    )
}

export default AdminVenueSlots