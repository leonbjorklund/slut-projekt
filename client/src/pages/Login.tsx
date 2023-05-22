import { Button, ButtonGroup, Heading, Text, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import TextField from "../components/TextField";
import { useAccount } from "../context/accountContext";

export default function Login() {
  const { setUser } = useAccount();

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
        const vals = { ...values };
        actions.resetForm();
        fetch("http://localhost:3000/api/users/login", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(vals),
        })
          .catch((err) => {
            return err;
          })
          .then((res) => {
            if (!res || !res.ok || res.status >= 400) {
              return;
            }
            return res.json();
          })
          .then((data) => {
            if (!data) return;
            setUser({ ...data });
            navigate("/");
          });
      }}
    >
      <VStack
        as={Form}
        w={{ base: "90%", md: "500px" }}
        m='auto'
        justify='center'
        h='calc(100vh - 320px)'
        my='auto'
        display='flex'
        spacing='1rem'
      >
        <Heading>Log in!</Heading>
        <Text as='p' color='red.500'>
          {error}
        </Text>
        <TextField
          color='#1A202C'
          border='1px solid rgba(0, 0, 0, 0.2)'
          name='email'
          placeholder='Enter email'
          autoComplete='off'
          label='Email'
        />

        <TextField
          color='#1A202C'
          border='1px solid rgba(0, 0, 0, 0.2)'
          name='password'
          placeholder='Enter password'
          autoComplete='off'
          label='Password'
          type='password'
        />

        <ButtonGroup pt='1rem' spacing={24}>
          <Button colorScheme='green' type='submit'>
            Log In
          </Button>
          <Button colorScheme='blackAlpha' onClick={() => navigate("/signup")}>
            Sign up
          </Button>
        </ButtonGroup>
      </VStack>
    </Formik>
  );
}
