import { Box, Center, Flex, Image, Text } from "@chakra-ui/react"

const CardHome = () => {
    return( 
        <Box mb='60px' borderRadius={'5px'} shadow='xl' bgColor={'#fff'} width={'100%'} height='310px'>
            <Box borderRadius={'5px'} width={'100%'} height='60px' bgColor='#1B262C' py='16px'>
                <Center>
                    <Text fontWeight={'500'} fontSize='18px' color='#fff'>My Team</Text>
                </Center>
            </Box>
            <Flex justifyContent={'center'} direction={'row'} mt='40px' gap='40px' >
                <Image borderRadius={'100%'} width={'150px'} height='150px' src='/bg-team.png' alt='bg-team' />
                <Box my='auto'>
                    <Text mb='20px' fontSize={'18px'} fontFamily='700' letterSpacing={'0.02em'} color='#1B262C'>FC BARCELONA</Text>
                    <Text fontSize={'16px'} fontFamily='400' letterSpacing={'0.02em'} color='#1B262C'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
                </Box>
            </Flex>
        </Box>
    )
}

export default CardHome