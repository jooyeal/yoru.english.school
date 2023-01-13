import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import axios, { AxiosResponse } from "axios";
import { Configuration, CreateCompletionResponse, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const exampleRouter = createTRPCRouter({
  fix: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input }) => {
      try {
        const res: AxiosResponse<CreateCompletionResponse, any> =
          await axios.post(
            "https://api.openai.com/v1/edits",
            {
              model: "text-davinci-edit-001",
              input: input.text,
              instruction:
                "Fix the spelling mistakes and Fix the grammar as well",
              temperature: 0.7,
              top_p: 1,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${
                  process.env.NEXT_PUBLIC_OPENAI_API_KEY || ""
                }`,
              },
            }
          );
        const fixedData = res.data.choices[0]?.text;

        if (fixedData) {
          return fixedData;
        }
        return null;
      } catch (e) {
        console.error(e);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: String(e),
        });
      }
    }),
  talk: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input }) => {
      try {
        const response = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: input.text,
          max_tokens: 256,
          temperature: 0.7,
          top_p: 1,
        });
        const text = response.data.choices[0]?.text;

        if (text) {
          return text;
        }
        return null;
      } catch (e) {
        console.error(e);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: String(e),
        });
      }
    }),
});
