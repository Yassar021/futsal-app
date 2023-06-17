import { Box, Container } from "@chakra-ui/react"
import LayoutUser from "../../layout/LayoutUser"
import CardVenue from "./cardVenue"

const Venue = () => {
    return(
        <LayoutUser pageTitle={'Venue'}>
            <Container maxW='6xl'>
                <CardVenue />
            </Container>
        </LayoutUser>
    )
}

export default Venue