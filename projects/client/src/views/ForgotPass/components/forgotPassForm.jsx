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
              <FormControl isInvalid={form.errors.email && form.touched.email}>
                <Input {...field} type="email" placeholder="Email" size={"lg"}/>
                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Button type="submit" bg={"#9fd8cb"} color={"white"}_hover={{bg:"#517664"}}  isLoading={false}>
            Submit
          </Button>
        </VStack>
      </Form>
    </Formik>
  );
};

