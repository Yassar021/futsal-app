import { Box, Button, Flex, HStack, Image, Stack, Text } from "@chakra-ui/react"

const CardRequest = () => {
    return(
        <Box mt='30px' py='35px' px='50px' width={'100%'} height={'210px'} borderRadius={'5px'} bgColor='#F3F4F7' boxShadow={'0px 4px 4px 0px rgba(0, 0, 0, 0.15)'}>
            <Flex direction={'row'} justifyContent={'space-between'}>
                <HStack spacing='32px'>
                    <Image borderRadius={'100%'} width={'150px'} height='150px' src='/bg-team.png' alt='bg-team' />
                    <Box my='auto'>
                        <Text mb='20px' fontSize={'18px'} fontWeight='600' letterSpacing={'0.02em'} color='#1B262C'>Valencia CF </Text>
                        <Text fontSize={'16px'} fontWeight='400' letterSpacing={'0.02em'} color='#1B262C'>11 November 2023</Text>
                        <Text fontSize={'16px'} fontWeight='400' letterSpacing={'0.02em'} color='#1B262C'>19:00 - 20:00</Text>
                        <Text fontSize={'16px'} fontWeight='400' letterSpacing={'0.02em'} color='#1B262C'> Whatsapp : +62 8242-9800-2022</Text>
                    </Box>
                </HStack>
                <Box my='auto'>
                    <Stack direction={'row'}>
                        <Button  width='100px' height={'40px'} borderRadius={'2px'} bgColor={'#2DCC70'} color='#fff' _hover={{ bg: '#2DCC70' }}
                            _active={{
                                bg: '#2DCC70',
                                transform: 'scale(0.98)',
                            }} mr={3}>
                            Accept
                        </Button>
                        <Button  width='100px' height={'40px'} borderRadius={'2px'} bgColor={'#EB5757'} color='#fff' _hover={{ bg: '#EB5757' }}
                            _active={{
                                bg: '#EB5757',
                                transform: 'scale(0.98)',
                            }} mr={3}>
                            Reject
                        </Button>
                    </Stack>
                </Box>
            </Flex>
        </Box>
    )
}

export default CardRequest