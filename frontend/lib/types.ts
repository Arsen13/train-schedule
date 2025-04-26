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

export const CreateRecordSchema = z.object({
  trainNumber: z.coerce.number().min(1),
  railwayNumber: z.coerce.number().min(1),
  departureStation: z.string().min(1),
  arrivalStation: z.string().min(1),
  arrivalTime: z
    .string()
    .transform((val) => new Date(val))
    .refine((val) => !isNaN(val.getTime()), {
      message: "Invalid date",
    }),
  departureTime: z
    .string()
    .transform((val) => new Date(val))
    .refine((val) => !isNaN(val.getTime()), {
      message: "Invalid date",
    }),
});

export interface PostOptions {
  returnRes: boolean;
}
