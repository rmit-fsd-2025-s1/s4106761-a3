import {
  Box,
  Flex,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Select,
  Heading,
  Button,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

//To add to other files later
export default function HomeLoanForm() {
    //tracks user input
  const [formData, setFormData] = useState({
    loanType: "",
    loanAmount: "",
    termYears: "",
    creditScore: "",
    houseAge: "",
  });
  //validates errors
  const [errors, setErrors] = useState({
    loanType: "",
    loanAmount: "",
    termYears: "",
    creditScore: "",
    houseAge: "",
  });

  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {
      loanType: "",
      loanAmount: "",
      termYears: "",
      creditScore: "",
      houseAge: "",
    };
    let valid = true;

    //form must be full
    if (!formData.loanType) {
      newErrors.loanType = "Loan type is required.";
      valid = false;
    }   
    //amount mustbe positive
    const amount = parseFloat(formData.loanAmount);
    if (!amount || amount <= 0) {
      newErrors.loanAmount = "Loan amount must be a positive number.";
      valid = false;
    }
    //term must be positive and within range
    const term = parseInt(formData.termYears);
    if (!term || term <= 0) {
      newErrors.termYears = "Term must be a positive number.";
      valid = false;
    } else {
      if (formData.loanType === "interest-only" && term > 10) {
        newErrors.termYears = "Interest-only loans must be 1–10 years.";
        valid = false;
      } else if (term > 30) {
        newErrors.termYears = "Term must be between 1 and 30 years.";
        valid = false;
      }
    }
    //credit score must be selected
    if (!formData.creditScore) {
      newErrors.creditScore = "Credit score is required.";
      valid = false;
    }
    //house age must be positive
    const houseAge = parseInt(formData.houseAge);
    if (houseAge < 0 || isNaN(houseAge)) {
      newErrors.houseAge = "House age must be 0 or more.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
        setLoading(true);
        console.log("Form is valid:", formData);

        // Simulate API call delay for dev purposes
        setTimeout(() => {
        setLoading(false); 
        alert("Temp Calc complete");
        }, 3000);
    }
    };

  return (
    <Box
        as="form"
        onSubmit={handleSubmit}
        p={6}
        borderWidth={1}
        borderRadius="md"
        boxShadow="md"
        maxW="1000"
        w="60%"
        mx="auto"
        mt={16}
        >
      <Heading size="md" mb={6}>
        Home Loan Calculator
      </Heading>

      <Grid gap={4}>
        <GridItem>
          <FormControl isRequired>
            <Flex align="center" gap={4}>
              <FormLabel htmlFor="loanType" w="40%">
                Loan Type
              </FormLabel>
              <Select
                name="loanType"
                value={formData.loanType}
                onChange={(e) =>
                  setFormData({ ...formData, loanType: e.target.value })
                }
                placeholder="Select loan type"
                w="60%"
              >
                <option value="fixed">Fixed Rate</option>
                <option value="variable">Variable Rate</option>
                <option value="interest-only">Interest Only</option>
              </Select>
            </Flex>
            {errors.loanType && <Text color="red.500">{errors.loanType}</Text>}
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl isRequired>
            <Flex align="center" gap={4}>
              <FormLabel htmlFor="loanAmount" w="40%">
                Loan Amount ($)
              </FormLabel>
              <Input
                name="loanAmount"
                type="number"
                min={1}
                placeholder="Enter loan amount"
                value={formData.loanAmount}
                onChange={(e) =>
                  setFormData({ ...formData, loanAmount: e.target.value })
                }
                w="60%"
              />
            </Flex>
            {errors.loanAmount && (
              <Text color="red.500">{errors.loanAmount}</Text>
            )}
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl isRequired>
            <Flex align="center" gap={4}>
              <FormLabel htmlFor="termYears" w="40%">
                Term (Years)
              </FormLabel>
              <Input
                name="termYears"
                type="number"
                min={1}
                max={30}
                placeholder="1–30 years"
                value={formData.termYears}
                onChange={(e) =>
                  setFormData({ ...formData, termYears: e.target.value })
                }
                w="60%"
              />
            </Flex>
            {errors.termYears && (
              <Text color="red.500">{errors.termYears}</Text>
            )}
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl isRequired>
            <Flex align="center" gap={4}>
              <FormLabel htmlFor="creditScore" w="40%">
                Credit Score
              </FormLabel>
              <Select
                name="creditScore"
                value={formData.creditScore}
                onChange={(e) =>
                  setFormData({ ...formData, creditScore: e.target.value })
                }
                placeholder="Select credit score"
                w="60%"
              >
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="poor">Poor</option>
              </Select>
            </Flex>
            {errors.creditScore && (
              <Text color="red.500">{errors.creditScore}</Text>
            )}
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl isRequired>
            <Flex align="center" gap={4}>
              <FormLabel htmlFor="houseAge" w="40%">
                House Age (Years)
              </FormLabel>
              <Input
                name="houseAge"
                type="number"
                min={0}
                placeholder="Enter house age"
                value={formData.houseAge}
                onChange={(e) =>
                  setFormData({ ...formData, houseAge: e.target.value })
                }
                w="60%"
              />
            </Flex>
            {errors.houseAge && (
              <Text color="red.500">{errors.houseAge}</Text>
            )}
          </FormControl>
        </GridItem>
      </Grid>

      {/* Submit button with full width  couldnt implement from prior resources*/}
      <Box mt={8}>
        <Button
            type="submit"
            variant="solid"
            colorScheme="red"
            width="100%"
            isLoading={loading}
            loadingText="Calculating..."
            _hover={{
                bg: "blue.600",
                color: "black",
                transform: "scale(1.10)",
                transition: "all 0.2s ease-in-out",
            }}
            >
            Calculate Loan
        </Button>
      </Box>
    </Box>
  );
}
