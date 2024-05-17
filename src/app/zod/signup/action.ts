"use server";

import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";

import { createSignupSchema } from "./schema";

export async function signup(prevState: unknown, formData: FormData) {
  const submission = await parseWithZod(formData, {
    schema: (control) =>
      // create a zod schema base on the control
      createSignupSchema(control, {
        isUsernameUnique(username) {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(username !== "admin"); // "admin"ユーザ名は既に使用されていると見なす
            }, Math.random() * 300);
          });
        },
      }),
    async: true, // 非同期バリデーションを実行
  });

  // バリデーション失敗時の処理
  if (submission.status !== "success") {
    return submission.reply();
  }

  // バリデーション成功時にリダイレクト
  redirect(`/?value=${JSON.stringify(submission.value)}`);
}
