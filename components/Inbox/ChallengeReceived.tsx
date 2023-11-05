import React, { useEffect, useState } from 'react'
import { SimpleGrid, Spinner, useDisclosure } from "@chakra-ui/react"
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import CardInbox from './cardInbox'
import { ChallengeItem } from '../../types/challenge';
import { acceptChallenge, fetchChallanges, rejectChallenge } from '../../store/reducers/challengeReceived';
import ChallengeReceivedInfo from './ChallengeReceivedInfo';

function ChallengeReceived() {
  const { list, isLoading } = useAppSelector(state => state.challengeReceived);
  const dispatch = useAppDispatch();

  const { isOpen: isInfoModalOpen, onOpen: openInfoModal, onClose: closeInfoModal } = useDisclosure();
  const [selectedChallenge, setSelectedChallenge] = useState<ChallengeItem | null>(null);

  useEffect(() => {
    dispatch(fetchChallanges());
  }, [])

  const handleChallengeInfo = (challenge: ChallengeItem) => {
    setSelectedChallenge(challenge);
    openInfoModal();
  }

  const handleAccept = () => {
    if (selectedChallenge) {
      dispatch(acceptChallenge(selectedChallenge.id));
    }
  }

  const handleReject = () => {
    if (selectedChallenge) {
      dispatch(rejectChallenge(selectedChallenge.id));
    }
  }

  if (isLoading) {
    return <Spinner />
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
          <ChallengeReceivedInfo
            isOpen={isInfoModalOpen}
            onClose={closeInfoModal}
            challengeId={selectedChallenge.id}
            onAccept={handleAccept}
            onReject={handleReject}
          />
          :
          null
      }
    </SimpleGrid>
  )
}

export default ChallengeReceived