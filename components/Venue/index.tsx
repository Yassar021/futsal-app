import React, { useEffect } from "react";
import { Box, Container, Spinner } from "@chakra-ui/react"
import LayoutUser from "../../layout/LayoutUser"
import CardVenue from "./cardVenue"
import { FetchStatus } from "../../types/type";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchVanues } from "../../store/reducers/vanue";

const Venue = () => {
    const {status, vanues} = useAppSelector(state => state.vanue)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchVanues())
    },[])
    
    return(
        <LayoutUser pageTitle={'Venue'}>
            <Container maxW='6xl'>
                {
                    status === FetchStatus.LOADING ? 
                    <Spinner />
                    :
                    vanues.map((vanue,key) => (
                        <CardVenue key={vanue.id} {...vanue} />
                    ))
                }
            </Container>
        </LayoutUser>
    )
}

export default Venue