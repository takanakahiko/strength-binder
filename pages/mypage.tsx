import { useContext, useState, ChangeEvent } from 'react'
import Head from 'next/head'

import {
  Box,
  Button,
  Divider,
  Flex,
  Text,
  useColorModeValue as mode,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Select,
  useColorMode,
  Heading,
  Container,
} from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'

import {
  elements,
  elementCategories,
  tempStrengthsFinderResult,
} from '../utils/elements'
import { AuthContext } from '../contexts/Auth'

export default function Mypage(): JSX.Element {
  const { currentUser } = useContext(AuthContext)
  const { colorMode, toggleColorMode } = useColorMode()

  const [strengthsFinderResult, setStrengthsFinderResult] = useState(
    tempStrengthsFinderResult
  )

  const changeElement = (
    elementNumber: number
  ): ((event: ChangeEvent<HTMLSelectElement>) => void) => {
    return (event: ChangeEvent<HTMLSelectElement>) => {
      const newStrengthsFinderResult = Object.assign({}, strengthsFinderResult)
      newStrengthsFinderResult.elementIndexies[elementNumber] = parseInt(
        event.target.value
      )
      setStrengthsFinderResult(newStrengthsFinderResult)
    }
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box bg="#0099ff">
        <Container maxW="960px">
          <Heading as="h1" size="3xl" py={2} color="white">
            Strength Binder
          </Heading>
        </Container>
      </Box>
      {/* thx to https://getwaves.io/ */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-1440 -80 1440 80">
        <g transform="scale(-1,-0.25)">
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

      <Box as="section" bg={mode('gray.100', 'inherit')} py="12">
        <Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ md: '8' }}>
          <Box
            maxW="3xl"
            mx="auto"
            rounded={{ md: 'lg' }}
            bg={mode('white', 'gray.700')}
            shadow="base"
            overflow="hidden"
          >
            <Flex align="center" justify="space-between" px="6" py="4">
              <Text as="h3" fontWeight="bold" fontSize="lg">
                Account Info
              </Text>
              <Button variant="outline" minW="20" leftIcon={<EditIcon />}>
                編集機能未実装
              </Button>
            </Flex>
            <Divider />
            <Box>
              <FormControl px="6" py="4">
                <FormLabel>Nickname</FormLabel>
                <Input
                  value={currentUser ? currentUser.displayName : ''}
                  isReadOnly
                />
                <FormHelperText>Twitterから取得した名前</FormHelperText>
              </FormControl>
              <FormControl px="6" py="4">
                <FormLabel>Icon</FormLabel>
                <Input
                  value={currentUser ? currentUser.photoURL : ''}
                  isReadOnly
                />
                <FormHelperText>Twitterから取得したアイコン</FormHelperText>
              </FormControl>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box as="section" bg={mode('gray.100', 'inherit')} py="12">
        <Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ md: '8' }}>
          <Box
            maxW="3xl"
            mx="auto"
            rounded={{ md: 'lg' }}
            bg={mode('white', 'gray.700')}
            shadow="base"
            overflow="hidden"
          >
            <Flex align="center" justify="space-between" px="6" py="4">
              <Text as="h3" fontWeight="bold" fontSize="lg">
                StrengthsFinder result
              </Text>
              <Button variant="outline" minW="20" leftIcon={<EditIcon />}>
                編集機能未実装
              </Button>
            </Flex>
            <Divider />
            <Box>
              {strengthsFinderResult.elementIndexies.map(
                (selected, selectedIndex) => (
                  <FormControl px="6" py="4" key={selectedIndex}>
                    <FormLabel>{selectedIndex + 1}つめの素質</FormLabel>
                    <Select
                      value={selected}
                      onChange={changeElement(selectedIndex)}
                      placeholder="Select option"
                    >
                      {elementCategories.map((category) => (
                        <optgroup label={category.name} key={category.name}>
                          {category.elementIndexies.map((i) =>
                            strengthsFinderResult.elementIndexies.includes(i) &&
                            selected != i ? (
                              ''
                            ) : (
                              <option value={i} key={i}>
                                {elements[i]}
                              </option>
                            )
                          )}
                        </optgroup>
                      ))}
                    </Select>
                  </FormControl>
                )
              )}
              <Text px="6" py="4">
                ６つめ以降への対応は検討中です
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </Button>
    </>
  )
}
