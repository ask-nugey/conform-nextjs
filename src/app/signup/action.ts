"use server";

import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";

import { createSignupSchema } from "@/app/signup/schema";

export async function signup(prevState: unknown, formData: FormData) {
  const submission = await parseWithZod(formData, {
    schema: (control) =>
      // create a zod schema base on the control
      createSignupSchema(control, {
        isUsernameUnique(username) {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(username !== "admin");
            }, Math.random() * 300);
          });
        },
      }),
    async: true,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  redirect(`/?value=${JSON.stringify(submission.value)}`);
}
