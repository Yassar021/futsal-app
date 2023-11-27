import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { Spinner } from '@chakra-ui/react';
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
        const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

        if (scrollPos.y === scrollTop) {
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
                isLoading && <Spinner />
            }
        </div>
    )
}

export default BookingList