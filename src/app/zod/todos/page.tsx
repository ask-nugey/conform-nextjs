"use client";

import {
  useForm,
  getFormProps,
  getInputProps,
  getFieldsetProps,
} from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useFormState } from "react-dom";

import { createTodos } from "./action";
import { todosSchema } from "./schema";

import { Button } from "@/components/Button";

export default function Page() {
  const [lastResult, action] = useFormState(createTodos, undefined);
  const [form, fields] = useForm({
    lastResult, // 前回のフォーム送信結果
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: todosSchema });
    },
    shouldValidate: "onBlur", // フィールドのフォーカスが外れたときにバリデーションを実行
  });
  const tasks = fields.tasks.getFieldList();

  return (
    <form action={action} {...getFormProps(form)}>
      <div>
        <label>Title：</label>
        <input
          className={!fields.title.valid ? "error" : ""}
          {...getInputProps(fields.title, { type: "text" })}
          key={fields.title.key}
        />
        <div>{fields.title.errors}</div>
      </div>

      <br />

      <div className="form-error">{fields.tasks.errors}</div>
      {tasks.map((task, index) => {
        const taskFields = task.getFieldset();

        return (
          <fieldset key={task.key} {...getFieldsetProps(task)}>
            <div>
              <label>Task #{index + 1}</label>
              <input
                className={!taskFields.content.valid ? "error" : ""}
                {...getInputProps(taskFields.content, { type: "text" })}
                key={taskFields.content.key}
              />
              <div>{taskFields.content.errors}</div>
            </div>
            <div>
              <label>
                <span>Completed</span>
                <input
                  className={!taskFields.completed.valid ? "error" : ""}
                  {...getInputProps(taskFields.completed, {
                    type: "checkbox",
                  })}
                  key={taskFields.completed.key}
                />
              </label>
            </div>
            <Button
              {...form.remove.getButtonProps({
                name: fields.tasks.name,
                index,
              })}
            >
              Delete
            </Button>
            <Button
              {...form.reorder.getButtonProps({
                name: fields.tasks.name,
                from: index,
                to: 0,
              })}
            >
              Move to top
            </Button>
            <Button
              {...form.update.getButtonProps({
                name: task.name,
                value: { content: "" },
              })}
            >
              Clear
            </Button>
          </fieldset>
        );
      })}

      <br />

      <Button {...form.insert.getButtonProps({ name: fields.tasks.name })}>
        Add task
      </Button>

      <br />
      <br />

      <Button>Save</Button>
    </form>
  );
}
