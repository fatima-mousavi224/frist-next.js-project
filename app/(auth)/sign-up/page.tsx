"use client";

import React from "react";

import AuthForm from "@/components/forms/AuthForm";
import { SignUpSchema } from "@/lib/validation";

const SignIn = () => {
  return (
    <AuthForm
    formType="SIGN_UP"
        schema={SignUpSchema}
        defaultValues={{email: "", password: "", name: "", userName: ""}}
        onSubmit={(data) => Promise.resolve({success: true, data })}/>
  );
};

export default SignIn;