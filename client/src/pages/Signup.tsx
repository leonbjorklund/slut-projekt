import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup, Heading, Text, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import TextField from "../components/TextField";
import { useAccount } from "../context/accountContext";

export default function SignUp() {
  const { create, login } = useAccount();
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
            login(email, password);
            actions.resetForm();
            navigate("/");
          })
          .catch((error) => {
            const errorMessage = JSON.parse(error.message);
            console.log(errorMessage);
            setError(errorMessage);
          });
      }}
    >
      <VStack
        as={Form}
        w={{ base: "60%" }}
        minW='280px'
        m='auto'
        justify='center'
        h='calc(100vh - 320px)'
        spacing='1rem'
      >
        <Heading as='h2' size='md' textTransform='uppercase'>
          Sign Up
        </Heading>

        <TextField
          bg='brand.100'
          size='md'
          borderRadius='none'
          focusBorderColor='blackAlpha.400'
          borderColor='blackAlpha.400'
          name='email'
          placeholder='Enter email'
          autoComplete='off'
          label='Email'
        />

        <TextField
          bg='brand.100'
          size='md'
          borderRadius='none'
          focusBorderColor='blackAlpha.400'
          borderColor='blackAlpha.400'
          name='password'
          placeholder='Enter password'
          autoComplete='off'
          label='Password'
          type='password'
        />
        <Text as='p' color='red.500'>
          {error}
        </Text>

        <ButtonGroup pt='1rem' spacing={12}>
          <Button
            variant='outline'
            borderColor='yellow.400'
            color='black'
            borderRadius='none'
            borderWidth='1px'
            fontSize='sm'
            type='submit'
            _hover={{ bg: "orange.100" }}
          >
            Create Account
          </Button>
          <Button
            variant='outline'
            borderColor='yellow.400'
            color='black'
            borderRadius='none'
            borderWidth='1px'
            fontSize='sm'
            _hover={{ bg: "orange.100" }}
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
