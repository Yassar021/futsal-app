import { Box, Button, Center, Editable, EditablePreview, EditableTextarea, Flex, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, TableContainer, Text, useDisclosure } from "@chakra-ui/react"
import { useState } from "react"
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css';

// https://www.npmjs.com/package/react-calendar-datetime-picker

const ModalVenue = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [value, onChange] = useState(new Date());

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
                    Cek Jadwal
                </Button>
                <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
                    <ModalOverlay />
                        <ModalContent>
                            <ModalHeader pb='60px'>Jadwal lapangan Jogja Futsal</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Calendar width='100%' onChange={onChange} value={value} />
                            </ModalBody>
                            <ModalFooter>
                                <Button 
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
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                </Modal>
        
        </>
    )
}

export default ModalVenue