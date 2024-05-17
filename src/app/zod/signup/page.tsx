"use client";

import { useForm, getFormProps, getInputProps } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useFormState } from "react-dom";

import { signup } from "./action";
import { createSignupSchema } from "./schema";

import { Button } from "@/components/Button";

export default function Page() {
  const [lastResult, action] = useFormState(signup, undefined);
  const [form, fields] = useForm({
    lastResult, // 前回のフォーム送信結果
    onValidate({ formData }) {
      // フォームデータをZodでバリデーション
      return parseWithZod(formData, {
        // 制約なしでスキーマを作成
        schema: (control) => createSignupSchema(control),
      });
    },
    shouldValidate: "onBlur", // フィールドのフォーカスが外れたときにバリデーションを実行
    shouldRevalidate: "onInput", // フィールドの入力時に再バリデーションを実行
  });

  return (
    <form action={action} {...getFormProps(form)}>
      <label>
        <div>Username：</div>
        <input
          className={!fields.username.valid ? "error" : ""}
          {...getInputProps(fields.username, { type: "text" })}
          key={fields.username.key}
        />
        <div>{fields.username.errors}</div>
      </label>

      <label>
        <div>Password：</div>
        <input
          className={!fields.password.valid ? "error" : ""}
          {...getInputProps(fields.password, { type: "password" })}
          key={fields.password.key}
        />
        <div>{fields.password.errors}</div>
      </label>

      <label>
        <div>Confirm Password：</div>
        <input
          className={!fields.confirmPassword.valid ? "error" : ""}
          {...getInputProps(fields.confirmPassword, { type: "password" })}
          key={fields.confirmPassword.key}
        />
        <div>{fields.confirmPassword.errors}</div>
      </label>

      <br />

      <Button>Signup</Button>
    </form>
  );
}
