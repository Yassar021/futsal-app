import React from 'react'
import LayoutUser from '../../../layout/LayoutUser'
import { Box, Container } from '@chakra-ui/react'
import EditForm from './edit-form'

function TeamEdit() {
    return (
        <LayoutUser pageTitle={"Edit Team"}>
            <Container maxW="6xl">
                <Box padding={"30px"} mb='60px' borderRadius={'5px'} shadow='xl' bgColor={'#fff'} width={'100%'}>
                    <EditForm />
                </Box>
            </Container>
        </LayoutUser>
    )
}

export default TeamEdit