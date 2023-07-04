import { Box, Container } from "@chakra-ui/react"
import Head from "next/head"
import NavbarVenue from "../components/Navbar/NavbarVenue"

const LayoutVenue = ({pageTitle, children}) => {
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