import { Box, Container } from "@chakra-ui/react"
import Head from "next/head"

const LayoutRegister = ({pageTitle, children}) => {
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

export default LayoutRegister