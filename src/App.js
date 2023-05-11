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
  Card,
  CardBody,
  Select,
  Button,
  CardHeader,
  Heading,
  IconButton,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';

function App() {
  const [totalImpulse, setTotalImpulse] = useState(100000);
  const [dryMass, setDryMass] = useState(5);
  const [totalDeltaV, setTotalDeltaV] = useState(0);
  const [chemicalElectricRatio, setChemicalElectricRatio] = useState(50);

  const [justLoaded, setJustLoaded] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (dryMass === 5 || totalDeltaV === 0) {
        if (!justLoaded) {
          setTotalImpulse(0);
        }
      } else {
        setTotalImpulse(dryMass * totalDeltaV);
      }
    };

    fetchData().catch(console.error);
  }, [dryMass, totalDeltaV, justLoaded]);

  return (
    <ChakraProvider theme={theme}>
      <Box w="100%" py="2" bg="#ECEBEB">
        <Container maxW="container.md" mb="6">
          <Card>
            <CardBody>
              <Box>
                <Stack spacing="6">
                  <Stack>
                    <Flex align="center">
                      <Text fontWeight="600" fontSize="sm" color="gray.500">
                        TOTAL IMPULSE
                      </Text>
                      <Spacer />
                      <Text fontWeight="600" fontSize="sm" mr="2">
                        {totalImpulse}
                      </Text>
                      <Text fontWeight="400" fontSize="sm">
                        N-s
                      </Text>
                    </Flex>
                    <Box>
                      <Slider
                        value={totalImpulse}
                        min={0}
                        max={500000}
                        onChange={val => {
                          setJustLoaded(false);
                          if (dryMass * totalDeltaV <= val) {
                            setTotalImpulse(val);
                          }
                        }}
                      >
                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                      </Slider>
                      <Flex align="center">
                        <Text color="gray.500" fontWeight="600" fontSize="xs">
                          0
                        </Text>
                        <Spacer />
                        <Text color="gray.500" fontWeight="600" fontSize="xs">
                          500k
                        </Text>
                      </Flex>
                    </Box>
                    <Text fontWeight="500" fontSize="2xs" color="gray.500">
                      Or adjust these sliders to specify the spacecraft dry mass
                      and mission delta-V.
                    </Text>
                  </Stack>

                  <Stack>
                    <Flex align="center">
                      <Text fontWeight="600" fontSize="sm" color="gray.500">
                        SPACECRAFT DRY MASS
                      </Text>
                      <Spacer />
                      <Text fontWeight="600" fontSize="sm" mr="2">
                        {dryMass === 0 ? '-' : dryMass}
                      </Text>
                      <Text fontWeight="400" fontSize="sm">
                        kg
                      </Text>
                    </Flex>
                    <Box>
                      <Slider
                        value={dryMass}
                        min={5}
                        max={100}
                        onChange={val => {
                          setJustLoaded(false);
                          setDryMass(val);
                        }}
                      >
                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                      </Slider>
                      <Flex align="center">
                        <Text color="gray.500" fontWeight="600" fontSize="xs">
                          5
                        </Text>
                        <Spacer />
                        <Text color="gray.500" fontWeight="600" fontSize="xs">
                          100
                        </Text>
                      </Flex>
                    </Box>
                  </Stack>

                  <Stack>
                    <Flex align="center">
                      <Text fontWeight="600" fontSize="sm" color="gray.500">
                        TOTAL MISSION DELTA-V
                      </Text>
                      <Spacer />
                      <Text fontWeight="600" fontSize="sm" mr="2">
                        {totalDeltaV === 0 ? '-' : totalDeltaV}
                      </Text>
                      <Text fontWeight="400" fontSize="sm">
                        m/s
                      </Text>
                    </Flex>
                    <Box>
                      <Slider
                        value={totalDeltaV}
                        min={0}
                        max={1000}
                        onChange={val => {
                          setJustLoaded(false);
                          setTotalDeltaV(val);
                        }}
                      >
                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                      </Slider>
                      <Flex align="center">
                        <Text color="gray.500" fontWeight="600" fontSize="xs">
                          0
                        </Text>
                        <Spacer />
                        <Text color="gray.500" fontWeight="600" fontSize="xs">
                          1000
                        </Text>
                      </Flex>
                    </Box>
                  </Stack>

                  <Stack>
                    <Flex align="center">
                      <Text fontWeight="600" fontSize="sm" color="gray.500">
                        CHEMICAL/ELECTRIC RATIO
                      </Text>
                      <Spacer />
                      <Text fontWeight="600" fontSize="sm">
                        {chemicalElectricRatio === 0
                          ? '0% / 100%'
                          : `${chemicalElectricRatio}% / ${
                              100 - chemicalElectricRatio
                            }%`}
                      </Text>
                    </Flex>
                    <Box>
                      <Slider
                        value={chemicalElectricRatio}
                        min={0}
                        max={100}
                        onChange={val => {
                          setJustLoaded(false);
                          setChemicalElectricRatio(val);
                        }}
                      >
                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                      </Slider>
                      <Flex align="center">
                        <Text color="gray.500" fontWeight="600" fontSize="xs">
                          0% Chemical / 100% Electric
                        </Text>
                        <Spacer />
                        <Text color="gray.500" fontWeight="600" fontSize="xs">
                          100% Chemical / 0% Electric
                        </Text>
                      </Flex>
                    </Box>
                  </Stack>
                </Stack>
              </Box>
            </CardBody>
          </Card>
        </Container>
        <Container maxW="container.xl">
          <Card>
            <CardBody>
              <Stack
                direction={{ base: 'column', md: 'row' }}
                spacing="4"
                mb="4"
              >
                <Flex align="center">
                  <Text color="gray.500" fontWeight="700" fontSize="md" mr="2">
                    Total Impulse:
                  </Text>
                  <Text fontWeight="600" fontSize="md" mr="2">
                    {totalImpulse === 0
                      ? 0.0
                      : (totalImpulse / 1000).toFixed(2)}
                  </Text>
                  <Text fontWeight="400" fontSize="md">
                    kN-s
                  </Text>
                </Flex>

                <Flex align="center">
                  <Text color="gray.500" fontWeight="700" fontSize="md" mr="2">
                    Total Delta-V:
                  </Text>
                  <Text fontWeight="700" fontSize="md" mr="1">
                    {totalDeltaV === 0 ? '-' : totalDeltaV}
                  </Text>
                  <Text>m/s</Text>
                </Flex>

                <Flex align="center">
                  <Text color="gray.500" fontWeight="700" fontSize="md" mr="2">
                    Dry Mass:
                  </Text>
                  <Text fontWeight="600" fontSize="md" mr="2">
                    {dryMass === 0 ? '-' : dryMass}
                  </Text>
                  <Text fontWeight="400" fontSize="md">
                    kg
                  </Text>
                </Flex>
              </Stack>

              <Box>
                <TableContainer>
                  <Table variant="simple" size="sm" whiteSpace="wrap">
                    <Thead>
                      <Tr>
                        <Th>Parameters</Th>
                        <Th>Unit</Th>
                        <Th isNumeric>100 W</Th>
                        <Th isNumeric>150 W</Th>
                        <Th isNumeric>200 W</Th>
                        <Th isNumeric>250 W</Th>
                        <Th isNumeric>300 W</Th>
                        <Th isNumeric>500 W</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>OrbitShift System Dry Mass, less tank</Td>
                        <Td>kg</Td>
                        <Td isNumeric>
                          {totalImpulse === 0
                            ? 5
                            : (0.00008333333 * totalImpulse + 5).toFixed(2)}
                        </Td>
                        <Td isNumeric>
                          {totalImpulse === 0
                            ? 5
                            : (0.00008333333 * totalImpulse + 5).toFixed(2)}
                        </Td>
                        <Td isNumeric>
                          {totalImpulse === 0
                            ? 5
                            : (0.00009166666 * totalImpulse + 5).toFixed(2)}
                        </Td>
                        <Td isNumeric>
                          {totalImpulse === 0
                            ? 5
                            : (0.00009166666 * totalImpulse + 5).toFixed(2)}
                        </Td>
                        <Td isNumeric>
                          {totalImpulse === 0
                            ? 5
                            : (0.0001 * totalImpulse + 5).toFixed(2)}
                        </Td>
                        <Td isNumeric>
                          {totalImpulse === 0
                            ? 5
                            : (0.0001 * totalImpulse + 5).toFixed(2)}
                        </Td>
                      </Tr>

                      <Tr>
                        <Td>Total Chemical Propellant Mass</Td>
                        <Td>kg</Td>
                        <Td isNumeric>
                          {totalImpulse === 0
                            ? 0
                            : (
                                4.33333333 *
                                Math.pow(10, -5) *
                                totalImpulse *
                                ((chemicalElectricRatio * 2) / 100).toFixed(2)
                              ).toFixed(2)}
                        </Td>
                        <Td isNumeric>
                          {totalImpulse === 0
                            ? 0
                            : (
                                3.77 *
                                Math.pow(10, -5) *
                                totalImpulse *
                                ((chemicalElectricRatio * 2) / 100).toFixed(2)
                              ).toFixed(2)}
                        </Td>
                        <Td isNumeric>
                          {totalImpulse === 0
                            ? 0
                            : (
                                3.2799 *
                                Math.pow(10, -5) *
                                totalImpulse *
                                ((chemicalElectricRatio * 2) / 100).toFixed(2)
                              ).toFixed(2)}
                        </Td>
                        <Td isNumeric>
                          {totalImpulse === 0
                            ? 0
                            : (
                                2.853513 *
                                Math.pow(10, -5) *
                                totalImpulse *
                                ((chemicalElectricRatio * 2) / 100).toFixed(2)
                              ).toFixed(2)}
                        </Td>
                        <Td isNumeric>
                          {totalImpulse === 0
                            ? 0
                            : (
                                2.48255631 *
                                Math.pow(10, -5) *
                                totalImpulse *
                                ((chemicalElectricRatio * 2) / 100).toFixed(2)
                              ).toFixed(2)}
                        </Td>
                        <Td isNumeric>
                          {totalImpulse === 0
                            ? 0
                            : (
                                2.15982399 *
                                Math.pow(10, -5) *
                                totalImpulse *
                                ((chemicalElectricRatio * 2) / 100).toFixed(2)
                              ).toFixed(2)}
                        </Td>
                      </Tr>

                      <Tr>
                        <Td>Electric Propellant Mass</Td>
                        <Td>kg</Td>
                        <Td isNumeric>
                          {totalImpulse === 0
                            ? 0
                            : (
                                0.00005 *
                                totalImpulse *
                                (
                                  ((100 - chemicalElectricRatio) * 2) /
                                  100
                                ).toFixed(2)
                              ).toFixed(2)}
                        </Td>
                        <Td isNumeric>
                          {totalImpulse === 0
                            ? 0
                            : (
                                4.35 *
                                Math.pow(10, -5) *
                                totalImpulse *
                                (
                                  ((100 - chemicalElectricRatio) * 2) /
                                  100
                                ).toFixed(2)
                              ).toFixed(2)}
                        </Td>
                        <Td isNumeric>
                          {totalImpulse === 0
                            ? 0
                            : (
                                3.7845 *
                                Math.pow(10, -5) *
                                totalImpulse *
                                (
                                  ((100 - chemicalElectricRatio) * 2) /
                                  100
                                ).toFixed(2)
                              ).toFixed(2)}
                        </Td>
                        <Td isNumeric>
                          {totalImpulse === 0
                            ? 0
                            : (
                                3.292515 *
                                Math.pow(10, -5) *
                                totalImpulse *
                                (
                                  ((100 - chemicalElectricRatio) * 2) /
                                  100
                                ).toFixed(2)
                              ).toFixed(2)}
                        </Td>
                        <Td isNumeric>
                          {totalImpulse === 0
                            ? 0
                            : (
                                2.86448805 *
                                Math.pow(10, -5) *
                                totalImpulse *
                                (
                                  ((100 - chemicalElectricRatio) * 2) /
                                  100
                                ).toFixed(2)
                              ).toFixed(2)}
                        </Td>
                        <Td isNumeric>
                          {totalImpulse === 0
                            ? 0
                            : (
                                2.4921046 *
                                Math.pow(10, -5) *
                                totalImpulse *
                                (
                                  ((100 - chemicalElectricRatio) * 2) /
                                  100
                                ).toFixed(2)
                              ).toFixed(2)}
                        </Td>
                      </Tr>

                      <Tr>
                        <Td>Total Chem. Propellant Volume @ 2600 psi</Td>
                        <Td>L</Td>
                        <Td isNumeric>
                          {totalImpulse === 0
                            ? 0
                            : (0.00005 * totalImpulse).toFixed(2)}
                        </Td>
                        <Td isNumeric>
                          {totalImpulse === 0
                            ? 0
                            : (4.35 * Math.pow(10, -5) * totalImpulse).toFixed(
                                2
                              )}
                        </Td>
                        <Td isNumeric>
                          {totalImpulse === 0
                            ? 0
                            : (
                                3.7845 *
                                Math.pow(10, -5) *
                                totalImpulse
                              ).toFixed(2)}
                        </Td>
                        <Td isNumeric>
                          {totalImpulse === 0
                            ? 0
                            : (
                                3.292515 *
                                Math.pow(10, -5) *
                                totalImpulse
                              ).toFixed(2)}
                        </Td>
                        <Td isNumeric>
                          {totalImpulse === 0
                            ? 0
                            : (
                                2.86448805 *
                                Math.pow(10, -5) *
                                totalImpulse
                              ).toFixed(2)}
                        </Td>
                        <Td isNumeric>
                          {totalImpulse === 0
                            ? 0
                            : (
                                2.4921046 *
                                Math.pow(10, -5) *
                                totalImpulse
                              ).toFixed(2)}
                        </Td>
                      </Tr>

                      <Tr>
                        <Td>EP Propellant Mass</Td>
                        <Td>kg</Td>
                        <Td isNumeric>
                          {totalImpulse === 0
                            ? 0
                            : (
                                3.33333333 *
                                Math.pow(10, -5) *
                                totalImpulse
                              ).toFixed(2)}
                        </Td>
                        <Td isNumeric>
                          {totalImpulse === 0
                            ? 0
                            : (2.9 * Math.pow(10, -5) * totalImpulse).toFixed(
                                2
                              )}
                        </Td>
                        <Td isNumeric>
                          {totalImpulse === 0
                            ? 0
                            : (2.523 * Math.pow(10, -5) * totalImpulse).toFixed(
                                2
                              )}
                        </Td>
                        <Td isNumeric>
                          {totalImpulse === 0
                            ? 0
                            : (
                                2.19501 *
                                Math.pow(10, -5) *
                                totalImpulse
                              ).toFixed(2)}
                        </Td>
                        <Td isNumeric>
                          {totalImpulse === 0
                            ? 0
                            : (
                                1.9096587 *
                                Math.pow(10, -5) *
                                totalImpulse
                              ).toFixed(2)}
                        </Td>
                        <Td isNumeric>
                          {totalImpulse === 0
                            ? 0
                            : (
                                1.66140307 *
                                Math.pow(10, -5) *
                                totalImpulse
                              ).toFixed(2)}
                        </Td>
                      </Tr>
                    </Tbody>
                    <Tfoot>
                      <Tr>
                        <Th>OrbitShift System Wet Mass</Th>
                        <Th>kg</Th>
                        <Th isNumeric>
                          {totalImpulse === 0
                            ? 5
                            : (
                                2.16666667 * Math.pow(10, -4) * totalImpulse +
                                5
                              ).toFixed(2)}
                        </Th>
                        <Th isNumeric>
                          {totalImpulse === 0
                            ? 5
                            : (
                                1.93533333 * Math.pow(10, -4) * totalImpulse +
                                5
                              ).toFixed(2)}
                        </Th>
                        <Th isNumeric>
                          {totalImpulse === 0
                            ? 5
                            : (
                                1.87540667 * Math.pow(10, -4) * totalImpulse +
                                5
                              ).toFixed(2)}
                        </Th>
                        <Th isNumeric>
                          {totalImpulse === 0
                            ? 5
                            : (
                                1.75077047 * Math.pow(10, -4) * totalImpulse +
                                5
                              ).toFixed(2)}
                        </Th>
                        <Th isNumeric>
                          {totalImpulse === 0
                            ? 5
                            : (
                                1.72567031 * Math.pow(10, -4) * totalImpulse +
                                5
                              ).toFixed(2)}
                        </Th>
                        <Th isNumeric>
                          {totalImpulse === 0
                            ? 5
                            : (
                                1.63133317 * Math.pow(10, -4) * totalImpulse +
                                5
                              ).toFixed(2)}
                        </Th>
                      </Tr>
                    </Tfoot>
                  </Table>
                </TableContainer>
              </Box>
            </CardBody>
          </Card>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App;
