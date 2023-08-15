import { Container, Flex, Spinner } from "@chakra-ui/react";
import LayoutUser from "../../layout/LayoutUser";
import CardHistory from "./cardHistory";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchMatchHistory } from "../../services/graphql";
import { FetchStatus } from "../../types/type";
import { fetchMatchResult } from "../../store/reducers/matchHistory";

const History = () => {
  const { status, matchHistorys } = useAppSelector(
    (state) => state.matchHistory
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMatchResult());
  }, []);

  return (
    <LayoutUser pageTitle={"History"}>
      <Container maxW="6xl">
        <Flex pb="20px" direction={"column"} gap="20px">
          {status === FetchStatus.LOADING ? (
            <Spinner />
          ) : (
            matchHistorys.map((matchHistory, key) => (
              <CardHistory key={matchHistory.id} {...matchHistory} />
            ))
          )}
        </Flex>
      </Container>
    </LayoutUser>
  );
};

export default History;
