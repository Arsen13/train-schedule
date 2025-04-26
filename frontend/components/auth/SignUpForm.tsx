"use client";

import Link from "next/link";
import InputField from "./InputField";
import AuthButton from "./AuthButton";
import { SignUpSchema } from "@/lib/types";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import signUp from "@/app/signup/signUp";

export default function SignUpForm() {
  const router = useRouter();

  const handleSignUp = async (formData: FormData) => {
    const result = SignUpSchema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
      let errorMessage = "";
      result.error.issues.forEach(
        (issue) => (errorMessage += `${issue.path[0]}: ${issue.message}. \n`)
      );
      toast.error(errorMessage);
      return;
    }

    const userData = await signUp(formData);
    localStorage.setItem("user", JSON.stringify(userData));
    toast.success("Successfully sign up");
    router.push("/");
  };
  return (
    <form action={handleSignUp} className="w-72 mt-4">
      <InputField
        type="text"
        name="email"
        label="Email"
        placeholder="lviv@gmail.com"
      />

      <InputField
        type="text"
        name="stationName"
        label="Station Name"
        placeholder="Lviv"
      />

      <InputField
        type="password"
        name="password"
        label="Password"
        placeholder="qwerty"
      />

      <InputField
        type="password"
        name="confirmPassword"
        label="Confirm password"
        placeholder="qwerty"
      />

      <div className="flex flex-col my-2">
        <Link href="/login" className="hover:underline">
          Already have an account?
        </Link>

        <AuthButton title={"Sign Up"} />
      </div>
    </form>
  );
}
