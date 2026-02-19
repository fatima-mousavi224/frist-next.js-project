'use client';

import React, { useRef } from 'react';
import * as z from 'zod';
import dynamic from 'next/dynamic';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MDXEditorMethods } from '@mdxeditor/editor';

import { AskQuestionSchema } from '@/lib/validation';
import { Form, FormControl } from '../ui/form';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import TagCards from '../cards/TagCards';
import Edietor from '@/components/edietor';

const Editor = dynamic(() => import('@/components/edietor'), {
  ssr: false,
});

const QuestionsForm = () => {
  const editorRef = useRef<MDXEditorMethods>(null);

  const form = useForm<z.infer<typeof AskQuestionSchema>>({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: '',
      content: '',
      tags: [],
    },
  });

  // Logic to handle adding tags on Enter key
  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: { value: string[] }
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const tagInput = e.currentTarget.value.trim();

      if (tagInput && tagInput.length < 15 && !field.value.includes(tagInput)) {
        if (field.value.length >= 3) {
            return form.setError('tags', { type: 'manual', message: 'Maximum 3 tags allowed' });
        }
        form.setValue('tags', [...field.value, tagInput]);
        e.currentTarget.value = '';
        form.clearErrors('tags');
      } else if (tagInput.length >= 15) {
        form.setError('tags', { type: 'manual', message: 'Tag must be less than 15 characters' });
      } else if (field.value.includes(tagInput)) {
        form.setError('tags', { type: 'manual', message: 'Tag already added' });
      }
    }
  };

  // Logic to remove a tag
  const handleTagRemove = (tag: string, field: { value: string[] }) => {
    const newTags = field.value.filter((t) => t !== tag);
    form.setValue('tags', newTags);

    if (newTags.length === 0) {
      form.setError("tags", {
        type: 'manual',
        message: 'At least one tag is required',
      })
  }};

  const handleCreateQuestion = (values: z.infer<typeof AskQuestionSchema>) => {
    console.log(values);
    // Handle your submission logic here
  };

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-10"
        onSubmit={form.handleSubmit(handleCreateQuestion)}
      >
        {/* Title Field */}
        <FieldGroup>
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="flex w-full flex-col" data-invalid={fieldState.invalid}>
                <FieldLabel className="paragraph-semibold text-dark400_light800">
                  Question title <span className="text-primary-500">*</span>
                </FieldLabel>
                <Input
                  {...field}
                  className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus min-h-14 rounded border"
                />
                <FieldDescription className="body-regular mt-2.5 text-light-500">
                  Be specific and imagine you&apos;re asking a question to another person.
                </FieldDescription>
              </Field>
            )}
          />
        </FieldGroup>

        {/* Content/Editor Field */}
        <FieldGroup>
          <Controller
            name="content"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="flex w-full flex-col" data-invalid={fieldState.invalid}>
                <FieldLabel className="paragraph-semibold text-dark400_light800">
                  Detailed explanation of your problem <span className="text-primary-500">*</span>
                </FieldLabel>
                <Edietor
                  editorRef={editorRef}
                  markdown={field.value}
                  fieldChange={field.onChange}
                />
                <FieldDescription className="body-regular mt-2.5 text-light-500">
                  Introduce the problem and expand on what you&apos;ve put in the title.
                </FieldDescription>
              </Field>
            )}
          />
        </FieldGroup>

        {/* Tags Field */}
        <FieldGroup>
          <Controller
            name="tags"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="flex w-full flex-col gap-3" data-invalid={fieldState.invalid}>
                <FieldLabel className="paragraph-semibold text-dark400_light800">
                  Tags <span className="text-primary-500">*</span>
                </FieldLabel>
                <div>
                  <Input
                    placeholder="Add tags..."
                    className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus min-h-14 rounded border"
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                    // Note: We don't spread {...field} here because field.value is an array
                  />
                  {field.value.length > 0 && (
                    <div className="flex-start mt-2.5 flex flex-wrap gap-2.5">
                      {field.value.map((tag: string) => (
                        <TagCards
                          key={tag}
                          _id={tag}
                          name={tag}
                          compact
                          isButton
                          remove
                          handelRemove={() => handleTagRemove(tag, field)}
                        />
                      ))}
                    </div>
                  )}
                </div>
                <FieldDescription className="body-regular mt-2.5 text-light-500">
                  Add up to 3 tags. You need to press enter to add a tag.
                </FieldDescription>
              </Field>
            )}
          />
        </FieldGroup>

        <div className="mt-16 flex justify-end">
          <Button type="submit" className="primary-gradient w-fit !text-light-900">
            Ask A Question
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default QuestionsForm;