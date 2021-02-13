import { useContext } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'

import dynamic from 'next/dynamic'
import {
  Box,
  Button,
  Text,
  useColorModeValue as mode,
  Tag,
  Stack,
  Avatar,
  SimpleGrid,
  useColorMode,
  Heading,
  Container,
} from '@chakra-ui/react'

import {
  elements,
  elementCategories,
  tempStrengthsFinderResult,
  element2category,
} from '../../utils/elements'
import { AuthContext } from '../../contexts/Auth'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export default function Result(_props: NextPage & { pid: string }): JSX.Element {
  const { currentUser } = useContext(AuthContext)
  const { colorMode, toggleColorMode } = useColorMode()

  // const [strengthsFinderResult, setStrengthsFinderResult] = useState(tempStrengthsFinderResult)
  const strengthsFinderResult = tempStrengthsFinderResult

  const chartOptions = {
    series: elementCategories.map((v) => {
      let score = 0
      strengthsFinderResult.elementIndexies.forEach((selected, i) => {
        if (v.elementIndexies.includes(selected)) score += 5 - i
      })
      return score
    }),
    options: {
      chart: {
        type: 'polarArea',
      },
      stroke: {
        colors: ['#fff'],
      },
      fill: {
        opacity: 0.8,
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: true,
        formatter: function (val, opt) {
          return (
            opt.w.globals.labels[opt.seriesIndex] +
            ':  ' +
            opt.w.globals.series[opt.seriesIndex]
          )
        },
        style: {
          fontSize: '20px',
        },
      },
      labels: elementCategories.map((v) => v.name),
      colors: elementCategories.map((v) => v.color),
    },
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
          <Box maxW="6xl" mx="auto" rounded={{ md: 'lg' }} overflow="hidden">
            <Stack direction={['column', 'row']} spacing="24px" my={10}>
              <Avatar
                size="2xl"
                name="Segun Adebayo"
                src={currentUser ? currentUser.photoURL : ''}
              />
              <Text py={2}>
                <Heading as="h1" size="2xl" mt={10} fontWeight="900">
                  {currentUser ? currentUser.displayName : ''}
                </Heading>
                <Text py={2}>
                  <Tag size="lg" variant="outline" colorScheme="teal">
                    @takanakahiko
                  </Tag>
                </Text>
              </Text>
            </Stack>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing="3">
              <Box px={{ base: '6', md: '8' }}>
                <SimpleGrid columns={{ base: 1, md: 1 }} spacing="4">
                  {strengthsFinderResult.elementIndexies.map((selected, i) => (
                    <Box
                      width="full"
                      px={{ base: 4, sm: 6 }}
                      py="5"
                      bgColor={element2category(selected).color}
                      shadow="base"
                      rounded="lg"
                      key={i}
                    >
                      <Text
                        fontWeight="medium"
                        isTruncated
                        color={mode('white', 'gray.400')}
                      >
                        {i + 1}
                      </Text>
                      <Text fontSize="xl" fontWeight="bold" color={'white'}>
                        {elements[selected]}
                      </Text>
                    </Box>
                  ))}
                </SimpleGrid>
              </Box>
              <Box maxW="520px" p={3}>
                <Chart {...chartOptions} type="polarArea" />
                {elementCategories.map((v) => (
                  <Text p={1} key={v.name}>
                    <Tag bg={v.color}>{v.name}</Tag> : {v.description}
                  </Text>
                ))}
              </Box>
            </SimpleGrid>
          </Box>
        </Box>
      </Box>
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </Button>
    </>
  )
}
