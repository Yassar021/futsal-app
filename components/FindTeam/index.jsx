import { Container, SimpleGrid, Spinner } from "@chakra-ui/react";
import LayoutUser from "../../layout/LayoutUser";
import CardFind from "./cardFind";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import { fetchTeams } from "../../store/reducers/team";
import { FetchStatus } from "../../types/type";

const FindTeam = () => {
  const { status, teams } = useAppSelector((state) => state.team);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTeams());
  }, []);
  return (
    <LayoutUser pageTitle={"Find Team"}>
      <Container maxW="6xl">
        <SimpleGrid columns={{ sm: 1, md: 2 }} spacing="20px">
          {status === FetchStatus.LOADING ? (
            <Spinner />
          ) : (
            teams.map((team, key) => <CardFind key={team.id} {...team} />)
          )}
        </SimpleGrid>
      </Container>
    </LayoutUser>
  );
};

export default FindTeam;
