"use client";

import { useFormStatus } from "react-dom";
export const Button = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const { pending } = useFormStatus();

  return <button {...props} disabled={pending || props.disabled} />;
};
