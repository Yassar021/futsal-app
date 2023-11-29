import { Button, Input, Modal, ModalBody, ModalCloseButton, Box, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Spinner, Stack, Table, TableContainer, Tbody, Td, Text, Tr } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { getOptionFields } from '../../services/API/fields';
import { CreateChallengeRequest } from '../../types/request';
import TimePicker from '../Commons/TimePicker';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    teamName: string;
    teamId: number;
    onConfirm: (payload: CreateChallengeRequest) => Promise<any>;
}

function ChallengeRequestModal({ isOpen, onClose, onConfirm, teamName, teamId }: Props) {
    const [fields, setFields] = useState<{id: number, label: string}[]>([]);

    const [date,setDate] = useState("");
    const [time, setTime] = useState("");
    const [fieldId,setFieldId] = useState(0);
    const [message,setMessage] = useState("");
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        getOptionFields().then((data) => {
            setFields(data);
        })
    },[])

    const handleConfirm = () => {
        let payload = {
            team_id: teamId.toString(),
            datetime: `${date} ${time}`,
            field_id: fieldId.toString(),
            message: message
        }

        setLoading(true);
        onConfirm(payload).finally(() => {
            setLoading(false)
        })
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Kirim Tantangan ke {teamName}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <TableContainer>
                        <Table variant="unstyled">
                            <Tbody py="10px">
                                <Tr>
                                    <Td>
                                        <Text
                                            fontSize={"16px"}
                                            fontWeight="600"
                                            color="#1B262C"
                                        >
                                            Date
                                        </Text>
                                        <Text
                                            my="20px"
                                            fontSize={"16px"}
                                            fontWeight="600"
                                            color="#1B262C"
                                        >
                                            Time
                                        </Text>
                                        <Text
                                            mb="20px"
                                            fontSize={"16px"}
                                            fontWeight="600"
                                            color="#1B262C"
                                        >
                                            Location
                                        </Text>
                                        <Text
                                            mb="20px"
                                            fontSize={"16px"}
                                            fontWeight="600"
                                            color="#1B262C"
                                        >
                                            Message
                                        </Text>
                                    </Td>
                                    <Td>
                                        <Input disabled={isLoading} onChange={(e) => setDate(e.target.value)} type="date" placeholder="Tentukan Hari" /> <br />
                                        <TimePicker
                                            my={"6px"}
                                            value={time}
                                            onChange={e => {
                                                const [hour, minute] = e.target.value.split(":")
                                                setTime(`${hour}:00`)
                                            }}
                                            disabled={isLoading}
                                        />
                                        <Select disabled={isLoading} onChange={e => setFieldId(parseInt(e.target.value))} placeholder="Tentukan Tempat">
                                            {
                                                fields.map((field) => {
                                                    return <option key={field.id} value={field.id}>{field.label}</option>
                                                })
                                            }
                                        </Select>
                                        <Input disabled={isLoading} onChange={e => setMessage(e.target.value)} placeholder="Masukkan pesan" /> <br />
                                    </Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </TableContainer>
                    {/* <Stack direction={'row'} spacing='6px'>
                              <Text fontSize={'16px'} fontWeight='500' color='#1B262C'>Negotiate Date on </Text>
                              <Link href='#'>
                                  <Stack direction={'row'}>
                                      <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <rect width="24" height="23" fill="white"/>
                                          <path d="M6.67962 3.32038L7.29289 2.70711C7.68342 2.31658 8.31658 2.31658 8.70711 2.70711L11.2929 5.29289C11.6834 5.68342 11.6834 6.31658 11.2929 6.70711L9.50048 8.49952C9.2016 8.7984 9.1275 9.255 9.31653 9.63307C10.4093 11.8186 12.1814 13.5907 14.3669 14.6835C14.745 14.8725 15.2016 14.7984 15.5005 14.4995L17.2929 12.7071C17.6834 12.3166 18.3166 12.3166 18.7071 12.7071L21.2929 15.2929C21.6834 15.6834 21.6834 16.3166 21.2929 16.7071L20.6796 17.3204C18.5683 19.4317 15.2257 19.6693 12.837 17.8777L11.6286 16.9714C9.88504 15.6638 8.33622 14.115 7.02857 12.3714L6.12226 11.163C4.33072 8.7743 4.56827 5.43173 6.67962 3.32038Z" fill="#2DCC70"/>
                                      </svg>
                                      <Text>Whatsapp</Text>
                                  </Stack> 
                              </Link>  
                          </Stack> */}
                </ModalBody>

                <ModalFooter>
                    <Stack direction={"row"}>
                        <Button
                            bgColor={"#EB5757"}
                            color="#fff"
                            _hover={{ bg: "#EB5757" }}
                            _active={{
                                bg: "#EB5757",
                                transform: "scale(0.98)",
                            }}
                            mr={3}
                            onClick={onClose}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            bgColor={"#2DCC70"}
                            color="#fff"
                            _hover={{ bg: "#2DCC70" }}
                            _active={{
                                bg: "#2DCC70",
                                transform: "scale(0.98)",
                            }}
                            mr={3}
                            onClick={handleConfirm}
                            disabled={isLoading}
                        >
                            {
                                isLoading ?
                                <Spinner />
                                :
                                "Send"
                            }
                        </Button>
                    </Stack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ChallengeRequestModal