"use client";

import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useFormState } from "react-dom";

import { login } from "./action";
import { loginSchema } from "./schema";

import { Button } from "@/components/Button";

export default function Page() {
  const [lastResult, action] = useFormState(login, undefined);
  const [form, fields] = useForm({
    lastResult, // 前回のフォーム送信結果
    onValidate({ formData }) {
      // フォームデータをZodでバリデーション
      return parseWithZod(formData, { schema: loginSchema });
    },
    shouldValidate: "onBlur", // フィールドのフォーカスが外れたときにバリデーションを実行
  });

  return (
    <form action={action} {...getFormProps(form)}>
      <div>
        <label>Email：</label>
        <input
          className={!fields.email.valid ? "error" : ""}
          {...getInputProps(fields.email, { type: "text" })}
          key={fields.email.key}
        />
        <div>{fields.email.errors}</div>
      </div>

      <div>
        <label>Password：</label>
        <input
          className={!fields.password.valid ? "error" : ""}
          {...getInputProps(fields.password, { type: "password" })}
          key={fields.password.key}
        />
        <div>{fields.password.errors}</div>
      </div>

      <label>
        <div>
          <span>Remember me：</span>
          <input {...getInputProps(fields.remember, { type: "checkbox" })} />
        </div>
      </label>

      <br />

      <Button>Login</Button>
    </form>
  );
}
