'use client';
import Link from 'next/link';
import FormField from '@/components/ui/FormField';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { FormLoginSchema } from '@/lib/schema';
import { FormDataLogin } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm} from 'react-hook-form';
import { signIn, SignInResponse} from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormDataLogin>({
    resolver: zodResolver(FormLoginSchema)
  });
  const [loginError, setLoginError] = useState<string | null>(null);
  const { toast } = useToast();

  const onSubmit = async (data: FormDataLogin) => {
    const result: SignInResponse | undefined = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false
    });

    if (result?.error) {
      setLoginError(result.error);
    } else {
      setLoginError(null);
    }
  };
  

  useEffect(() => {
    if (loginError)
      toast({
        variant: "destructive",
        title: "Invalid credentials",
        description: "Please check your email and password and try again.",
      })
  }, [loginError]);


  return (
    <>
      <div className="w-full h-screen flex md:justify-center md:items-center">
        <Card className="md:mx-auto md:max-w-sm border-0 shadow-none w-full md:border md:shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
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
              <div className="grid gap-2 mb-6">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link href="#" className="ml-auto inline-block text-sm underline">
                    Forgot your password?
                  </Link>
                </div>
                <FormField
                  type={'password'}
                  placeholder={'Password'}
                  name={'password'}
                  register={register}
                  error={errors.password}
                  showToast={true}
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
