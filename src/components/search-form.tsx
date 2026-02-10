'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { WEBSITES } from '@/lib/constants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Loader2 } from 'lucide-react';

const searchFormSchema = z.object({
  productName: z.string().min(2, {
    message: 'Product name must be at least 2 characters.',
  }),
  websites: z
    .array(z.string())
    .refine(value => value.some(item => item), {
      message: 'You have to select at least one website.',
    }),
});

export type SearchFormValues = z.infer<typeof searchFormSchema>;

interface SearchFormProps {
  onSubmit: (data: SearchFormValues) => void;
  isLoading: boolean;
}

export function SearchForm({ onSubmit, isLoading }: SearchFormProps) {
  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      productName: '',
      websites: ['pchome', 'momo'],
    },
  });

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Start a New Search</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Product Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Sony WH-1000XM5 Headphones"
                      {...field}
                      className="text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="websites"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-lg">Websites</FormLabel>
                    <FormDescription>
                      Select the websites you want to search.
                    </FormDescription>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {WEBSITES.map(website => (
                      <FormField
                        key={website.id}
                        control={form.control}
                        name="websites"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={website.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(website.id)}
                                  onCheckedChange={checked => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          website.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            value => value !== website.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {website.name}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full sm:w-auto" size="lg">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Search className="mr-2 h-4 w-4" />
              )}
              {isLoading ? 'Searching...' : 'Search Prices'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
