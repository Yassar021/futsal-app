import { Box, Button, Container, Flex, Image, Link, Stack, Text } from "@chakra-ui/react"

const NavbarVenue = () => {
    return (
        <>
            <Box h='100px' w='100%' py='20px'>
                <Container maxW={'6xl'}>
                    <Flex direction={'row'} gap='120px' justifyContent={'space-between'}>
                        <Image width={'60px'} height='60px' borderRadius={'100%'} src='/futsal-ico.png' alt='Icon Futsal' />
                        <Stack my='auto' direction={'row'} spacing='40px'>
                            <Link href="/AdminVenue">
                                <Text fontSize={'18px'} fontWeight='500' color={'#1B262C'}>Home</Text>
                            </Link>
                            <Link href="/AdminBooking">
                                <Text fontSize={'18px'} fontWeight='500' color={'#A0A8B1'}>Booking List</Text>
                            </Link>
                            <Link href="/AdminSparing">
                                <Text fontSize={'18px'} fontWeight='500' color={'#A0A8B1'}>Sparing List</Text>
                            </Link>
                        </Stack>
                        <Box my='auto'>
                            <Link href="/">
                                <Button bgColor={'#0F4C75'} color='#fff' size='md' _hover={{ bg: '#0F4C75' }}
                                    _active={{
                                        bg: '#0F4C75',
                                        transform: 'scale(0.98)',
                                        borderColor: '#0F4C75',
                                    }}>
                                    Keluar
                                </Button>
                            </Link>
                        </Box>
                    </Flex>
                </Container>
            </Box>

        </>
    )
}

export default NavbarVenue