import { Container, SimpleGrid } from "@chakra-ui/react"
import LayoutUser from "../../layout/LayoutUser"

const FindTeam = () => {
    return(
        <LayoutUser pageTitle={'Find Team'}>
            <Container maxW='6xl'>
                <SimpleGrid columns={{sm:1,md:2}} spacing='20px'>
                    
                </SimpleGrid>
            </Container>
        </LayoutUser>
    )
}

export default FindTeam