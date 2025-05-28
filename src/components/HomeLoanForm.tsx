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
  
    //loading state for async operations
    type LoanBreakdown = {
    loanAmount: number;
    termMonths: number;
    baseInterestRate: number;
    adjustedInterestRate: number;
    creditScoreMultiplier: number;
    houseAgeMultiplier: number;
    houseAgeCategory: string;
    };
    //result of loan calculation
    type LoanResult = {
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
    breakdown: LoanBreakdown;
    };

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LoanResult | null>(null);


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

  const formatLoanType = (type: string) => {
  switch (type) {
    case "fixed": return "Fixed Rate";
    case "variable": return "Variable Rate";
    case "interest-only": return "Interest Only";
    default: return type;
  }
};

const formatCreditScore = (score: string) => {
  switch (score) {
    case "excellent": return "Excellent";
    case "good": return "Good";
    case "poor": return "Poor";
    default: return score;
  }
};

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    
    setLoading(true);
    try {
        const response = await fetch("https://home-loan.matthayward.workers.dev/calculate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            loanType: formatLoanType(formData.loanType),
            loanAmount: parseFloat(formData.loanAmount),
            term: parseInt(formData.termYears),
            creditScore: formatCreditScore(formData.creditScore),
            houseAge: parseInt(formData.houseAge),
        }),
        });
        
        if (!response.ok) {
        throw new Error("Failed to fetch loan calculation.");
        }
        // Parse the JSON response
        const data = await response.json();
        console.log("Loan Calculation Result:", data);
        setResult(data); // Store the result in state for further use or display
    } catch (error) {
        console.error(error);
        alert("An error occurred while calculating the loan.");
    } finally {
        setLoading(false);
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

      {/*handles selection*/}  
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
            colorScheme="blue"
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
      {result && (
        <Box mt={10} p={6} borderWidth={1} borderRadius="md" boxShadow="md" bg="gray.50">
            <Heading size="sm" mb={4}>Loan Results</Heading>
            <Text><strong>Monthly Payment:</strong> ${result.monthlyPayment.toFixed(2)}</Text>
            <Text><strong>Total Payment:</strong> ${result.totalPayment.toFixed(2)}</Text>
            <Text><strong>Total Interest:</strong> ${result.totalInterest.toFixed(2)}</Text>

            <Box mt={4}>
            <Heading size="xs" mb={2}>Breakdown</Heading>
            <Text><strong>Loan Amount:</strong> ${result.breakdown.loanAmount}</Text>
            <Text><strong>Term (months):</strong> {result.breakdown.termMonths}</Text>
            <Text><strong>Base Interest Rate:</strong> {result.breakdown.baseInterestRate}%</Text>
            <Text><strong>Adjusted Interest Rate:</strong> {result.breakdown.adjustedInterestRate}%</Text>
            <Text><strong>Credit Score Multiplier:</strong> {result.breakdown.creditScoreMultiplier}</Text>
            <Text><strong>House Age Multiplier:</strong> {result.breakdown.houseAgeMultiplier}</Text>
            <Text><strong>House Age Category:</strong> {result.breakdown.houseAgeCategory}</Text>
            </Box>
        </Box>
        )}
    </Box>
  );
}
