'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Controller,
  DefaultValues,
  FieldValue,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import ROUTES from '@/constant/routes';

interface AuthFormProps<T extends FieldValues> {
  schema: z.ZodType;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean }>;
  formType: 'SIGN_IN' | 'SIGN_UP';
}

const AuthForm = <T extends FieldValues>({
  schema,
  defaultValues,
  formType,
  onSubmit,
}: AuthFormProps<T>) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handelSubmit: SubmitHandler<T> = async () => {};

  const buttonText = formType === 'SIGN_IN' ? 'Sign In' : 'Sign Up';

  return (
    <Card className="w-full sm:max-w-md border-none bg-cover background-light800_dark200 ">
      {buttonText}
      <CardHeader>
      </CardHeader>
      <CardContent>
        <form className=' space-y-6' id="form-rhf-input" onSubmit={form.handleSubmit(handelSubmit)}>
          {Object.keys(defaultValues).map((field) => (
            <FieldGroup key={field}>
              <Controller
                name={field as Path<T>}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className='flex-col flex w-full gap-3' data-invalid={fieldState.invalid}>
                    <FieldLabel className='paragraph-medium text-dark400_light700' htmlFor="form-rhf-input-username">
                      {field.name === 'email' ? 'Email Address' : field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                    </FieldLabel>
                    <Input
                      {...field}

                      required 
                      type={field.name === "password" ? "password" : "text"}
                      id="form-rhf-input-username"
                      aria-invalid={fieldState.invalid}
                      className='paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus min-h-12 rounded-1.5 border'
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </FieldGroup>
          ))}
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button disabled={form.formState.isSubmitting} className='primary-gradient paragraph-medium min-h-12 w-full rounded-2 px-4 py-3 font-inter !text-light-900 ' form="form-rhf-input">
           {form.formState.isSubmitting ? buttonText === "Sign In" ? "Signing in..." : "Signing up..." : buttonText}
          </Button>
        </Field>
        
      </CardFooter>
                {formType === "SIGN_IN" ? (
            <p className='pl-6'>Don't have an acount?{" "} <Link href={ROUTES.SIGN_UP} className='paragraph-semibold primary-text-gradient'>Sign up</Link></p>

          ) : <p className='pl-6'>Already have a acount?{" "} <Link href={ROUTES.SIGN_IN} className='paragraph-semibold primary-text-gradient'>Sign in</Link></p>}

    </Card>
  );
};

export default AuthForm;
