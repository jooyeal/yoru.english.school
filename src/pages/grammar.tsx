import {
  Button,
  Text,
  Textarea,
  VStack,
  useToast,
  Box,
} from "@chakra-ui/react";
import { type NextPage } from "next";
import React, { useState } from "react";
import BottomTab from "../components/BottomTab";
import Layout from "../components/Layout";
import { api } from "../utils/api";

const Grammar: NextPage = () => {
  const toast = useToast();
  const [userText, setUserText] = useState<string>();
  const { data, mutate, isLoading } = api.openai.fix.useMutation({
    onError: (e) =>
      toast({
        title: e.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      }),
  });
  const onClick = () => {
    if (userText) mutate({ text: userText });
    else
      toast({
        title: "Please enter some texts",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
  };

  return (
    <Layout>
      <div className="p-6 pb-20">
        <VStack>
          <Text fontSize={20} color="white" fontWeight="bold">
            Hello, everyone! I'll help to improve your english skill.
          </Text>
          <Text fontSize={20} color="white" fontWeight="bold">
            If you show me some texts, I can correct the grammar and spelling as
            well
          </Text>
          <VStack bgColor="blackAlpha.500" width="full" padding={3}>
            <Textarea
              color="white"
              rows={10}
              onChange={(e) => setUserText(e.target.value)}
            />
            <Button
              isLoading={isLoading}
              width="full"
              className="uppercase"
              colorScheme="whiteAlpha"
              onClick={onClick}
            >
              submit
            </Button>
            <Box
              minH={80}
              bgColor="blackAlpha.500"
              w="full"
              p={2}
              color="white"
              rounded={5}
            >
              {data}
            </Box>
          </VStack>
        </VStack>
      </div>
      <BottomTab />
    </Layout>
  );
};

export default Grammar;
