import { Container } from "@chakra-ui/react"
import LayoutVenue from "../../layout/LayoutVenue"
import CardVenue from "./cardVenue"

const AdminVenue = () => {
    return(
        <LayoutVenue pageTitle={'Home'}>
            <Container maxW='6xl'>
                <CardVenue />
            </Container>
        </LayoutVenue>
    )
}

export default AdminVenue