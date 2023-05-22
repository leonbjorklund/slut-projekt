import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup, Heading, Text, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import TextField from "../components/TextField";
import { useAccount } from "../context/accountContext";

export default function SignUp() {
  const { create } = useAccount();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .required("Email is required")
          .email("Must be a valid email address"),
        password: Yup.string()
          .required("Password is required")
          .min(6, "Password too short")
          .max(28, "Password too long"),
      })}
      onSubmit={(values, actions) => {
        const { email, password } = values;

        create(email, password)
          .then(() => {
            actions.resetForm();
            navigate("/");
          })
          .catch((error) => {
            setError(error.message);
          });
      }}
    >
      <VStack
        as={Form}
        w={{ base: "90%", md: "500px" }}
        m='auto'
        justify='center'
        h='100vh'
        spacing='1rem'
      >
        <Heading>Sign Up</Heading>
        <Text as='p' color='red.500'>
          {error}
        </Text>
        <TextField
          bg='#343541'
          color='white'
          border='1px solid rgba(255, 255, 255, 0.2)'
          name='email'
          placeholder='Enter email'
          autoComplete='off'
          label='Email'
        />

        <TextField
          bg='#343541'
          color='white'
          border='1px solid rgba(255, 255, 255, 0.2)'
          name='password'
          placeholder='Enter password'
          autoComplete='off'
          label='Password'
          type='password'
        />

        <ButtonGroup pt='1rem'>
          <Button colorScheme='green' type='submit'>
            Create Account
          </Button>
          <Button
            colorScheme='blackAlpha'
            onClick={() => navigate("/login")}
            leftIcon={<ArrowBackIcon />}
          >
            Back
          </Button>
        </ButtonGroup>
      </VStack>
    </Formik>
  );
}
