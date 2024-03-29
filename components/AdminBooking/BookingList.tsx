import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { Spinner, VStack } from '@chakra-ui/react';
import CardList from './cardList';
import { fetchInitialList, fetchNextPageList } from '../../store/reducers/bookingList';
import useScroll from '../../utils/useScroll';

function BookingList() {

    const { list,isLoading } = useAppSelector(state => state.bookingList);
    const dispatch = useAppDispatch();
    const scrollPos = useScroll();

    const fetchData = () => {
        dispatch(fetchNextPageList());
    }


    
    useEffect(() => {
        dispatch(fetchInitialList())
    },[])

    useEffect(() => {
        const { scrollHeight, offsetHeight } = document.documentElement;

        if (((scrollPos.y + offsetHeight) >= scrollHeight) && !isLoading) {
            fetchData()
        }

    },[scrollPos.y])

    return (
        <div>
            {
                list.map((item) => (
                    <CardList key={item.id} request={item} />
                ))
            }
            {
                isLoading && <VStack><Spinner /></VStack>
            }
        </div>
    )
}

export default BookingList