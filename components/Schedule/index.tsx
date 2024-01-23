import React, { useEffect } from "react";
import { Box, Container, Flex, Spinner, VStack } from "@chakra-ui/react"
import LayoutUser from "../../layout/LayoutUser"
import CardMatch from "../Homepage/cardMatch"
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchNextPage, loadInitialList } from "../../store/reducers/schedule";
import useScroll from "../../utils/useScroll";

const Schedule = () => {
    const {list, isLoading} = useAppSelector(state => state.schedule)
    const dispatch = useAppDispatch();
    const scrollPos = useScroll();

    const fetchData = () => {
        dispatch(fetchNextPage());
    }

    useEffect(() => {
        dispatch(loadInitialList());
    },[])

    useEffect(() => {
        const { scrollHeight, offsetHeight } = document.documentElement;

        if (((scrollPos.y + offsetHeight) >= scrollHeight) && !isLoading) {
            fetchData()
        }

    },[scrollPos.y])

    return(
        <LayoutUser pageTitle={'Schedule'}>
            <Container maxW='6xl'>
                {
                    isLoading ?
                    <VStack><Spinner /></VStack>
                    :
                    <Flex direction={'column'} gap='40px' pb='40px'>
                        {
                            list.map((schedule,key) => {
                                return <CardMatch key={key} {...schedule} />
                            })
                        }        
                    </Flex>

                }
            </Container>
        </LayoutUser>
    )
}

export default Schedule