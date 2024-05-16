"use server";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";

import { loginSchema } from "@/app/login/schema";
export async function login(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: loginSchema,
  });
  if (submission.status !== "success") {
    return submission.reply();
  }

  redirect(`/?value=${JSON.stringify(submission.value)}`);
}
