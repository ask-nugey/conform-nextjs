"use server";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";

import { loginSchema } from "./schema";
export async function login(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: loginSchema,
  });

  // バリデーション失敗時の処理
  if (submission.status !== "success") {
    return submission.reply();
  }

  // バリデーション成功時にリダイレクト
  redirect(`/?value=${JSON.stringify(submission.value)}`);
}
