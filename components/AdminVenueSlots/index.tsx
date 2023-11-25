import { Box, Center, Container, Flex, HStack, Select, Spinner, Text } from "@chakra-ui/react"
import LayoutVenue from "../../layout/LayoutVenue"
import { useEffect, useState } from "react";
import { VenueField } from "../../types/type";
import { getFieldVenue } from "../../services/API/venue";
import { setToLoading } from "../../store/reducers/venue";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { VenueInfo, AccountType } from "../../types/user";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchBookingSlots } from "../../store/reducers/bookingSlots";
import dynamic from "next/dynamic";

const CalenderSlot = dynamic(() => import("../Venue/CalenderSlot"), { ssr: false });


const AdminVenueSlots = () => {
    const venue: VenueInfo | null = useSelector((state: RootState) => {
        if (state.account.userInfo?.type === AccountType.VENUE) {
            return state.account.userInfo.data
        }
        return null 
    })

    const { isLoading, data: slots } = useAppSelector(state => state.bookingSlots);
    const dispatch = useAppDispatch();

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
        console.log(booking);
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
                                    return <option value={field.id}>{`${field.name} - ${field.type.name}`}</option>
                                })
                            }
                        </Select>
                    </HStack>
                    {
                        isLoading ?
                            <Spinner />
                            :
                            <CalenderSlot onSelect={handleSelectedSlot} slots={slots.map(item => ({date_start: item.date_start, by: item.name, booking_id: item.booking_id}))} />
                    }
                </Flex>
            </Box>
            </Container>
        </LayoutVenue>
    )
}

export default AdminVenueSlots