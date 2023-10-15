import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, FormControl, FormErrorMessage, Input, VStack } from '@chakra-ui/react';

export const ForgotPasswordForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
      })}
      onSubmit={onSubmit}
    >
      <Form>
        <VStack spacing={4}>
          <Field name="email">
            {({ field, form }) => (
              <>
              <FormControl isInvalid={form.errors.email && form.touched.email}>
                <Input {...field} type="email" placeholder="Email" size={"lg"}/>
                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
              </FormControl>

<Button type="submit" bg={"#517664"} color={"white"} _hover={{ bg: "#9fd8cb", color: "#2d3319" }} isLoading={form.isSubmitting}>
            Submit
          </Button>
              </>
            )}
            </Field>
        </VStack>
      </Form>
    </Formik>
  );
};
