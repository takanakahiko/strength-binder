import { useContext } from 'react'
import Router from 'next/router'
import Head from 'next/head'
import NextLink from 'next/link'
import { AuthContext } from '../contexts/Auth'
import { Heading, Button, Container, Box, Text } from '@chakra-ui/react'

import firebase from '../utils/Firebase'

export default function Home(): JSX.Element {
  const { currentUser } = useContext(AuthContext)

  const login = () => {
    const provider = new firebase.auth.TwitterAuthProvider()
    firebase.auth().onAuthStateChanged((user) => {
      if (user) Router.push('/mypage')
    })
    firebase.auth().signInWithRedirect(provider)
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box bg="#0099ff">
        <Container maxW="960px" pt={40}>
          <Heading as="h1" size="3xl" color="white">
            Welcome to Strength Binder !
          </Heading>
          <Text opacity={0.7} mt={5} size="lg">
            You can easily share your StrengthsFinder results.
          </Text>
          {currentUser ? (
            <NextLink href="/mypage" passHref>
              <Button size="lg" mt={10}>
                My Page →
              </Button>
            </NextLink>
          ) : (
            <Button onClick={login} size="lg" mt={10}>
              Log In With Twitter →
            </Button>
          )}
        </Container>
      </Box>
      {/* thx to https://getwaves.io/ */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-1440 -320 1440 320">
        <g transform="scale(-1,-1)">
          <path
            fill="#a2d9ff"
            fillOpacity="1"
            d="M0,192L48,165.3C96,139,192,85,288,90.7C384,96,480,160,576,165.3C672,171,768,117,864,96C960,75,1056,85,1152,101.3C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
          <path
            fill="#0099ff"
            fillOpacity="1"
            d="M0,192L48,176C96,160,192,128,288,128C384,128,480,160,576,186.7C672,213,768,235,864,208C960,181,1056,107,1152,74.7C1248,43,1344,53,1392,58.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </g>
      </svg>
    </>
  )
}
