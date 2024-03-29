import { Box, Button, Center, Flex, HStack, Image, Text } from "@chakra-ui/react"
import React from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { VenueInfo, AccountType } from "../../types/user"
import { useRouter } from "next/router"

const CardVenue = () => {
    const router = useRouter()
    const venue: VenueInfo | null = useSelector((state: RootState) => {
        if (state.account.userInfo?.type === AccountType.VENUE) {
            return state.account.userInfo.data
        }
        return null
    })
    return (
        <Box mb='60px' borderRadius={'5px'} shadow='xl' bgColor={'#fff'} width={'100%'} height='310px'>
            <Box borderRadius={'5px'} width={'100%'} height='60px' bgColor='#1B262C' py='16px'>
                <Center>
                    <Text fontWeight={'500'} fontSize='18px' color='#fff'>My Venue</Text>
                </Center>
            </Box>
            <Flex justifyContent={'center'} direction={'row'} mt='40px' gap='40px' >
                <Image borderRadius={'100%'} width={'150px'} height='150px' src={venue?.profil_picture} alt='bg-team' />
                <Box my='auto'>
                    <Text mb='20px' fontSize={'18px'} fontWeight='600' letterSpacing={'0.02em'} color='#1B262C'>{venue?.name}</Text>
                    <Text fontSize={'16px'} fontWeight='400' letterSpacing={'0.02em'} color='#1B262C'> Address : {venue?.address}</Text>
                    <Text fontSize={'16px'} fontWeight='400' letterSpacing={'0.02em'} color='#1B262C'> Whatsapp : {venue?.phone}</Text>
                </Box>
            </Flex>
            <Center>
                <HStack>

                    <Button
                        onClick={() => router.push("/venue_admin/edit")}
                        color='#fff'
                        fontFamily={'DM Sans'}
                        bgColor={'#0F4C75'}
                        width='140px'
                        height={'40px'}
                        _hover={{ bg: '#0F4C75' }}
                        fontSize={'14px'}
                        fontWeight={'500'}
                        _active={{
                            bg: '#0F4C75',
                            transform: 'scale(0.98)',
                        }}
                    >
                        Edit
                    </Button>

                    <Button
                        onClick={() => router.push("/venue_admin/fields")}
                        color='#fff'
                        fontFamily={'DM Sans'}
                        bgColor={'#0F4C75'}
                        width='140px'
                        height={'40px'}
                        _hover={{ bg: '#0F4C75' }}
                        fontSize={'14px'}
                        fontWeight={'500'}
                        _active={{
                            bg: '#0F4C75',
                            transform: 'scale(0.98)',
                        }}
                    >
                        Atur Lapangan
                    </Button>
                </HStack>
            </Center>
        </Box>
    )
}

export default CardVenue