import React, { useState } from 'react';
import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { set, z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createProfile } from '@/utils/api';
import { Spinner } from '@/components/ui/spinner';

const formSchema = z.object({
  adress: z.string().min(2, {
    message: 'Adress must be at least 2 characters.',
  }),
  userBio: z.string().min(2, {
    message: 'Bio must be at least 2 characters.',
  }),

  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  useremail: z.string().min(2, {
    message: 'Please enter a valid email address.',
  }),
  city: z.string().min(2, {
    message: 'City must be at least 2 characters.',
  }),
  country: z.string().min(2, {
    message: 'Country must be at least 2 characters.',
  }),
});

const profile = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      adress: '',
      useremail: '',
      userBio: '',
      username: '',
      city: '',
      country: '',
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    setIsLoading(true);
    createProfile(values)
      .then((res) => {
        console.log('Profile created successfully:', res);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error creating profile:', error);
        setIsLoading(false);
      });
  }
  return (
    <div className='flex flex-col items-center justify-center gap-8 py-16'>
      <div className='relative h-96 w-96  overflow-hidden rounded-lg'>
        <Image
          src='/TASKLY.png'
          alt='Photo by Drew Beamer'
          fill
          className='h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale'
        />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 grid w-full grid-cols-2 gap-4 max-w-2xl'
        >
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder='your name' {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='city'
            render={({ field }) => (
              <FormItem>
                <FormLabel>City/FormLabel</FormLabel>
                <FormControl>
                  <Input placeholder='your city' {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='country'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder='your country' {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='adress'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adress</FormLabel>
                <FormControl>
                  <Input placeholder='Adress' {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='useremail'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Useremail</FormLabel>
                <FormControl>
                  <Input placeholder='shadcn' {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='userBio'
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Bio</FormLabel>
                <FormControl>
                  <Textarea placeholder='Type your bio here' {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          {isLoading ? (
            <Spinner />
          ) : (
            <Button className='col-span-2' type='submit'>
              Submit
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};

export default profile;
