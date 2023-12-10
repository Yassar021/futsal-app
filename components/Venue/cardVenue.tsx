import React from "react";
import { Box, Button, Center, Flex, Image, Link, Stack, Text, VStack, useDisclosure } from "@chakra-ui/react"
import ModalVenue from './modalVenue'
import WhatsappLink from "../Commons/WhatsappLink";

type Props = {
    id: number;
    name: string;
    owner_name: string;
    phone: string;
    address: string;
    profil_picture: string;
    closing_hour: number;
    opening_hour: number;
}

const CardVenue = ({ id, name, owner_name, phone, address, profil_picture, closing_hour, opening_hour }: Props) => {
    const { isOpen: isOpenSlots, onOpen: openSlots, onClose: closeSlots } = useDisclosure()

    return (
        <Box mb='60px' borderRadius={'5px'} shadow='xl' bgColor={'#fff'} width={'100%'} height='310px'>
            <Box borderRadius={'5px'} width={'100%'} height='60px' bgColor='#1B262C' py='16px'>
                <Center>
                    <Text fontWeight={'500'} fontSize='18px' color='#fff'>{name}</Text>
                </Center>
            </Box>
            <Flex justifyContent={'center'} direction={'row'} mt='40px' gap='40px' >
                <Image borderRadius={'100%'} width={'150px'} height='150px' src={profil_picture} alt='bg-team' />
                <VStack alignItems={'flex-start'} spacing='10px' my='auto'>
                    <Text fontSize={'18px'} fontWeight='700' letterSpacing={'0.02em'} color='#1B262C'>{name}</Text>
                    <Text fontSize={'16px'} fontFamily='400' letterSpacing={'0.02em'} color='#1B262C'>{address}</Text>
                    <WhatsappLink phone={phone} />
                    <Button
                        onClick={openSlots}
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
                        Cek Jadwal
                    </Button>
                    {
                        isOpenSlots
                        &&
                        <ModalVenue
                            onClose={closeSlots}
                            venueId={id}
                            venueName={name}
                            closing_hour={closing_hour}
                            opening_hour={opening_hour}
                        />
                    }
                </VStack>
            </Flex>
        </Box>
    )
}

export default CardVenue