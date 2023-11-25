import { Box, Center, Flex, Image, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react"
import CardList from "./cardList"
import CardRequest from "./cardRequest"
import RequestList from "./RequestList"

const CardBooking = () => {
    return( 
        <Box mb='60px' borderRadius={'5px'} shadow='xl' bgColor={'#fff'} width={'100%'} height='800px'>
            <Box borderRadius={'5px'} width={'100%'} height='60px' bgColor='#1B262C' py='16px'>
                <Center>
                    <Text fontWeight={'500'} fontSize='18px' color='#fff'>My Team</Text>
                </Center>
            </Box>
            <Flex px='60px' justifyContent={'center'} direction={'column'} mt='40px' gap='40px' >
                <Tabs position="relative" variant="unstyled">
                    <TabList>
                        <Tab>Request Booking List</Tab>
                        <Tab>Booking List</Tab>
                    </TabList>
                    <TabIndicator
                        mt="-1.5px"
                        height="2px"
                        bg="#1B262C"
                        borderRadius="1px"
                    />
                    <TabPanels>
                        <TabPanel>
                            <RequestList />
                        </TabPanel>
                        <TabPanel>
                            <CardList final={'Accepted'} />
                            <CardList final={'Rejected'} />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Flex>
        </Box>
    )
}

export default CardBooking