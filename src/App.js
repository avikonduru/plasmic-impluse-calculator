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
  const [dryMass, setDryMass] = useState(200);
  const [totalDeltaV, setTotalDeltaV] = useState(500);
  const [chemicalElectricRatio, setChemicalElectricRatio] = useState(50);
  const [powerLevel, setPowerLevel] = useState(50);

  const [totalImpulse, setTotalImpulse] = useState(0);

  const [systemDryMass, setSystemDryMass] = useState(6);
  const [chemicalPropellantMass, setChemicalPropellantMass] = useState(19);
  const [electricPropellantMass, setElectricPropellantMass] = useState(19);
  const [tankMass, setTankMass] = useState(0);

  const [epThrust, setEpThrust] = useState(0);
  const [chemicalThrust, setChemicalThrust] = useState(0);
  const [systemWetMass, setSystemWetMass] = useState(0);

  useEffect(() => {
    setTotalImpulse(dryMass * totalDeltaV);
  }, [dryMass, totalDeltaV]);

  useEffect(() => {
    if (powerLevel <= 150) {
      setSystemDryMass(6);
    } else if (powerLevel <= 450 && powerLevel > 150) {
      setSystemDryMass(8);
    } else if (powerLevel <= 1000 && powerLevel > 450) {
      setSystemDryMass(10);
    }
  }, [powerLevel]);

  useEffect(() => {
    setChemicalPropellantMass(
      chemicalElectricRatio * totalImpulse * (19 / 5000000)
    );
  }, [chemicalElectricRatio, totalImpulse]);

  useEffect(() => {
    setChemicalThrust(
      (100 - chemicalElectricRatio) * totalImpulse * (1 / 1250000)
    );
  }, [chemicalElectricRatio, totalImpulse]);

  useEffect(() => {
    if (powerLevel >= 50 && powerLevel < 150) {
      setEpThrust(chemicalElectricRatio * totalImpulse * (5 / 5000000));
    } else if (powerLevel >= 150 && powerLevel < 300) {
      setEpThrust(chemicalElectricRatio * totalImpulse * (10 / 5000000));
    } else if (powerLevel >= 300 && powerLevel < 450) {
      setEpThrust(chemicalElectricRatio * totalImpulse * (15 / 5000000));
    } else if (powerLevel >= 450 && powerLevel < 1000) {
      setEpThrust(chemicalElectricRatio * totalImpulse * (25 / 5000000));
    } else if (powerLevel >= 1000) {
      setEpThrust(chemicalElectricRatio * totalImpulse * (50 / 5000000));
    }
  }, [chemicalElectricRatio, totalImpulse, powerLevel]);

  useEffect(() => {
    if (powerLevel >= 50 && powerLevel < 150) {
      setElectricPropellantMass(
        (100 - chemicalElectricRatio) * totalImpulse * (8 / 5000000)
      );
    } else if (powerLevel >= 150 && powerLevel < 300) {
      setElectricPropellantMass(
        (100 - chemicalElectricRatio) * totalImpulse * (5.6 / 5000000)
      );
    } else if (powerLevel >= 300 && powerLevel < 450) {
      setElectricPropellantMass(
        (100 - chemicalElectricRatio) * totalImpulse * (3.92 / 5000000)
      );
    } else if (powerLevel >= 450 && powerLevel < 1000) {
      setElectricPropellantMass(
        (100 - chemicalElectricRatio) * totalImpulse * (2.744 / 5000000)
      );
    } else if (powerLevel >= 1000) {
      setElectricPropellantMass(
        (100 - chemicalElectricRatio) * totalImpulse * (1.9208 / 5000000)
      );
    }
  }, [chemicalElectricRatio, totalImpulse, powerLevel]);

  useEffect(() => {
    if (powerLevel >= 50 && powerLevel < 150) {
      setTankMass(chemicalElectricRatio * totalImpulse * (2 / 5000000));
    } else if (powerLevel >= 150 && powerLevel < 300) {
      setTankMass(chemicalElectricRatio * totalImpulse * (11.4 / 5000000));
    } else if (powerLevel >= 300 && powerLevel < 450) {
      setTankMass(chemicalElectricRatio * totalImpulse * (9.918 / 5000000));
    } else if (powerLevel >= 450 && powerLevel < 1000) {
      setTankMass(chemicalElectricRatio * totalImpulse * (8.62866 / 5000000));
    } else if (powerLevel >= 1000) {
      setTankMass(chemicalElectricRatio * totalImpulse * (7.5069342 / 5000000));
    }
  }, [chemicalElectricRatio, totalImpulse, powerLevel]);

  useEffect(() => {
    setSystemWetMass(
      systemDryMass + chemicalPropellantMass + electricPropellantMass + tankMass
    );
  }, [systemDryMass, chemicalPropellantMass, electricPropellantMass, tankMass]);

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
                        min={100}
                        max={500}
                        step={1}
                        onChange={val => {
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
                          100
                        </Text>
                        <Spacer />
                        <Text color="gray.500" fontWeight="600" fontSize="xs">
                          500
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
                        step={1}
                        onChange={val => {
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
                        min={20}
                        max={80}
                        step={10}
                        onChange={val => {
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
                          20% Chemical / 80% Electric
                        </Text>
                        <Spacer />
                        <Text color="gray.500" fontWeight="600" fontSize="xs">
                          80% Chemical / 20% Electric
                        </Text>
                      </Flex>
                    </Box>
                  </Stack>

                  <Stack>
                    <Flex align="center">
                      <Text fontWeight="600" fontSize="sm" color="gray.500">
                        POWER LEVEL
                      </Text>
                      <Spacer />
                      <Text fontWeight="600" fontSize="sm" mr="2">
                        {powerLevel}
                      </Text>
                      <Text fontWeight="400" fontSize="sm">
                        N-s
                      </Text>
                    </Flex>
                    <Box>
                      <Slider
                        value={powerLevel}
                        min={50}
                        max={1000}
                        step={50}
                        onChange={val => {
                          setPowerLevel(val);
                        }}
                      >
                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                      </Slider>
                      <Flex align="center">
                        <Text color="gray.500" fontWeight="600" fontSize="xs">
                          50
                        </Text>
                        <Spacer />
                        <Text color="gray.500" fontWeight="600" fontSize="xs">
                          1000
                        </Text>
                      </Flex>
                    </Box>
                  </Stack>
                </Stack>
              </Box>
            </CardBody>
          </Card>
        </Container>
        <Container maxW="container.md">
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
                      : ((totalDeltaV * dryMass) / 1).toFixed(0)}
                  </Text>
                  <Text fontWeight="400" fontSize="md">
                    N-s
                  </Text>
                </Flex>
              </Stack>

              <Box>
                <TableContainer>
                  <Table variant="simple" size="lg" whiteSpace="wrap">
                    <Thead>
                      <Tr>
                        <Th>Parameters</Th>
                        <Th>Unit</Th>
                        <Th isNumeric>Amount</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>OrbitShift Dry Mass, excl. tanks</Td>
                        <Td>kg</Td>
                        <Td isNumeric>
                          {systemDryMass === 0 ? 0 : systemDryMass.toFixed(2)}
                        </Td>
                      </Tr>

                      <Tr>
                        <Td>Chemical Propellant Mass</Td>
                        <Td>kg</Td>
                        <Td isNumeric>
                          {chemicalPropellantMass === 0
                            ? 0
                            : chemicalPropellantMass.toFixed(2)}
                        </Td>
                      </Tr>

                      <Tr>
                        <Td>Electric Propellant Mass</Td>
                        <Td>kg</Td>
                        <Td isNumeric>
                          {electricPropellantMass === 0
                            ? 0
                            : electricPropellantMass.toFixed(2)}
                        </Td>
                      </Tr>

                      <Tr>
                        <Td>Mass of 3D Printed Tank **</Td>
                        <Td>kg</Td>
                        <Td isNumeric>
                          {tankMass === 0 ? 0 : tankMass.toFixed(2)}
                        </Td>
                      </Tr>

                      <Tr>
                        <Td>EP Thrust</Td>
                        <Td>mN</Td>
                        <Td isNumeric>
                          {epThrust === 0 ? 0 : epThrust.toFixed(2)}
                        </Td>
                      </Tr>

                      <Tr>
                        <Td>Chemical Thrust</Td>
                        <Td>N</Td>
                        <Td isNumeric>
                          {chemicalThrust === 0 ? 0 : chemicalThrust.toFixed(2)}
                        </Td>
                      </Tr>
                    </Tbody>
                    <Tfoot>
                      <Tr>
                        <Th>OrbitShift System Wet Mass</Th>
                        <Th>kg</Th>
                        <Th isNumeric>
                          {systemWetMass === 0 ? 0 : systemWetMass.toFixed(2)}
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
