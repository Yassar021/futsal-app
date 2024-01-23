// pages/_app.js
import { ChakraProvider } from '@chakra-ui/react'
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../store/index"
import AuthProvider from '../services/AuthProvider/Provider';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import "../components/Timeslots/src/styles/main.scss"
import moment from "moment";
import "moment/locale/id";

moment.locale("id");

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