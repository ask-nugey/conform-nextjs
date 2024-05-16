"use client";

import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useFormState } from "react-dom";

import { login } from "@/app/login/action";
import { loginSchema } from "@/app/login/schema";
import { Button } from "@/components/Button";

export default function Page() {
  const [lastResult, action] = useFormState(login, undefined);
  const [form, fields] = useForm({
    // Sync the result of last submission
    lastResult,

    // Reuse the validation logic on the client
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: loginSchema });
    },

    // Validate the form on blur event triggered
    shouldValidate: "onBlur",
  });

  return (
    <form action={action} {...getFormProps(form)}>
      <div>
        <label>Email</label>
        <input
          className={!fields.email.valid ? "error" : ""}
          {...getInputProps(fields.email, { type: "text" })}
          key={fields.email.key}
        />
        <div>{fields.email.errors}</div>
      </div>

      <div>
        <label>Password</label>
        <input
          className={!fields.password.valid ? "error" : ""}
          {...getInputProps(fields.password, { type: "password" })}
          key={fields.password.key}
        />
        <div>{fields.password.errors}</div>
      </div>

      <label>
        <div>
          <span>Remember me</span>
          <input {...getInputProps(fields.remember, { type: "checkbox" })} />
        </div>
      </label>

      <hr />

      <Button>Login</Button>
    </form>
  );
}
