import { Container, SimpleGrid } from "@chakra-ui/react"
import LayoutUser from "../../layout/LayoutUser"
import CardInbox from "./cardInbox"

const Inbox = () => {
    return(
        <LayoutUser pageTitle={'Inbox'}>
            <Container maxW='6xl'>
                <SimpleGrid columns={{sm:1,md:2}} spacing='20px'>
                    <CardInbox />
                    <CardInbox />
                </SimpleGrid>
            </Container>
        </LayoutUser>
    )
}

export default Inbox