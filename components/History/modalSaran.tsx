import React, { useEffect, useState } from "react";
import { Box, Button, Center, Editable, EditablePreview, EditableTextarea, Flex, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, TableContainer, Text, Textarea, useDisclosure } from "@chakra-ui/react"
import { MatchFeedback } from "../../types/type";
import { useAppSelector } from "../../store/hooks";
import { addMatchReviews, getMatchReviews } from "../../services/API/match";

type Props = {
    onClose: () => void;
    gameId: number;
}

const ModalSaran = ({ onClose, gameId }: Props) => {
    const currentTeamId = useAppSelector(state => state.account.userInfo?.data.id || 0)

    const [isLoading,setLoading] = useState(false);
    const [list,setList] = useState<MatchFeedback[]>([]);
    const [review,setReview] = useState("");


    const fetchList = async () => {
        setLoading(true);
        const res = await getMatchReviews(currentTeamId, gameId);
        setList(res);
        setLoading(false);
    }

    const handleSubmit = async () => {
        setLoading(true)

        const newReview = await addMatchReviews(
            currentTeamId,
            gameId,
            review
        )
        setReview("");
        await fetchList();
        setLoading(false)

    }

    useEffect(() => {
        fetchList();
    },[])

    return (
        <Modal isOpen={true} onClose={onClose} size={'xl'}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader pb='60px'>Masukkan dan Saran</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex direction={'column'} gap='64px'>
                        {
                            isLoading ?
                            <Spinner />
                            :
                            list.length ?
                                <>
                                    {
                                        list.map((item,key) => {
                                            return (
                                                <Box key={key}>
                                                    <Text mb='16px' fontSize={'18px'} fontWeight='700' color='#1B262C'>{item.team.name}</Text>
                                                    <Box padding={'20px'} width={'100%'} height={'150px'} bgColor={'#D7DAE8'}>
                                                        <Text fontSize={'14px'} fontWeight='700' color='#1B262C'>{item.review}</Text>
                                                    </Box>
                                                </Box>
                                            )
                                        })
                                    }
                                </>
                                :
                                <Text mb='16px' fontSize={'18px'} fontWeight='700' color='#1B262C'>Belum ada feedback</Text>
                        }
                        
                        <Box>
                            <Textarea
                                p='4px'
                                border={'2px solid #D7DAE8'}
                                borderRadius={'4px'}
                                placeholder='Masukkan Pesan disini'
                                height={'80px'}
                                value={review}
                                onChange={e => setReview(e.target.value)}
                            />
                            <HStack justifyContent={'right'} spacing='6px' mt='20px'>
                                <Button bgColor={'#EB5757'} color='#fff' _hover={{ bg: '#EB5757' }}
                                    _active={{
                                        bg: '#EB5757',
                                        transform: 'scale(0.98)',
                                    }} mr={3} onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button onClick={handleSubmit} isLoading={isLoading} colorScheme='green'>Simpan</Button>
                            </HStack>
                        </Box>
                    </Flex>
                </ModalBody>
                <ModalFooter>

                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ModalSaran