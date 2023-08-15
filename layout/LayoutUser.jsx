import { Box, Container } from "@chakra-ui/react";
import Head from "next/head";
import Navbar from "../components/Navbar";

const LayoutUser = ({ pageTitle, children }) => {
  return (
    <>
      <Head>
        <title>Matchmaking | {pageTitle}</title>
      </Head>

      {/* content */}
      <Navbar />
      <Box bgColor={"#F3F4F7"} py="60px" height={"100vh"}>
        {children}
      </Box>
    </>
  );
};

export default LayoutUser;
