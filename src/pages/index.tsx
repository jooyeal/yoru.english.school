import { Button, Text, VStack } from "@chakra-ui/react";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>YORULEARNING</title>
        <meta
          name="description"
          content="This website is built for personal studying in English"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <VStack>
          {Array.from({ length: 20 }).map((_, i) => (
            <Text color="white" fontSize={24} fontWeight="bold" key={i}>
              WELCOME TO YORU LEARNING!
            </Text>
          ))}
        </VStack>
        <VStack>
          <Text color="white" fontSize={24} fontWeight="bold"></Text>
        </VStack>
        <Link href="/grammar">
          <Button
            className="bottom-6 left-1/2 -translate-x-1/2 uppercase"
            variant="solid"
            colorScheme="blackAlpha"
            size="lg"
            position="fixed"
          >
            lets learn
          </Button>
        </Link>
      </Layout>
    </>
  );
};

export default Home;
