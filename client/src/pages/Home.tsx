import {
  Box,
  Center,
  Flex,
  Grid,
  Heading,
  Tab,
  TabList,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import OverviewCard from "../components/OverviewCard";
import { useProducts } from "../context/productContext";

interface ProductsLayoutProps {
  filterCategory: "glass" | "ceramic" | null;
}

function Home({ filterCategory }: ProductsLayoutProps) {
  const { products } = useProducts();

  const [selectedCategory, setSelectedCategory] = useState<
    "glass" | "ceramic" | null
  >(filterCategory);

  const filteredProductList = selectedCategory
    ? products.filter((product) => product.categories[0] === selectedCategory)
    : products;

  return (
    <>
      <Flex
        w='full'
        p={{ base: "1rem", md: "0" }}
        h='65vh'
        bgImage='linear-gradient(to bottom, rgba(255,255,255,0.2), rgba(255,255,255,0.3)), url(/hero-md.svg)'
        bgSize='cover'
        bgPos={{ base: "left", md: "center" }}
        flexDir='column'
        justifyContent='center'
        alignItems={{ base: "center", md: "flex-start" }}
      >
        <Box pl={{ base: 0, md: "18rem" }}>
          <Text fontSize='lg'>Handmade vases</Text>
          <Heading
            fontSize={{ base: "4xl", md: "6xl" }}
            fontFamily='losta-masta'
          >
            Get groovy with
            <br /> our spring collection
          </Heading>
        </Box>
      </Flex>

      <Center pt={10}>
        <Tabs
          variant='unstyled'
          mx={{ base: "1rem", md: "0" }}
          border='1px solid rgba(0, 0, 0, 0.2)'
          my={5}
          width={["100%", "100%", "98%", "62.5%"]}
          isFitted
          onChange={(index) => {
            if (index === 0) setSelectedCategory(null);
            if (index === 1) setSelectedCategory("glass");
            if (index === 2) setSelectedCategory("ceramic");
          }}
        >
          <TabList>
            <Tab
              fontSize={[".8rem", ".9rem", "1rem"]}
              _selected={{
                borderRight: "1px solid rgba(0, 0, 0, 0.4)",
                fontWeight: "bold",
              }}
            >
              ALL VASES
            </Tab>
            <Tab
              fontSize={[".8rem", ".9rem", "1rem"]}
              _selected={{
                borderRight: "1px solid rgba(0, 0, 0, 0.4)",
                borderLeft: "1px solid rgba(0, 0, 0, 0.4)",
                fontWeight: "bold",
              }}
            >
              GLASS
            </Tab>
            <Tab
              fontSize={[".8rem", ".9rem", "1rem"]}
              _selected={{
                borderLeft: "1px solid rgba(0, 0, 0, 0.4)",
                fontWeight: "bold",
              }}
            >
              CERAMIC
            </Tab>
          </TabList>
        </Tabs>
      </Center>

      <Center>
        <Grid
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
          ]}
          columnGap={24}
          rowGap={8}
          py={8}
        >
          {filteredProductList
            .slice()
            .reverse()
            .map((product) => (
              <OverviewCard key={product._id} product={product} />
            ))}
        </Grid>
      </Center>
    </>
  );
}

export default Home;
