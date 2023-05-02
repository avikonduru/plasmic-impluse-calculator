import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Flex,
  GridItem,
  Container,
  Stack,
  Spacer,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';

function App() {
  const [totalImpulse, setTotalImpulse] = useState(0);
  const [dryMass, setDryMass] = useState(0);
  const [totalDeltaV, setTotalDeltaV] = useState(0);
  const [chemicalElectricRatio, setChemicalElectricRatio] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      console.log({ totalImpulse, dryMass, totalDeltaV });
    };

    fetchData().catch(console.error);
  }, [totalImpulse, dryMass, totalDeltaV]);

  return (
    <ChakraProvider theme={theme}>
      <Flex w="100%" h="100vh">
        <Grid w="100%" templateColumns="repeat(5, 1fr)">
          <GridItem colSpan={2}>
            <Container>
              <Flex direction="column" justify="center" h="100vh">
                <Box mb="8">
                  <Text fontWeight="800" fontSize="xl" color="blue.500">
                    THRUSTER CONFIGURATOR
                  </Text>
                  <Text fontWeight="500" fontSize="sm" color="gray.500">
                    Enter your mission requirements below to see the attributes
                    of an Aurora system that meets your needs. Specify either
                    the Total Impulse you require or specify both the Spacecraft
                    Dry Mass and Mission Delta-V. Each Aurora system is
                    continuously throttleable from 100 W to 300 W. Because
                    thrust, Isp, and efficiency vary as a function of operating
                    power the table shows system performance impacts for a few
                    discrete throttle points within the available range.
                  </Text>
                </Box>
                <Box>
                  <Stack spacing="10">
                    <Stack>
                      <Flex align="center">
                        <Text fontWeight="600" fontSize="lg" color="blue.500">
                          TOTAL IMPULSE
                        </Text>
                        <Spacer />
                        <Text fontWeight="600" fontSize="lg" mr="2">
                          {totalImpulse}
                        </Text>
                        <Text fontWeight="400" fontSize="lg">
                          N-s
                        </Text>
                      </Flex>
                      <Box>
                        <Slider
                          defaultValue={0}
                          min={0}
                          max={500000}
                          onChange={val => setTotalImpulse(val)}
                        >
                          <SliderTrack>
                            <SliderFilledTrack />
                          </SliderTrack>
                          <SliderThumb />
                        </Slider>
                        <Flex align="center">
                          <Text color="blue.500" fontWeight="600" fontSize="sm">
                            0
                          </Text>
                          <Spacer />
                          <Text color="blue.500" fontWeight="600" fontSize="sm">
                            500k
                          </Text>
                        </Flex>
                      </Box>
                      <Text fontWeight="500" fontSize="xs" color="gray.500">
                        Or adjust these sliders to specify the spacecraft dry
                        mass and mission delta-V.
                      </Text>
                    </Stack>

                    <Stack>
                      <Flex align="center">
                        <Text fontWeight="600" fontSize="lg" color="blue.500">
                          SPACECRAFT DRY MASS
                        </Text>
                        <Spacer />
                        <Text fontWeight="600" fontSize="lg" mr="2">
                          {dryMass === 0 ? '-' : dryMass}
                        </Text>
                        <Text fontWeight="400" fontSize="lg">
                          kg
                        </Text>
                      </Flex>
                      <Box>
                        <Slider
                          defaultValue={0}
                          min={0}
                          max={500}
                          onChange={val => setDryMass(val)}
                        >
                          <SliderTrack>
                            <SliderFilledTrack />
                          </SliderTrack>
                          <SliderThumb />
                        </Slider>
                        <Flex align="center">
                          <Text color="blue.500" fontWeight="600" fontSize="sm">
                            0
                          </Text>
                          <Spacer />
                          <Text color="blue.500" fontWeight="600" fontSize="sm">
                            500
                          </Text>
                        </Flex>
                      </Box>
                    </Stack>

                    <Stack>
                      <Flex align="center">
                        <Text fontWeight="600" fontSize="lg" color="blue.500">
                          TOTAL MISSION DELTA-V
                        </Text>
                        <Spacer />
                        <Text fontWeight="600" fontSize="lg" mr="2">
                          {totalDeltaV === 0 ? '-' : totalDeltaV}
                        </Text>
                        <Text fontWeight="400" fontSize="lg">
                          m/s
                        </Text>
                      </Flex>
                      <Box>
                        <Slider
                          defaultValue={0}
                          min={0}
                          max={1000}
                          onChange={val => setTotalDeltaV(val)}
                        >
                          <SliderTrack>
                            <SliderFilledTrack />
                          </SliderTrack>
                          <SliderThumb />
                        </Slider>
                        <Flex align="center">
                          <Text color="blue.500" fontWeight="600" fontSize="sm">
                            0
                          </Text>
                          <Spacer />
                          <Text color="blue.500" fontWeight="600" fontSize="sm">
                            1000
                          </Text>
                        </Flex>
                      </Box>
                    </Stack>

                    <Stack>
                      <Flex align="center">
                        <Text fontWeight="600" fontSize="lg" color="blue.500">
                          CHEMICAL/ELECTRIC RATIO
                        </Text>
                        <Spacer />
                        <Text fontWeight="600" fontSize="lg" mr="2">
                          {chemicalElectricRatio === 0
                            ? '0% / 100%'
                            : `${chemicalElectricRatio}% / ${
                                100 - chemicalElectricRatio
                              }%`}
                        </Text>
                        <Text fontWeight="400" fontSize="lg">
                          Chemical/Electric
                        </Text>
                      </Flex>
                      <Box>
                        <Slider
                          defaultValue={0}
                          min={0}
                          max={100}
                          onChange={val => setChemicalElectricRatio(val)}
                        >
                          <SliderTrack>
                            <SliderFilledTrack />
                          </SliderTrack>
                          <SliderThumb />
                        </Slider>
                        <Flex align="center">
                          <Text color="blue.500" fontWeight="600" fontSize="sm">
                            0% Chemical / 100% Electric
                          </Text>
                          <Spacer />
                          <Text color="blue.500" fontWeight="600" fontSize="sm">
                            100% Chemical / 0% Electric
                          </Text>
                        </Flex>
                      </Box>
                    </Stack>
                  </Stack>
                </Box>
              </Flex>
            </Container>
          </GridItem>
          <GridItem colSpan={3} bg="gray.100">
            <Container maxW="container.lg">
              <Flex direction="column" justify="center" h="100vh">
                <Stack direction="row" spacing="8" mb="8">
                  <Flex align="center">
                    <Text
                      color="blue.500"
                      fontWeight="700"
                      fontSize="lg"
                      mr="2"
                    >
                      Total Impulse:
                    </Text>
                    <Text fontWeight="700" fontSize="lg" mr="1">
                      {totalImpulse === 0
                        ? 0.0
                        : (totalImpulse / 1000).toFixed(2)}
                    </Text>
                    <Text>kN-s</Text>
                  </Flex>

                  <Flex align="center">
                    <Text
                      color="blue.500"
                      fontWeight="700"
                      fontSize="lg"
                      mr="2"
                    >
                      Total Delta-V:
                    </Text>
                    <Text fontWeight="700" fontSize="lg" mr="1">
                      {totalDeltaV === 0 ? '-' : totalDeltaV}
                    </Text>
                    <Text>m/s</Text>
                  </Flex>

                  <Flex align="center">
                    <Text
                      color="blue.500"
                      fontWeight="700"
                      fontSize="lg"
                      mr="2"
                    >
                      Dry Mass:
                    </Text>
                    <Text fontWeight="700" fontSize="lg" mr="1">
                      {dryMass === 0 ? '-' : dryMass}
                    </Text>
                    <Text>kg</Text>
                  </Flex>
                </Stack>

                <Box>
                  <TableContainer>
                    <Table variant="simple" size="lg" whiteSpace="wrap">
                      <Thead>
                        <Tr>
                          <Th>Parameters</Th>
                          <Th>Unit</Th>
                          <Th isNumeric>100 W</Th>
                          <Th isNumeric>150 W</Th>
                          <Th isNumeric>200 W</Th>
                          <Th isNumeric>250 W</Th>
                          <Th isNumeric>300 W</Th>
                          <Th isNumeric>400 W</Th>
                          <Th isNumeric>500 W</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        <Tr>
                          <Td>Aurora System Dry Mass, less tank</Td>
                          <Td>kg</Td>
                          <Td isNumeric>0</Td>
                          <Td isNumeric>0</Td>
                          <Td isNumeric>0</Td>
                          <Td isNumeric>0</Td>
                          <Td isNumeric>0</Td>
                          <Td isNumeric>0</Td>
                          <Td isNumeric>0</Td>
                        </Tr>

                        <Tr>
                          <Td>On-Orbit Burn Time *</Td>
                          <Td>hr</Td>
                          <Td isNumeric>0</Td>
                          <Td isNumeric>0</Td>
                          <Td isNumeric>0</Td>
                          <Td isNumeric>0</Td>
                          <Td isNumeric>0</Td>
                          <Td isNumeric>0</Td>
                          <Td isNumeric>0</Td>
                        </Tr>

                        <Tr>
                          <Td>Total Ar Propellant Mass</Td>
                          <Td>kg</Td>
                          <Td isNumeric>0</Td>
                          <Td isNumeric>0</Td>
                          <Td isNumeric>0</Td>
                          <Td isNumeric>0</Td>
                          <Td isNumeric>0</Td>
                          <Td isNumeric>0</Td>
                          <Td isNumeric>0</Td>
                        </Tr>

                        <Tr>
                          <Td>Total H Propellant Mass</Td>
                          <Td>kg</Td>
                          <Td isNumeric>0</Td>
                          <Td isNumeric>0</Td>
                          <Td isNumeric>0</Td>
                          <Td isNumeric>0</Td>
                          <Td isNumeric>0</Td>
                          <Td isNumeric>0</Td>
                          <Td isNumeric>0</Td>
                        </Tr>
                      </Tbody>
                      <Tfoot>
                        <Tr>
                          <Th>Aurora System Wet Mass</Th>
                          <Th>kg</Th>
                          <Th isNumeric>0</Th>
                          <Th isNumeric>0</Th>
                          <Th isNumeric>0</Th>
                          <Th isNumeric>0</Th>
                          <Th isNumeric>0</Th>
                          <Th isNumeric>0</Th>
                          <Th isNumeric>0</Th>
                        </Tr>
                      </Tfoot>
                    </Table>
                  </TableContainer>
                </Box>
              </Flex>
            </Container>
          </GridItem>
        </Grid>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
