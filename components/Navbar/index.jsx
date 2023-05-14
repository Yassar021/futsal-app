import { Box, Container, Flex, Image, Link, Stack, Text } from "@chakra-ui/react"

const Navbar = () => {
    return (
        <>
            <Box h='100px' w='100%' py='20px'>
                <Container maxW={'6xl'}>
                    <Flex direction={'row'} gap='120px'>
                        <Image width={'60px'} height='60px' borderRadius={'100%'} src='/futsal-ico.png' alt='Icon Futsal' />
                        <Stack my='auto' direction={'row'} spacing='40px'>
                            <Link href="/Home">
                                <Text fontSize={'18px'} fontWeight='500' color={'#1B262C'}>Home</Text>
                            </Link>
                            <Link href="/Inbox">
                                <Text fontSize={'18px'} fontWeight='500' color={'#A0A8B1'}>Inbox</Text>
                            </Link><Link href="/FindTeam">
                                <Text fontSize={'18px'} fontWeight='500' color={'#A0A8B1'}>Find Team</Text>
                            </Link><Link href="/Schedule">
                                <Text fontSize={'18px'} fontWeight='500' color={'#A0A8B1'}>Schedule</Text>
                            </Link>
                            <Link href="/History">
                                <Text fontSize={'18px'} fontWeight='500' color={'#A0A8B1'}>History</Text>
                            </Link>
                        </Stack>
                    </Flex>
                </Container>
            </Box>

        </>
    )
}

export default Navbar