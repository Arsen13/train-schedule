import SignUpForm from "@/components/auth/SignUpForm";

export default function SignUp() {
  return (
    <>
      <div className="flex bg-widget mx-auto mt-36 border p-6 border-amber-100 rounded-md max-w-lg flex-col items-center justify-center">
        <div className="flex items-center justify-center text-center">
          <h1 className="text-2xl">Sign Up</h1>
        </div>
        <SignUpForm />
      </div>
    </>
  );
}
