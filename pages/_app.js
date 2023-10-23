// pages/_app.js
import { ChakraProvider } from '@chakra-ui/react'
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../store/index"
import AuthProvider from '../services/AuthProvider/Provider';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <ReduxProvider store={store}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ReduxProvider>
    </ChakraProvider>
  )
}

export default MyApp