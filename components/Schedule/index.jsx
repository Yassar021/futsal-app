import { Box, Container, Flex } from "@chakra-ui/react"
import LayoutUser from "../../layout/LayoutUser"
import CardMatch from "../Homepage/cardMatch"

const Schedule = () => {
    return(
        <LayoutUser pageTitle={'Schedule'}>
            <Container maxW='6xl'>
                <Flex direction={'column'} gap='40px' pb='40px'>
                    <CardMatch />
                    <CardMatch />
                    <CardMatch />
                    <CardMatch />
                </Flex>
            </Container>
        </LayoutUser>
    )
}

export default Schedule