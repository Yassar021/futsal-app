import { Container, SimpleGrid } from "@chakra-ui/react"
import LayoutUser from "../../layout/LayoutUser"
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import ChallengeReceived from "./ChallengeReceived"
import ChallengeSent from "./ChallengeSent"

const Inbox = () => {
    return (
        <LayoutUser pageTitle={'Inbox'}>
            <Container maxW='6xl'>
                <Tabs isFitted >
                    <TabList>
                        <Tab>Tantangan Masuk</Tab>
                        <Tab>Tantangan Keluar</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <ChallengeReceived />
                        </TabPanel>
                        <TabPanel>
                            <ChallengeSent />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Container>
        </LayoutUser>
    )
}

export default Inbox