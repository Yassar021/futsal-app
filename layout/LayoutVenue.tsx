import { Box, Container, Spinner } from "@chakra-ui/react"
import Head from "next/head"
import NavbarVenue from "../components/Navbar/NavbarVenue"
import { useUser } from "../services/AuthProvider/hooks";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { AccountType } from "../types/user";

const LayoutVenue = ({pageTitle, children}) => {
  const user = useUser();
  const router = useRouter()

  useEffect(() => {
    if (!user.isLogged && user.type !== AccountType.VENUE) {
      router.push("/venue_admin/login")
    }
  },[user])


  if (!user.isLogged) {
    return <Spinner />
  }

    return(
        <>
            <Head>
                <title>Matchmaking | {pageTitle}</title>
            </Head>

            {/* content */}
            <NavbarVenue />
            <Box bgColor={'#F3F4F7'} py='60px' height={'100vh'}>
                {children}
            </Box>
        </>
    )
}

export default LayoutVenue