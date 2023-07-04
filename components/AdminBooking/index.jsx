import { Container } from "@chakra-ui/react"
import LayoutVenue from "../../layout/LayoutVenue"
import CardBooking from "./cardBooking"

const AdminBooking = () => {
    return(
        <LayoutVenue pageTitle={'Booking List'}>
            <Container maxW={'6xl'}>
                <CardBooking />
            </Container>
        </LayoutVenue>
    )
}

export default AdminBooking