import { z } from "zod";

export const taskSchema = z.object({
  content: z.string(),
  completed: z.boolean().optional(),
});

export const todosSchema = z.object({
  title: z.string(),
  tasks: z.array(taskSchema).nonempty(),
});
