'use client';
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
import { useToast } from '@/components/ui/use-toast';
import { FormRegisterSchema } from "@/lib/schema";
import { FormDataRegister } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";


export default function RegisterPage() {
  const {register, handleSubmit, formState: {errors}} = useForm<FormDataRegister>({
    resolver: zodResolver(FormRegisterSchema),
  });
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [registerSuccess, setRegisterSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if(registerSuccess)
      toast({
        variant: "success",
        title: "Registration successful",
        description: registerSuccess,
      });
    if (registerError)
      toast({
        variant: "destructive",
        title: "Error while registering",
        description: registerError,
      });
  }, [registerError, registerSuccess]);


  const onSubmit = async (data: FormDataRegister) => {
    setIsLoading(true);
    setRegisterError(null);
    setRegisterSuccess(null);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      setIsLoading(false);
      if (response.status !== 201) {
        const errorData = await response.json();
        console.warn(errorData);
        setRegisterError(errorData.message || 'Registration failed');
      } else {
        router.push('/');
        setRegisterSuccess('Registration successful');
        setRegisterError(null); // Réinitialiser l'erreur en cas de succès
      }
    } catch (error) {
      setIsLoading(false);
      setRegisterError('An unexpected error occurred');
    }
  };
  
  
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
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ?
                (<div role="status">
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5 animate-spin fill-black text-gray-200 dark:placeholder-gray-500"
                    viewBox="0 0 100 101"
                    fill="none"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>) :
                (<>Register</>)
              }
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account? &nbsp;
            <Link href={'/login'} className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}