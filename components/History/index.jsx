import { Container } from "@chakra-ui/react"
import LayoutUser from "../../layout/LayoutUser"
import CardHistory from "./cardHistory"

const History = () => {
    return (
        <LayoutUser pageTitle={'History'}>
            <Container maxW='6xl'>
                <CardHistory />
            </Container>
        </LayoutUser>
    )
}

export default History