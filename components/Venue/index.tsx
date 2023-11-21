import React, { useEffect } from "react";
import { Box, Container, Spinner } from "@chakra-ui/react"
import LayoutUser from "../../layout/LayoutUser"
import CardVenue from "./cardVenue"
import { FetchStatus } from "../../types/type";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchInitialVenueList, fetchVenueNextList } from "../../store/reducers/venue";
import useScroll from "../../utils/useScroll";

const Venue = () => {
    const {list, isLoading} = useAppSelector(state => state.venue)
    const dispatch = useAppDispatch()
    const scrollPos = useScroll();

    useEffect(() => {
        dispatch(fetchInitialVenueList())
    },[])

    useEffect(() => {
        const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

        if (scrollPos.y === scrollTop) {
            dispatch(fetchVenueNextList());
        }

    },[scrollPos.y])
    
    return(
        <LayoutUser pageTitle={'Venue'}>
            <Container maxW='6xl'>
                {
                    list.map((vanue,key) => (
                        <CardVenue key={vanue.id} {...vanue} />
                    ))
                }
                {
                    isLoading && <Spinner />
                }
            </Container>
        </LayoutUser>
    )
}

export default Venue