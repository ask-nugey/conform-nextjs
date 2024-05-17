"use server";

import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";

import { todosSchema } from "./schema";

export async function createTodos(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: todosSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  redirect(`/?value=${JSON.stringify(submission.value)}`);
}
