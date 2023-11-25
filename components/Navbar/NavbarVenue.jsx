import { Box, Button, Container, Flex, Image, Link, Stack, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useLogout } from "../../services/AuthProvider/hooks"
import { useCallback } from "react"

const NavbarVenue = () => {
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
                            <Link href="/venue_admin">
                                <Text fontSize={'18px'} fontWeight='500' color={isActive("/venue_admin") ? '#1B262C' : '#A0A8B1'}>Home</Text>
                            </Link>
                            <Link href="/venue_admin/booking_request">
                                <Text fontSize={'18px'} fontWeight='500' color={isActive("/venue_admin/booking_request") ? '#1B262C' : '#A0A8B1'}>Booking Request</Text>
                            </Link>
                            <Link href="/AdminSparing">
                                <Text fontSize={'18px'} fontWeight='500' color={isActive("/venue_admin") ? '#1B262C' : '#A0A8B1'}>Sparing List</Text>
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

export default NavbarVenue