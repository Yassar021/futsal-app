import { Text, Flex, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack, Checkbox, Box, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { MatchHistory } from '../../types/schedule';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateScore } from '../../store/reducers/histories';
import { useAlert } from "react-alert";
import { getSubmitedResult } from '../../services/API/match';

type Props = {
    onClose: () => void;
    match: MatchHistory;
}

function MatchResultModal({ onClose, match }: Props) {
    const dispatch = useAppDispatch();
    const currentTeamId = useAppSelector(state => state.account.userInfo?.data.id)
    const alert = useAlert();

    const [isLoading, setLoading] = useState(false);

    const [isPenalty, setIsPenalty] = useState(false)
    const [homeScore, setHomeScore] = useState(0);
    const [awayScore, setAwayScore] = useState(0);
    const [homePenaltyScore, setHomePenaltyScore] = useState(0);
    const [awayPenaltyScore, setAwayPenaltyScore] = useState(0);

    const { home_team, away_team } = match;


    const fetchResult = async () => {
        setLoading(true);

        const res = await getSubmitedResult(currentTeamId ? currentTeamId : 0, match.id)

        if (res.result) {
            const result = res.result;
            setIsPenalty(result.isPenalty);
            setAwayScore(result.away);
            setHomeScore(result.home);
            setAwayPenaltyScore(result.away_penalty);
            setHomePenaltyScore(result.home_penalty);
        }

        setLoading(false);
    }

    useEffect(() => {
        fetchResult();
    },[])

    const handleSubmit = async () => {
        setLoading(true);

        await dispatch(updateScore({
            team_id: currentTeamId ?? 0,
            match_id: match.id,
            result: {
                away: awayScore,
                home: homeScore,
                away_penalty: awayPenaltyScore,
                home_penalty: homePenaltyScore,
                isPenalty: isPenalty
            }
        }))

        setLoading(false)
        alert.show("Skor berhasil diperbarui", {
            type: "success",
        });

        onClose();
    }

    return (
        <Modal isOpen={true} onClose={onClose} size={'xl'}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader pb='60px'>Hasil Pertandingan</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack w={"100%"}>
                        <HStack w={"100%"} justifyContent={"space-between"}>
                            <Text w={"30%"}>{home_team.name}</Text>
                            <Input value={homeScore} onChange={e => setHomeScore(parseInt(e.target.value))} w={"70%"} type='number' placeholder='Skor' />
                        </HStack>
                        <HStack w={"100%"} justifyContent={"space-between"}>
                            <Text w={"30%"}>{away_team.name}</Text>
                            <Input value={awayScore} onChange={e => setAwayScore(parseInt(e.target.value))} w={"70%"} type='number' placeholder='Skor' />
                        </HStack>
                        <HStack w={"100%"} >
                            <Text w={"30%"}>Penalti?</Text>
                            <Checkbox value={isPenalty ? 1 : 0} onChange={e => setIsPenalty(e.target.checked)}>Iya</Checkbox>
                        </HStack>
                        {
                            isPenalty &&
                            <>
                                <HStack w={"100%"} justifyContent={"space-between"}>
                                    <Text w={"30%"}>{home_team.name}</Text>
                                    <Input value={homePenaltyScore} onChange={e => setHomePenaltyScore(parseInt(e.target.value))} w={"70%"} type='number' placeholder='Skor Penalti' />
                                </HStack>
                                <HStack w={"100%"} justifyContent={"space-between"}>
                                    <Text w={"30%"}>{away_team.name}</Text>
                                    <Input value={awayPenaltyScore} onChange={e => setAwayPenaltyScore(parseInt(e.target.value))} w={"70%"} type='number' placeholder='Skor Penalti' />
                                </HStack>
                            </>
                        }
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button bgColor={'#EB5757'} color='#fff' _hover={{ bg: '#EB5757' }}
                        _active={{
                            bg: '#EB5757',
                            transform: 'scale(0.98)',
                        }} mr={3} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button isLoading={isLoading} onClick={handleSubmit} colorScheme='green'>Simpan</Button>
                </ModalFooter>
            </ModalContent>

        </Modal>
    )
}

export default MatchResultModal