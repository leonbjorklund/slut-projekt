import {
  Button,
  Checkbox,
  CheckboxGroup,
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
import { Product, ProductCreate } from "../context/productContext";

const ProductSchema = Yup.object().shape({
  name: Yup.string().required("Please provide a productname"),
  description: Yup.string().required("Please provide a description"),
  price: Yup.number()
    .positive("Price must be higher than 0")
    .required("Please add a price"),
  image: Yup.string().required("Please add a valid image"),
  categories: Yup.array()
    .min(1, "Choose at least one category")
    .required("Choose at least one category"),
  inStock: Yup.number().required("Choose stock quantitys"),
});

interface PropsEdit {
  product: Product;
  onSubmit: (product: Product) => void;
}

interface PropsCreate {
  product?: Product;
  onSubmit: (product: ProductCreate) => void;
}

type Props = PropsCreate | PropsEdit;

function ProductForm({ product, onSubmit }: Props) {
  const navigate = useNavigate();

  const formik = useFormik<ProductCreate>({
    initialValues: product || {
      name: "" as string,
      description: "" as string,
      price: 1 as number,
      image: "",
      height: 10 as number,
      categories: [],
      inStock: 0 as number,
    },
    validationSchema: ProductSchema,
    onSubmit: (values) => {
      onSubmit(values as any);
      navigate("/admin");
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch("/api/file", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const id = await response.json();
      formik.setFieldValue("image", id);
    } else {
      console.log("Error to fetch id");
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} data-cy='product-form'>
      <Flex direction='row'>
        <Flex direction='column' align='center'>
          <Flex pb={4} w='100%' direction={{ base: "column", md: "row" }}>
            <FormControl mr={4}>
              <FormLabel fontSize='sm'>Name:</FormLabel>
              <Input
                data-cy='product-title'
                size='sm'
                type='text'
                name='name'
                id='name'
                borderRadius='none'
                borderColor='blackAlpha.400'
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
              <FormLabel fontSize='sm'>Height:</FormLabel>
              <InputGroup>
                <Input
                  size='sm'
                  type='text'
                  name='height'
                  id='height'
                  borderRadius='none'
                  borderColor='blackAlpha.400'
                  focusBorderColor='yellow.400'
                  value={formik.values.height}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <InputRightAddon
                  borderRadius='none'
                  bg='brand.100'
                  children='cm'
                  borderColor='blackAlpha.400'
                  height='xxs'
                />
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
              <FormLabel fontSize='sm'>Image:</FormLabel>
              <Input
                data-cy='product-image'
                size='sm'
                type='file'
                name='image'
                id='image'
                borderRadius='none'
                border='none'
                onChange={handleImageUpload}
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
              <FormLabel fontSize='sm'>Price:</FormLabel>
              <InputGroup>
                <Input
                  data-cy='product-price'
                  size='sm'
                  type='text'
                  name='price'
                  id='price'
                  borderRadius='none'
                  borderColor='blackAlpha.400'
                  focusBorderColor='yellow.400'
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <InputRightAddon
                  borderColor='blackAlpha.400'
                  borderRadius='none'
                  bg='brand.100'
                  children='SEK'
                  height='xxs'
                  fontSize='sm'
                />
              </InputGroup>
              {formik.touched.price && formik.errors.price && (
                <Text data-cy='product-price-error' fontSize='xs' color='red'>
                  {formik.errors.price}
                </Text>
              )}
            </FormControl>
            <FormControl mr={4}>
              <FormLabel fontSize='sm'>Stock quantity:</FormLabel>
              <Input
                size='sm'
                type='text'
                name='inStock'
                id='inStock'
                borderRadius='none'
                borderColor='blackAlpha.400'
                focusBorderColor='yellow.400'
                value={formik.values.inStock}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.inStock && formik.errors.inStock && (
                <Text fontSize='xs' color='red'>
                  {formik.errors.inStock}
                </Text>
              )}
            </FormControl>
          </Flex>

          <Flex w='100%' pb={4} direction={{ base: "column", md: "row" }}>
            <FormControl>
              <FormLabel fontSize='sm'>Categories:</FormLabel>
              <CheckboxGroup
                onChange={(selectedCategories) =>
                  formik.setFieldValue("categories", selectedCategories)
                }
                value={formik.values.categories}
              >
                <Flex direction='row'>
                  <Checkbox value='glass' marginRight={3} colorScheme='yellow'>
                    Glass
                  </Checkbox>
                  <Checkbox
                    value='ceramic'
                    marginRight={3}
                    colorScheme='yellow'
                  >
                    Ceramic
                  </Checkbox>
                </Flex>
              </CheckboxGroup>
              {formik.touched.categories && formik.errors.categories && (
                <Text
                  data-cy='product-categories-error'
                  fontSize='xs'
                  color='red'
                >
                  {formik.errors.categories}
                </Text>
              )}
            </FormControl>
          </Flex>

          <Flex w='100%' direction={{ base: "column", md: "row" }}>
            <FormControl>
              <FormLabel fontSize='sm'>Description:</FormLabel>
              <Textarea
                data-cy='product-description'
                placeholder='Add you description here..'
                size='sm'
                borderRadius='none'
                name='description'
                id='description'
                borderColor='blackAlpha.400'
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
                type='button'
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
