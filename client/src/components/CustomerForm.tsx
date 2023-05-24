import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { Form, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useOrder } from "../context/orderContext";

const CustomerSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Förnamnet måste innehålla minst två bokstäver")
    .required("Vänligen ange ditt förnamn"),
  lastName: Yup.string()
    .min(2, "Efternamnet måste innehålla minst två bokstäver")
    .required("Vänligen ange ditt efternamn"),
  address: Yup.string()
    .min(4)
    .required("Vänligen ange din fullständiga adress"),
  zipcode: Yup.string().min(5).max(6).required("Vänligen ange ett postnummer"),
  city: Yup.string().min(2).required("Vänligen ange en stad"),
  email: Yup.string()
    .email("Vänligen ange en giltig mejladress")
    .required("Vänligen ange din mejladress"),
  phone: Yup.string().min(10).required("Vänligen ange ditt telefonnummer"),
});

export type CustomerValues = Yup.InferType<typeof CustomerSchema>;

function CustomerForm() {
  const { handleOrderSubmit } = useOrder();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      zipcode: "",
      city: "",
      email: "",
      phone: "",
    },
    validationSchema: CustomerSchema,
    onSubmit: (values) => {
      handleOrderSubmit(values);
      navigate("/confirmation");
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} data-cy='customer-form'>
      <Center>
        <Box w='80%' py={12}>
          <Flex
            flexDirection='column'
            alignItems='center'
            border='1px'
            borderColor='yellow.400'
          >
            <Stack my={14} spacing={8}>
              <Flex flexDirection='row'>
                <FormControl>
                  <FormLabel fontSize='sm' mb={0} pl={2}>
                    Firstname
                  </FormLabel>
                  <Flex flexDirection='row'>
                    <Input
                      data-cy='customer-firstName'
                      bg='brand.100'
                      size='md'
                      borderRadius='none'
                      focusBorderColor='blackAlpha.400'
                      borderColor='blackAlpha.400'
                      name='firstName'
                      type='text'
                      id='firstName'
                      autoComplete='given-name'
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                      <Text
                        pl={2}
                        fontSize='sm'
                        data-cy='customer-firstName-error'
                        color='red'
                      >
                        {formik.errors.firstName}
                      </Text>
                    )}
                  </Flex>
                </FormControl>
              </Flex>
              <FormControl>
                <FormLabel fontSize='sm' mb={0} pl={2}>
                  Lastname
                </FormLabel>
                <Flex flexDirection='row'>
                  <Input
                    data-cy='customer-lastName'
                    bg='brand.100'
                    size='md'
                    borderRadius='none'
                    focusBorderColor='blackAlpha.400'
                    borderColor='blackAlpha.400'
                    type='text'
                    name='lastName'
                    id='lastName'
                    autoComplete='family-name'
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.lastName && formik.errors.lastName && (
                    <Text
                      pl={2}
                      fontSize='sm'
                      data-cy='customer-lastName-error'
                      color='red'
                    >
                      {formik.errors.lastName}
                    </Text>
                  )}
                </Flex>
              </FormControl>

              <FormControl>
                <FormLabel fontSize='sm' mb={0} pl={2}>
                  Telephone:
                </FormLabel>
                <Input
                  data-cy='customer-phone'
                  bg='brand.100'
                  size='md'
                  borderRadius='none'
                  focusBorderColor='blackAlpha.400'
                  borderColor='blackAlpha.400'
                  type='text'
                  name='phone'
                  id='phone'
                  autoComplete='tel'
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <Text
                    pl={2}
                    fontSize='sm'
                    data-cy='customer-phone-error'
                    color='red'
                  >
                    {formik.errors.phone}
                  </Text>
                )}
              </FormControl>

              <FormControl>
                <FormLabel fontSize='sm' mb={0} pl={2}>
                  Address
                </FormLabel>
                <Input
                  data-cy='customer-address'
                  bg='brand.100'
                  size='md'
                  borderRadius='none'
                  focusBorderColor='blackAlpha.400'
                  borderColor='blackAlpha.400'
                  type='text'
                  name='address'
                  id='address'
                  autoComplete='street-address'
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.address && formik.errors.address && (
                  <Text
                    pl={2}
                    fontSize='sm'
                    data-cy='customer-address-error'
                    color='red'
                  >
                    {formik.errors.address}
                  </Text>
                )}
              </FormControl>
              <Flex>
                <FormControl mr={6}>
                  <FormLabel fontSize='sm' mb={0} pl={2}>
                    Zip-code:
                  </FormLabel>
                  <Input
                    data-cy='customer-zipcode'
                    bg='brand.100'
                    size='md'
                    borderRadius='none'
                    focusBorderColor='blackAlpha.400'
                    borderColor='blackAlpha.400'
                    type='text'
                    name='zipcode'
                    id='zipcode'
                    autoComplete='postal-code'
                    value={formik.values.zipcode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.zipcode && formik.errors.zipcode && (
                    <Text
                      pl={2}
                      fontSize='sm'
                      data-cy='customer-zipcode-error'
                      color='red'
                    >
                      {formik.errors.zipcode}
                    </Text>
                  )}
                </FormControl>

                <FormControl>
                  <FormLabel fontSize='sm' mb={0} pl={2}>
                    City
                  </FormLabel>
                  <Input
                    data-cy='customer-city'
                    bg='brand.100'
                    size='md'
                    borderRadius='none'
                    focusBorderColor='blackAlpha.400'
                    borderColor='blackAlpha.400'
                    type='text'
                    name='city'
                    id='city'
                    autoComplete='address-level2'
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.city && formik.errors.city && (
                    <Text
                      pl={2}
                      fontSize='sm'
                      data-cy='customer-city-error'
                      color='red'
                    >
                      {formik.errors.city}
                    </Text>
                  )}
                </FormControl>
              </Flex>

              <FormControl>
                <FormLabel fontSize='sm' mb={0} pl={2}>
                  E-mail:
                </FormLabel>
                <Input
                  data-cy='customer-email'
                  bg='brand.100'
                  size='md'
                  borderRadius='none'
                  focusBorderColor='blackAlpha.400'
                  borderColor='blackAlpha.400'
                  type='text'
                  name='email'
                  id='email'
                  autoComplete='email'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <Text
                    pl={2}
                    fontSize='sm'
                    data-cy='customer-email-error'
                    color='red'
                  >
                    {formik.errors.email}
                  </Text>
                )}
              </FormControl>

              <Center>
                <Button
                  type='submit'
                  bg='base.100'
                  borderColor='yellow.400'
                  borderRadius='none'
                  borderWidth='1.5px'
                  size='sm'
                  w={52}
                  h={12}
                  _hover={{ bg: "orange.100" }}
                >
                  Place order
                </Button>
              </Center>
            </Stack>
          </Flex>
        </Box>
      </Center>
    </Form>
  );
}

export default CustomerForm;
