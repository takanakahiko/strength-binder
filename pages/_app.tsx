import type { AppProps /*, AppContext */ } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'

import '../styles/globals.css'
import { AuthProvider } from '../contexts/Auth'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
