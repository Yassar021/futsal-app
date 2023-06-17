import { Box, Button, Center, Flex, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Table, TableContainer, Tbody, Td, Text, Tr, useDisclosure } from "@chakra-ui/react"

const CardMatch = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <Box borderRadius={'5px'} shadow='xl' bgColor={'#fff'} width={'100%'} height='310px'>
            <Box borderRadius={'5px'} width={'100%'} height='60px' bgColor='#1B262C' py='16px'>
                <Center>
                    <Text fontWeight={'500'} fontSize='18px' color='#fff'>Next Match</Text>
                </Center>
            </Box>
            <Flex justifyContent={'center'} direction={'row'} pt='45px' pb='30px' gap='40px' >

                <Flex direction={'row'} gap='24px'>
                    <Image width={'100px'} height='100px' src='fcb-team.png' alt='FCB' />
                    <Box my='auto'>
                        <Text mb='8px' fontSize={'18px'} fontWeight='700' color='#1B262C'>FC Barcelona</Text>
                        <Button bgColor={'#fff'} onClick={onOpen}>
                            <Text fontSize={'14px'} fontWeight='400' color='#959FA8'>View Bio Team</Text>
                        </Button>
                        <Modal isOpen={isOpen} onClose={onClose} sizes={'lg'}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Biografi Team</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <TableContainer>
                                        <Table variant='unstyled'>
                                            <Tbody py='10px'>
                                                <Tr>
                                                    <Td>
                                                        <Text fontSize={'16px'} fontWeight='600' color='#1B262C'>Name Team</Text>
                                                        <Text my='20px' fontSize={'16px'} fontWeight='600' color='#1B262C'>Coach Name</Text>
                                                        <Text mb='20px' fontSize={'16px'} fontWeight='600' color='#1B262C'>Address Team</Text>
                                                        <Text fontSize={'16px'} fontWeight='600' color='#1B262C'>Biografi</Text>
                                                    </Td>
                                                    <Td>
                                                        <Text fontSize={'16px'} fontWeight='500' color='#1B262C'>Fc Barcelona</Text>
                                                        <Text my='20px' fontSize={'16px'} fontWeight='500' color='#1B262C'>Pep Guardiola</Text>
                                                        <Text mb='20px' fontSize={'16px'} fontWeight='500' color='#1B262C'>Lorem ipsum dolor sit amet consectetur.</Text>
                                                        <Text fontSize={'16px'} fontWeight='500' color='#1B262C'> Lorem Ipsum has been the industry standard dummy</Text>
                                                    </Td>
                                                </Tr>
                                            </Tbody>
                                        </Table>
                                    </TableContainer>
                                </ModalBody>

                                <ModalFooter>
                                    <Button bgColor={'#EB5757'} color='#fff' mr={3} _hover={{ bg: '#EB5757' }}
                                        _active={{
                                            bg: '#EB5757',
                                            transform: 'scale(0.98)',
                                        }} onClick={onClose}>
                                        Close
                                    </Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </Box>
                </Flex>

                <Box my='auto'>
                    <Text fontSize={'14px'} fontWeight='500' color='#172C41'>VS</Text>
                </Box>

                <Flex direction={'row'} gap='24px'>
                    <Image width={'100px'} height='100px' src='rma-team.png' alt='rma' />
                    <Box my='auto'>
                        <Text mb='8px' fontSize={'18px'} fontWeight='700' color='#1B262C'>Real Madrid</Text>
                        <Button bgColor={'#fff'} onClick={onOpen}>
                            <Text fontSize={'14px'} fontWeight='400' color='#959FA8'>View Bio Team</Text>
                        </Button>
                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Biografi Team</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <TableContainer>
                                        <Table variant='unstyled'>
                                            <Tbody py='10px'>
                                                <Tr>
                                                    <Td>
                                                        <Text fontSize={'16px'} fontWeight='600' color='#1B262C'>Name Team</Text>
                                                        <Text my='20px' fontSize={'16px'} fontWeight='600' color='#1B262C'>Coach Name</Text>
                                                        <Text mb='20px' fontSize={'16px'} fontWeight='600' color='#1B262C'>Address Team</Text>
                                                        <Text fontSize={'16px'} fontWeight='600' color='#1B262C'>Biografi</Text>
                                                    </Td>
                                                    <Td>
                                                        <Text fontSize={'16px'} fontWeight='500' color='#1B262C'>Real Madrid</Text>
                                                        <Text my='20px' fontSize={'16px'} fontWeight='500' color='#1B262C'>Jose Mourinho</Text>
                                                        <Text mb='20px' fontSize={'16px'} fontWeight='500' color='#1B262C'>Lorem ipsum dolor sit amet consectetur.</Text>
                                                        <Text fontSize={'16px'} fontWeight='500' color='#1B262C'> Lorem Ipsum has been the industry standards</Text>
                                                    </Td>
                                                </Tr>
                                            </Tbody>
                                        </Table>
                                    </TableContainer>
                                </ModalBody>

                                <ModalFooter>
                                    <Button bgColor={'#EB5757'} color='#fff' _hover={{ bg: '#EB5757' }}
                                        _active={{
                                            bg: '#EB5757',
                                            transform: 'scale(0.98)',
                                        }} mr={3} onClick={onClose}>
                                        Close
                                    </Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </Box>
                </Flex>
            </Flex>

            <Center>
                <Flex direction='row' gap='20px'>
                    <Stack direction="row" spacing='12px'>
                        <Stack my='auto'>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#A0A8B1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 6V12L16 14" stroke="#A0A8B1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Stack>
                        <Box>
                            <Text fontSize={'16px'} fontWeight='500' color='#A0A8B1'>12 October 2022</Text>
                            <Text fontSize={'16px'} fontWeight='500' color='#A0A8B1'>5:00 PM</Text>
                        </Box>
                    </Stack>

                    <Stack direction="row" spacing='12px'>
                        <Stack my='auto'>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="#959FA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#959FA8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Stack>
                        <Box>
                            <Text fontSize={'16px'} fontWeight='500' color='#A0A8B1'>Lapangan Futsal Puri</Text>
                            <Text fontSize={'16px'} fontWeight='500' color='#A0A8B1'>Jl. Pahlawan No. 2 Bulukumba</Text>
                        </Box>
                    </Stack>
                </Flex>
            </Center>

        </Box>
    )
}

export default CardMatch