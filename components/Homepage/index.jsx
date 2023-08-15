import { Box, Container } from "@chakra-ui/react";
import LayoutUser from "../../layout/LayoutUser";
import CardHome from "./cardHome";
import CardMatch from "./cardMatch";

const Homepage = () => {
  return (
    <LayoutUser pageTitle={"Home"}>
      <Container maxW="6xl">
        <CardHome />
        <CardMatch />
      </Container>
    </LayoutUser>
  );
};

export default Homepage;
