import React from 'react'
import { Container, Box } from "@chakra-ui/react"
import LayoutVenue from "../../layout/LayoutVenue"
import EditForm from "./edit/editForm";

function EditVenue() {

    return (
        <LayoutVenue pageTitle={'Home'}>
            <Container maxW='2xl'>
            <Box padding={"30px"} mb='60px' borderRadius={'5px'} shadow='xl' bgColor={'#fff'} width={'100%'}>
                <EditForm />
            </Box>
            </Container>
        </LayoutVenue>
    )
}

export default EditVenue