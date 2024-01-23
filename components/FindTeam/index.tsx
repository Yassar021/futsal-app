import { Container, SimpleGrid, Spinner, useDisclosure } from "@chakra-ui/react";
import LayoutUser from "../../layout/LayoutUser";
import CardFind from "./cardFind";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import React, { LegacyRef, useEffect, useRef, useState } from "react";
import { getAvailableTeams } from "../../services/API/team";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchInitialTeamList, fetchNextTeamList } from "../../store/reducers/findTeams";
import useScroll from "../../utils/useScroll";
import { TeamInfo } from "../../types/user";
import ChallengeRequestModal from "./ChallengeRequestModal";
import { CreateChallengeRequest } from "../../types/request";
import { createChallenge } from "../../services/API/challenge";
import { useAlert } from "react-alert";


const FindTeam = () => {
  const { list, page, isEnd, isLoading } = useAppSelector((state) => state.findTeams)
  const { isOpen: isRequestModalOpen, onOpen: openRequestModal, onClose: closeRequestModal } = useDisclosure();
  const [selectedTeam, setSelectedTeam] = useState<TeamInfo | null>(null);
  const dispatch = useAppDispatch();
  const scrollPos = useScroll();
  const alert = useAlert();

  const handleOpenRequestModal = (team: TeamInfo) => {
    setSelectedTeam(team);
    openRequestModal();
  }

  const handleSendConfirm = async (payload: CreateChallengeRequest) => {
    return createChallenge(payload).then(res => {
      closeRequestModal();
      setSelectedTeam(null);
      alert.show("Tantangan berhasil dikirim",{
        type: "success",
      });
    }).catch(err => {
      alert.show("Tantangan gagal dikirim",{
        type: "error",
      });
    })
  }

  useEffect(() => {
    dispatch(fetchInitialTeamList())
  },[])

  useEffect(() => {
    const { scrollHeight, offsetHeight } = document.documentElement;

    if (((scrollPos.y + offsetHeight) >= scrollHeight) && !isLoading) {
      dispatch(fetchNextTeamList())
    }

  }, [scrollPos.y])

  return (
    <LayoutUser pageTitle={"Find Team"}>
      <Container maxW="6xl">
        <SimpleGrid id="scrollElement" columns={{ sm: 1, md: 2 }} spacing="20px">
          {
            list.map((team: TeamInfo) => <CardFind key={team.id} {...team} onRequest={() => handleOpenRequestModal(team)} />)
          }
          {
            isLoading ?? <Spinner />
          }
        </SimpleGrid>
        {
          (isRequestModalOpen && selectedTeam) ?
            <ChallengeRequestModal
              isOpen={isRequestModalOpen}
              teamId={selectedTeam?.id}
              teamName={selectedTeam?.name}
              onClose={() => {
                setSelectedTeam(null);
                closeRequestModal()
              }}
              onConfirm={handleSendConfirm}
            />
            :
            null
        }
      </Container>
    </LayoutUser>
  );
};

export default FindTeam;
