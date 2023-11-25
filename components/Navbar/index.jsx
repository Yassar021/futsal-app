import { Box, Button, Container, Flex, Image, Link, Stack, Text } from "@chakra-ui/react"
import NextLink from 'next/link'
import { useLogout } from "../../services/AuthProvider/hooks"
import { useRouter } from "next/router"
import { useCallback, useEffect } from "react"

const Navbar = () => {
    const logout = useLogout()
    const router = useRouter()

    const isActive = useCallback((path) => {
        return path === router.asPath;
    },[router.asPath])

    const handleLogout = () => {
        logout()
    }
    return (
        <>
            <Box h='100px' w='100%' py='20px'>
                <Container maxW={'6xl'}>
                    <Flex direction={'row'} gap='120px' justifyContent={'space-between'}>
                        <Image width={'60px'} height='60px' borderRadius={'100%'} src='/futsal-ico.png' alt='Icon Futsal' />
                        <Stack my='auto' direction={'row'} spacing='40px'>
                            <Link as={NextLink} href="/Home">
                                <Text fontSize={'18px'} fontWeight='500' color={isActive("/Home") ? '#1B262C' : '#A0A8B1'}>Home</Text>
                            </Link>
                            <Link as={NextLink} href="/Inbox">
                                <Text fontSize={'18px'} fontWeight='500' color={isActive("/Inbox") ? '#1B262C' : '#A0A8B1'}>Inbox</Text>
                            </Link>
                            <Link as={NextLink} href="/FindTeam">
                                <Text fontSize={'18px'} fontWeight='500' color={isActive("/FindTeam") ? '#1B262C' : '#A0A8B1'}>Find Team</Text>
                            </Link>
                            <Link as={NextLink} href="/Schedule">
                                <Text fontSize={'18px'} fontWeight='500' color={isActive("/Schedule") ? '#1B262C' : '#A0A8B1'}>Schedule</Text>
                            </Link>
                            <Link as={NextLink} href="/History">
                                <Text fontSize={'18px'} fontWeight='500' color={isActive("/History") ? '#1B262C' : '#A0A8B1'}>History</Text>
                            </Link>
                            <Link as={NextLink} href="/Venue">
                                <Text fontSize={'18px'} fontWeight='500' color={isActive("/Venue") ? '#1B262C' : '#A0A8B1'}>Venue</Text>
                            </Link>
                        </Stack>
                        <Box my='auto'>
                            <Button onClick={handleLogout} bgColor={'#0F4C75'} color='#fff' size='md' _hover={{ bg: '#0F4C75' }}
                                _active={{
                                    bg: '#0F4C75',
                                    transform: 'scale(0.98)',
                                    borderColor: '#0F4C75',
                                }}>
                                Keluar
                            </Button>
                        </Box>
                    </Flex>
                </Container>
            </Box>

        </>
    )
}

export default Navbar