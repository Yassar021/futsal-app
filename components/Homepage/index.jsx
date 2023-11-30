import React from "react";
import { Box, Container, Spinner, VStack } from "@chakra-ui/react";
import LayoutUser from "../../layout/LayoutUser";
import CardHome from "./cardHome";
import CardMatch from "./cardMatch";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect, useMemo } from "react";
import { loadInitialList } from "../../store/reducers/schedule";

const Homepage = () => {
  const { list: schedules, isLoading: scheduleIsLoading } = useAppSelector(
    (state) => state.schedule
  );
  const dispatch = useAppDispatch();

  const currentSchedule = useMemo(() => {
    if (schedules) {
      return schedules[0];
    }
    return null;
  }, [schedules]);

  useEffect(() => {
    if (schedules.length === 0) {
      dispatch(loadInitialList());
    }
  }, []);

  return (
    <LayoutUser pageTitle={"Home"}>
      <Container maxW="6xl">
        <CardHome />
        {scheduleIsLoading ? (
          <VStack>
            <Spinner />
          </VStack>
        ) : currentSchedule ? (
          <CardMatch {...currentSchedule} />
        ) : null}
      </Container>
    </LayoutUser>
  );
};

export default Homepage;
