'use client';

import Link from "next/link";

import FormField from "@/components/ui/FormField";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {FormLoginSchema, FormRegisterSchema} from "@/lib/schema";
import {FormDataLogin, FormDataRegister} from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const {register, handleSubmit, formState: {errors}} = useForm<FormDataRegister>({
    resolver: zodResolver(FormRegisterSchema),
  });

  const onSubmit = (data: FormDataLogin) => {
    console.log(data); 
  }


  function isPasswordConfirmMatching(password: string, passwordConfirm: string) {
    return password === passwordConfirm
  }


  return (

    <div className="w-full h-screen flex md:justify-center md:items-center">
      <Card className="md:mx-auto md:max-w-sm border-0 shadow-none w-full md:border md:shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <FormField
                type={'text'}
                placeholder={'E-mail'}
                name={'email'}
                register={register}
                error={errors.email}
                showToast={true}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <FormField
                type={'text'}
                placeholder={'username'}
                name={'username'}
                register={register}
                error={errors.username}
                showToast={true}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <FormField
                type={'password'}
                placeholder={'password'}
                name={'password'}
                register={register}
                error={errors.password}
                showToast={true}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password_confirm">Password Confirm</Label>
              <FormField
                type={'password'}
                placeholder={'password confirm'}
                name={'password_confirm'}
                register={register}
                error={errors.password_confirm}
                showToast={true}
              />
            </div>

            <Button type="submit" className="w-full mt-6">
              Create an account
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account? &nbsp;
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}