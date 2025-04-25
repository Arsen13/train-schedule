"use client";

import Link from "next/link";
import InputField from "./InputField";
import AuthButton from "./AuthButton";
import { LoginSchema } from "@/lib/types";
import toast from "react-hot-toast";

export default function LoginForm() {
  const handleLogin = (formData: FormData) => {
    const result = LoginSchema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
      let errorMessage = "";
      result.error.issues.forEach(
        (issue) => (errorMessage += `${issue.path[0]}: ${issue.message}. \n`)
      );
      toast.error(errorMessage);
      return;
    }

    console.log(result.data);
    toast.success("Successfully login");
  };

  return (
    <form action={handleLogin}>
      <InputField
        type="text"
        name="email"
        label="Email"
        placeholder="lviv@gmail.com"
      />

      <InputField
        type="password"
        name="password"
        label="Password"
        placeholder="qwerty"
      />

      <div className="my-2 flex flex-col">
        <Link href="/signup" className="hover:underline">
          Don&apos;t have an account?
        </Link>

        <AuthButton title={"Login"} />
      </div>
    </form>
  );
}
