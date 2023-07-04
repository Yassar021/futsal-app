import { Container, Flex } from "@chakra-ui/react"
import CardMatch from "../Homepage/cardMatch"
import LayoutVenue from "../../layout/LayoutVenue"


const AdminSparing = () => {
    return(
        <LayoutVenue pageTitle={'Sparing List'}>
            <Container maxW='6xl'>
                <Flex direction={'column'} gap='40px' pb='40px'>
                    <CardMatch />
                    <CardMatch />
                </Flex>
            </Container>
        </LayoutVenue>
    )
}

export default AdminSparing