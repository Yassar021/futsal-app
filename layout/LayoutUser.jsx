import { Box, Container, Spinner } from "@chakra-ui/react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import { useUser } from "../services/AuthProvider/hooks";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { AccountType } from "../types/user";

const LayoutUser = ({ pageTitle, children }) => {
  const user = useUser();
  const router = useRouter()

  useEffect(() => {
    if (!user.isLogged && user.type !== AccountType.TEAM) {
      router.push("/Login")
    }
  },[user])


  if (!user.isLogged) {
    return <Spinner />
  }

  return (
    <>
      <Head>
        <title>Matchmaking | {pageTitle}</title>
      </Head>

      <Navbar />
      <Box bgColor={"#F3F4F7"} py="60px" height={"100vh"}>
        {children}
      </Box>
    </>
  );
};

export default LayoutUser;
