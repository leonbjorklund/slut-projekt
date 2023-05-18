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
  name: Yup.string()
    .min(2, "Namnet måste innehålla minst två bokstäver")
    .required("Vänligen ange ditt namn"),
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
      name: "",
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
              <Flex>
                <FormControl mr={6}>
                  <FormLabel fontSize='sm' mb={0} pl={2}>
                    Namn
                  </FormLabel>
                  <Input
                    data-cy='customer-name'
                    bg='brand.100'
                    size='md'
                    borderRadius='none'
                    focusBorderColor='blackAlpha.400'
                    borderColor='blackAlpha.400'
                    name='name'
                    type='text'
                    id='name'
                    autoComplete='name'
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <Text
                      pl={2}
                      fontSize='sm'
                      data-cy='customer-name-error'
                      color='red'
                    >
                      {formik.errors.name}
                    </Text>
                  )}
                </FormControl>

                <FormControl>
                  <FormLabel fontSize='sm' mb={0} pl={2}>
                    Telefonnummer
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
              </Flex>

              <FormControl>
                <FormLabel fontSize='sm' mb={0} pl={2}>
                  Adress
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
                    Postnummer
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
                    Postort
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
                  Mejladdress
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
                  Slutför beställning
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
