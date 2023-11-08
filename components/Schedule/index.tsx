import React, { useEffect } from "react";
import { Box, Container, Flex, Spinner } from "@chakra-ui/react"
import LayoutUser from "../../layout/LayoutUser"
import CardMatch from "../Homepage/cardMatch"
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loadInitialList } from "../../store/reducers/schedule";

const Schedule = () => {
    const {list, isLoading} = useAppSelector(state => state.schedule)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadInitialList());
    },[])

    return(
        <LayoutUser pageTitle={'Schedule'}>
            <Container maxW='6xl'>
                {
                    isLoading ?
                    <Spinner />
                    :
                    <Flex direction={'column'} gap='40px' pb='40px'>
                        {
                            list.map((schedule,key) => {
                                return <CardMatch {...schedule} />
                            })
                        }        
                    </Flex>

                }
            </Container>
        </LayoutUser>
    )
}

export default Schedule