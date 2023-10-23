import { Box, Container } from "@chakra-ui/react"
import Head from "next/head"
import { useUser } from "../services/AuthProvider/hooks";
import { useEffect } from "react";
import { useRouter } from "next/router";

const LayoutLogin = ({pageTitle, children}) => {

    const user = useUser();
    const router = useRouter()

    useEffect(() => {
      if (user.isLogged) {
        router.push("/");
      }
    },[user])

    return(
        <> 
            <Head>
                <title>Matchmaking | {pageTitle}</title>
            </Head>

            {/* content */}
            <Container maxW='6xl'>
                <Box mt='120px' pb='40px'>
                    {children}
                </Box>
            </Container>
        </>
    )
}

export default LayoutLogin