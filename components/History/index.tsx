import React, { useEffect } from "react";
import { Container, Flex, Spinner, VStack } from "@chakra-ui/react";
import LayoutUser from "../../layout/LayoutUser";
import CardHistory from "./cardHistory";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchInitialList } from "../../store/reducers/histories";

const History = () => {
  const { list, isLoading } = useAppSelector(state => state.histories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchInitialList());
  },[])

  return (
    <LayoutUser pageTitle={"History"}>
      <Container maxW="6xl">
        <Flex pb="20px" direction={"column"} gap="20px">
          {
            list.map((match,key) => {
              return <CardHistory key={key} match={match} />
            })
          }
          {
            isLoading ?? <VStack><Spinner /></VStack>
          }
        </Flex>
      </Container>
    </LayoutUser>
  );
};

export default History;
