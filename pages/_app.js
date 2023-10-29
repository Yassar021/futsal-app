// pages/_app.js
import { ChakraProvider } from '@chakra-ui/react'
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../store/index"
import AuthProvider from '../services/AuthProvider/Provider';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const alertOptions = {
  timeout: 5000,
  position: positions.MIDDLE
}


function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <AlertProvider template={AlertTemplate} {...alertOptions} >
        <ReduxProvider store={store}>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </ReduxProvider>
      </AlertProvider>
    </ChakraProvider>
  )
}

export default MyApp