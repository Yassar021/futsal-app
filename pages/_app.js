// pages/_app.js
import { ChakraProvider } from '@chakra-ui/react'
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../store/index"

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <ReduxProvider store={store}>
        <Component {...pageProps} />
      </ReduxProvider>
    </ChakraProvider>
  )
}

export default MyApp