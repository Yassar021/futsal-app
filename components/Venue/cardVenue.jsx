import { Box, Center, Flex, Image, Text, VStack } from "@chakra-ui/react"
import ModalVenue from './modalVenue'

const CardVenue = () => {
    return( 
        <Box mb='60px' borderRadius={'5px'} shadow='xl' bgColor={'#fff'} width={'100%'} height='310px'>
            <Box borderRadius={'5px'} width={'100%'} height='60px' bgColor='#1B262C' py='16px'>
                <Center>
                    <Text fontWeight={'500'} fontSize='18px' color='#fff'>Jogja Futsal</Text>
                </Center>
            </Box>
            <Flex justifyContent={'center'} direction={'row'} mt='40px' gap='40px' >
                <Image borderRadius={'100%'} width={'150px'} height='150px' src='/bg-team.png' alt='bg-team' />
                <VStack alignItems={'flex-start'} spacing='10px' my='auto'>
                    <Text  fontSize={'18px'} fontWeight='700' letterSpacing={'0.02em'} color='#1B262C'>Jogja Futsal</Text>
                    <Text fontSize={'16px'} fontFamily='400' letterSpacing={'0.02em'} color='#1B262C'>Jl. Pumorow No.2, Loka, Kec. Ujung Bulu, Kabupaten Bulukumba, Sulawesi Selatan 92511</Text>
                    
                    <Text  fontSize={'18px'} fontWeight='400' letterSpacing={'0.02em'} color='#1B262C'>Rp. 100.000, / Jam</Text>
                    <Text  fontSize={'18px'} fontWeight='400' letterSpacing={'0.02em'} color='#1B262C'>Setiap Hari (Kecuali Hari raya), 09.00-00.00</Text>
                    <ModalVenue />
                </VStack>
            </Flex>
        </Box>
    )
}

export default CardVenue