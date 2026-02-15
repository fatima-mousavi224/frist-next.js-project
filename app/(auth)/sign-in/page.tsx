"use client";
import AuthForm from "@/components/forms/AuthForm";
// import { signUpWithCredentials } from "@/lib/actions/auth.action";
import { SignInSchema } from "@/lib/validation";
import { email, success } from "zod";

const SignUp = () => {
  return (
    <AuthForm 
    formType="SIGN_IN"
    schema={SignInSchema}
    defaultValues={{email: "", password: ""}}
    onSubmit={(data) => Promise.resolve({success: true, data })}/>
  );
};

export default SignUp;