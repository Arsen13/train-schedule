import { z } from "zod";

export interface InputFieldProps {
  type: string;
  name: string;
  label: string;
  placeholder: string;
}

export type AuthButtonProps = {
  title: string;
};

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const SignUpSchema = z
  .object({
    email: z.string().email(),
    stationName: z.string().min(2),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
