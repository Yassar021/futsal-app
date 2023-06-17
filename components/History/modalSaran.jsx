import { Box, Button, Center, Editable, EditablePreview, EditableTextarea, Flex, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, TableContainer, Text, useDisclosure } from "@chakra-ui/react"

const ModalSaran = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return(
        <>
                <Button     
                    onClick={onOpen}
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
                    Masukan dan saran
                </Button>
                <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
                    <ModalOverlay />
                        <ModalContent>
                            <ModalHeader pb='60px'>Masukkan dan Saran</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Flex direction={'column'} gap='64px'>
                                    <Box>
                                        <Text mb='16px' fontSize={'18px'} fontWeight='700' color='#1B262C'>FC Barcelona</Text>
                                        <Box padding={'20px'} width={'100%'} height={'150px'} bgColor={'#D7DAE8'}>
                                            <Text fontSize={'14px'} fontWeight='700' color='#1B262C'>Sebaiknya kamu belajar lebih giat daripada menonton televisi terlalu lama.</Text>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Text mb='16px' fontSize={'18px'} fontWeight='700' color='#1B262C'>Real Madrid</Text>
                                        <Box padding={'20px'} width={'100%'} height={'150px'} bgColor={'#D7DAE8'}>
                                            <Text fontSize={'14px'} fontWeight='700' color='#1B262C'>Sebaiknya kamu belajar lebih giat daripada menonton televisi terlalu lama.</Text>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Editable 
                                            p='4px'
                                            border={'2px solid #D7DAE8'} 
                                            borderRadius={'4px'} 
                                            defaultValue='Masukkan Pesan disini'
                                            height={'80px'}
                                        >
                                            <EditablePreview />
                                            <EditableTextarea />
                                        </Editable>
                                        <HStack justifyContent={'right'} spacing='6px' mt='20px'>
                                            <Button bgColor={'#EB5757'} color='#fff' _hover={{ bg: '#EB5757' }}
                                                _active={{
                                                    bg: '#EB5757',
                                                    transform: 'scale(0.98)',
                                                }} mr={3} onClick={onClose}>
                                                Cancel
                                            </Button>
                                            <Button colorScheme='green'>Simpan</Button>
                                        </HStack>
                                    </Box>
                                </Flex>
                            </ModalBody>
                            <ModalFooter>
                                {/* <Button 
                                    bgColor={'#EB5757'} 
                                    color='#fff' 
                                    mr={3} 
                                    _hover={{ bg: '#EB5757' }}
                                    _active={{
                                        bg: '#EB5757',
                                        transform: 'scale(0.98)',
                                    }} 
                                    onClick={onClose}>
                                    Close
                                </Button> */}
                            </ModalFooter>
                        </ModalContent>
                </Modal>
        
        </>
    )
}

export default ModalSaran