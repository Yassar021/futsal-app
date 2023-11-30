import React, { useEffect, useState } from 'react'
import { SimpleGrid, Spinner, VStack, useDisclosure } from "@chakra-ui/react"
import CardInbox from './cardInbox'
import { ChallengeItem } from '../../types/challenge'
import ChallengeSentInfo from './ChallengeSentInfo'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { deleteChallenge, fetchChallanges } from '../../store/reducers/challengeSent'
import { useAlert } from 'react-alert'


function ChallengeSent() {
    const { list, isLoading } = useAppSelector(state => state.challengeSent)
    const dispatch = useAppDispatch();
    const alert = useAlert();

    const [selectedChallenge, setSelectedChallenge] = useState<ChallengeItem | null>(null);
    const { isOpen: isInfoModalOpen, onOpen: openInfoModal, onClose: closeInfoModal } = useDisclosure();


    const fetchChallenge = async () => {
        dispatch(fetchChallanges());
    }

    const handleChallengeInfo = (challenge: ChallengeItem) => {
        setSelectedChallenge(challenge);
        openInfoModal();
    }

    const handleDelete = () => {
        if (selectedChallenge) {
            dispatch(deleteChallenge(selectedChallenge.id)).then(() => {
                closeInfoModal();
                setSelectedChallenge(null);

                alert.show("Tantangan berhasil dihapus", {
                    type: "success",
                });
            });
        }
    }

    useEffect(() => {
        fetchChallenge()
    }, [])

    if (isLoading) {
        return <VStack><Spinner /></VStack>
    }

    return (
        <SimpleGrid columns={{ sm: 1, md: 2 }} spacing='20px'>
            {
                list.map(challenge => {
                    return (
                        <CardInbox key={challenge.id} {...challenge} onSelect={() => handleChallengeInfo(challenge)} />
                    )
                })
            }
            {
                isInfoModalOpen && selectedChallenge ?
                    <ChallengeSentInfo
                        isOpen={isInfoModalOpen}
                        onClose={closeInfoModal}
                        challengeId={selectedChallenge.id}
                        onDelete={handleDelete}
                    />
                    :
                    null
            }
        </SimpleGrid>
    )
}

export default ChallengeSent