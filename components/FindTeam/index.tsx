import { Container, SimpleGrid, Spinner } from "@chakra-ui/react";
import LayoutUser from "../../layout/LayoutUser";
import CardFind from "./cardFind";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import React, { LegacyRef, useEffect, useRef, useState } from "react";
import { getAvailableTeams } from "../../services/API/team";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { hasEnded, initialLoad, nextPage } from "../../store/reducers/findTeams";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactScrollPagination from 'react-scroll-pagination'
import useScroll from "../../utils/useScroll";


const FindTeam = () => {
  const { list, page, isEnd, isLoading } = useAppSelector((state: RootState) => state.findTeams)
  const dispatch = useAppDispatch();
  const scrollPos = useScroll();

  const fetchData = () => {
    if (isEnd) {
      return
    }
    getAvailableTeams({ page: page + 1, size: 3 }).then((data) => {
      dispatch(nextPage(data.data));
      if (data.next_page_url) {
        dispatch(hasEnded())
      }
    })
  }

  useEffect(() => {
    getAvailableTeams({ page: 1, size: 3 }).then(data => {
      dispatch(initialLoad(data.data));
    })
  }, [])

  useEffect(() => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollPos.y === scrollTop) {
      fetchData()
    }

  }, [scrollPos.y])

  return (
    <LayoutUser pageTitle={"Find Team"}>
      <Container maxW="6xl">
        <SimpleGrid id="scrollElement" columns={{ sm: 1, md: 2 }} spacing="20px">
          {
            list.map((team) => <CardFind key={team.id} {...team} />)
          }
        </SimpleGrid>
      </Container>
    </LayoutUser>
  );
};

export default FindTeam;
