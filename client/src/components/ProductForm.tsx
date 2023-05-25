import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Product } from "../context/productContext";

const ProductSchema = Yup.object().shape({
  title: Yup.string().required("Vänligen ange ett produktnamn"),
  description: Yup.string().required("Vänligen ange en beskrivning"),
  price: Yup.number()
    .positive("Ange ett pris över 0")
    .required("Vänligen ange ett pris"),
  image: Yup.string().url("Ogiltig url").required("Vänligen lägg till en bild"),
});

interface Props {
  product?: Product;
  onSubmit: (product: Product) => void;
}

function ProductForm({ product, onSubmit }: Props) {
  const navigate = useNavigate();
  const formik = useFormik<Product>({
    initialValues: product || {
      _id: Date.now().toString(),
      name: "" as string,
      description: "" as string,
      price: 1 as number,
      image: "",
      height: 10 as number,
      categories: [""],
      inStock: 0 as number,
    },
    validationSchema: ProductSchema,
    onSubmit: (values) => {
      onSubmit(values);
      navigate("/admin");
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} data-cy='product-form'>
      <Flex direction='row'>
        <Flex direction='column' align='center'>
          <Flex pb={4} w='100%' direction={{ base: "column", md: "row" }}>
            <FormControl mr={4}>
              <FormLabel>Name:</FormLabel>
              <Input
                data-cy='product-title'
                bg='whiteAlpha.900'
                size='md'
                type='text'
                name='title'
                id='title'
                focusBorderColor='yellow.400'
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name && (
                <Text color='red' fontSize='xs' data-cy='product-title-error'>
                  {formik.errors.name}
                </Text>
              )}
            </FormControl>

            <FormControl>
              <FormLabel>Height:</FormLabel>
              <InputGroup>
                <Input
                  bg='whiteAlpha.900'
                  size='md'
                  type='text'
                  name='height'
                  id='height'
                  focusBorderColor='yellow.400'
                  value={formik.values.height}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <InputRightAddon bg='brand.100' children='cm' />
              </InputGroup>
              {formik.touched.height && formik.errors.height && (
                <Text color='red' fontSize='xs'>
                  {formik.errors.height}
                </Text>
              )}
            </FormControl>
          </Flex>

          <Flex pb={4} w='100%' direction={{ base: "column", md: "row" }}>
            <FormControl>
              <FormLabel>Image:</FormLabel>
              <Input
                data-cy='product-image'
                bg='whiteAlpha.900'
                size='md'
                type='file'
                name='image'
                id='image'
                focusBorderColor='yellow.400'
                value={formik.values.image}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {formik.touched.image && formik.errors.image && (
                <Text data-cy='product-image-error' fontSize='xs' color='red'>
                  {formik.errors.image}
                </Text>
              )}
            </FormControl>
          </Flex>

          <Flex w='100%' pb={4} flexDir={{ base: "column", md: "row" }}>
            <FormControl mr={4}>
              <FormLabel>Price:</FormLabel>
              <InputGroup>
                <Input
                  data-cy='product-price'
                  bg='whiteAlpha.900'
                  size='md'
                  type='text'
                  name='price'
                  id='price'
                  focusBorderColor='yellow.400'
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <InputRightAddon bg='brand.100' children='SEK' />
              </InputGroup>
              {formik.touched.price && formik.errors.price && (
                <Text data-cy='product-price-error' fontSize='xs' color='red'>
                  {formik.errors.price}
                </Text>
              )}
            </FormControl>
            <FormControl mr={4}>
              <FormLabel>Stock quantity:</FormLabel>
              <InputGroup>
                <Input
                  data-cy='product-price'
                  bg='whiteAlpha.900'
                  size='md'
                  type='text'
                  name='price'
                  id='price'
                  focusBorderColor='yellow.400'
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </InputGroup>
              {formik.touched.price && formik.errors.price && (
                <Text data-cy='product-price-error' fontSize='xs' color='red'>
                  {formik.errors.price}
                </Text>
              )}
            </FormControl>
          </Flex>

          <Flex w='100%' direction={{ base: "column", md: "row" }}>
            <FormControl>
              <FormLabel>Description:</FormLabel>
              <Textarea
                data-cy='product-description'
                bg='whiteAlpha.900'
                size='md'
                name='description'
                id='description'
                focusBorderColor='yellow.400'
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.description && formik.errors.description && (
                <Text
                  data-cy='product-description-error'
                  fontSize='xs'
                  color='red'
                >
                  {formik.errors.description}
                </Text>
              )}
            </FormControl>
          </Flex>

          <Flex py={8}>
            <Button
              variant='outline'
              borderColor='yellow.400'
              color='black'
              borderRadius='none'
              borderWidth='1px'
              type='submit'
              w={28}
              mr={24}
              _hover={{ bg: "orange.100" }}
            >
              Save
            </Button>
            <Link to='/admin'>
              <Button
                variant='outline'
                borderColor='yellow.400'
                color='black'
                borderRadius='none'
                borderWidth='1px'
                w={28}
                _hover={{ bg: "orange.100" }}
              >
                Exit
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </form>
  );
}

export default ProductForm;
