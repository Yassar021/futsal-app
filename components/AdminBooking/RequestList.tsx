import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { acceptBookingRequests, fetchBookingRequests, fetchVenueFields, rejectBookingRequest } from '../../store/reducers/bookingRequests';
import { Spinner, VStack } from '@chakra-ui/react';
import CardRequest from './cardRequest';

function RequestList() {
    const { isLoading, list, fields } = useAppSelector(state => state.bookingRequests)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchBookingRequests())
        dispatch(fetchVenueFields())
    },[]);


    const acceptBooking = async (challenge_id: number, field_id: number, description: string) => {
        await dispatch(acceptBookingRequests({
            challenge_id: challenge_id,
            payload: {
                description: description,
                field_id
            }
        }))
    }

    
    const rejectBooking = async (challenge_id: number) => {
        await dispatch(rejectBookingRequest(challenge_id));
    }

    return (
        <div>
            {
                list.map(item => {
                    return <CardRequest 
                                key={item.id} 
                                request={item} 
                                fields={fields}
                                onAccept={acceptBooking}
                                onReject={rejectBooking}
                            />
                })
            }
            {
                isLoading && <VStack><Spinner /></VStack>
            }
        </div>
    )
}

export default RequestList