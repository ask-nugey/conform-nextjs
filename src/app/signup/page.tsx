"use client";

import { useForm, getFormProps, getInputProps } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useFormState } from "react-dom";

import { signup } from "@/app/signup/action";
import { createSignupSchema } from "@/app/signup/schema";
import { Button } from "@/components/Button";

export default function Page() {
  const [lastResult, action] = useFormState(signup, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        // Create the schema without any constraint defined
        schema: (control) => createSignupSchema(control),
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
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
