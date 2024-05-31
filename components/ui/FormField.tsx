'use client'
import { useEffect } from 'react';
import { FieldError, FieldValues, UseFormRegister } from 'react-hook-form';
import { Input } from './input';
import { Textarea } from './textarea';
import { ToastAction } from './toast';
import { useToast } from './use-toast';

type FormFieldProps<T extends FieldValues> = {
  type: string;
  placeholder: string;
  name: keyof T;
  register: UseFormRegister<T>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
  rows?: number;
  showToast?: boolean;
};

const FormField = <T extends FieldValues>({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
  rows,
  showToast,
}: FormFieldProps<T>) => {
  const { toast } = useToast();

  useEffect(() => {
    if (error && showToast)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message,
        action: <ToastAction altText="Try again">Réessayer</ToastAction>,
      })
  }, [error]);

  return (
    <>
      {type === 'textarea' ? (
        <>
          <Textarea
            placeholder={placeholder}
            rows={5}
            className={`form_input ${error ? 'border-red-500 placeholder-red-500' : 'focus:border-b focus:border-black'}`}
            {...register(name as any)}
          />
          {!showToast && error && <span>{error.message}</span>}
        </>
      ) : (
        <>
          <Input
            type={type}
            placeholder={placeholder}
            className={`form_input ${error ? 'border-red-500 placeholder-red-500' : 'focus:border-b focus:border-black'}`}
            {...register(name as any, { valueAsNumber })}
          />
          {!showToast && error && <span className='text-red-600 text-xs'>{error.message}</span>}
        </>
      )}
    </>
  )
}

export default FormField;