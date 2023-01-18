import { Container, SimpleGrid } from "@chakra-ui/react"
import LayoutUser from "../../layout/LayoutUser"
import CardFind from "./cardFind"

const FindTeam = () => {
    return(
        <LayoutUser pageTitle={'Find Team'}>
            <Container maxW='6xl'>
                <SimpleGrid columns={{sm:1,md:2}} spacing='20px'>
                    <CardFind />
                    <CardFind />
                    <CardFind />
                </SimpleGrid>
            </Container>
        </LayoutUser>
    )
}

export default FindTeam