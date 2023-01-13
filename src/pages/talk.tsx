import React, { useEffect, useRef, useState } from "react";
import { type NextPage } from "next";
import Layout from "../components/Layout";
import {
  Box,
  Button,
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import BottomTab from "../components/BottomTab";
import { api } from "../utils/api";

const Talk: NextPage = () => {
  const toast = useToast();
  const [messages, setMessages] = useState<
    { text: string; sender: "user" | "ai" }[]
  >([]);
  const [userText, setUserText] = useState<string>();
  const ref = useRef<HTMLDivElement>(null);

  const { mutate, isLoading } = api.openai.talk.useMutation({
    onSuccess: (message) => {
      if (message) {
        setMessages((prev) => [...prev, { text: message, sender: "ai" }]);
      }
    },
    onError: (e) =>
      toast({
        title: e.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      }),
  });

  useEffect(() => {
    mutate({ text: "please say hello, my friend!" });
  }, [mutate]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const onClick = () => {
    if (userText) {
      setMessages((prev) => [...prev, { text: userText, sender: "user" }]);
      mutate({ text: userText });
      setUserText("");
    } else
      toast({
        title: "Please enter some texts",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
  };

  const scrollToBottom = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <Layout>
      <div className="p-6 pb-20">
        <VStack>
          <Text fontSize={20} color="white" fontWeight="bold">
            Please ask me anything!
          </Text>
          <VStack bgColor="blackAlpha.500" width="full" padding={3}>
            <Box
              h="96"
              bgColor="blackAlpha.500"
              w="full"
              p={2}
              color="white"
              rounded={5}
              overflow="scroll"
            >
              {messages.map((message, i) => (
                <Text
                  marginTop={5}
                  padding={2}
                  bgColor={
                    message.sender === "user" ? "orange.600" : "purple.800"
                  }
                  rounded={7}
                  key={i}
                  textAlign={message.sender === "ai" ? "left" : "right"}
                >
                  {message.text}
                </Text>
              ))}
              <div ref={ref}></div>
            </Box>
            <Textarea
              value={userText}
              color="white"
              rows={5}
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
          </VStack>
        </VStack>
      </div>
      <BottomTab />
    </Layout>
  );
};

export default Talk;
