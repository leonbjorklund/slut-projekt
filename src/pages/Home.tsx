import { Box, Center, Grid, Heading, Text, Flex } from "@chakra-ui/react";
import OverviewCard from "../components/OverviewCard";
import { useProducts } from "../context/productContext";

function Home() {
  const { products } = useProducts();

  return (
    <div>
      <Flex
        w='full'
        h='65vh'
        bgImage='linear-gradient(to bottom, rgba(255,255,255,0.2), rgba(255,255,255,0.3)), url(/hero-md.svg)'
        bgSize='cover'
        bgPos={{ base: "left", md: "center" }}
        flexDir='column'
        justifyContent='center'
        alignItems={{ base: "center", md: "flex-start" }}
      >
        <Box pl={{ base: 0, md: "18rem" }}>
          <Text fontSize='lg'>Handmade ceramic vases</Text>
          <Heading fontSize='6xl' fontFamily='losta-masta'>
            Get groovy with
            <br /> our spring collection
          </Heading>
        </Box>
      </Flex>

      <Center pt={10}>
        <Heading fontSize='2xl' fontWeight='normal'>
          NYHETER
        </Heading>
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
          {products.map((product) => (
            <OverviewCard key={product.id} product={product} />
          ))}
        </Grid>
      </Center>
    </div>
  );
}

export default Home;
