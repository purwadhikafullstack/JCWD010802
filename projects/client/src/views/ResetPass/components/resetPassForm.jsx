import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, FormControl, FormErrorMessage, Input, VStack, Checkbox, Flex } from '@chakra-ui/react';

export const ResetPasswordForm = ({ onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Formik
      initialValues={{ password: '', confirmPassword: '' }}
      validationSchema={Yup.object({
        password: Yup.string()
          .min(8, 'Password must be at least 8 characters')
          .required('Password is required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Confirm Password is required'),
      })}
      onSubmit={onSubmit}
    >
      <Form>
        <VStack spacing={4}>
          <Field name="password">
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.password && form.touched.password}>
                <Input
                  {...field}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="New Password"
                  size={"lg"}
                />
                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Field name="confirmPassword">
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.confirmPassword && form.touched.confirmPassword}>
                <Input
                  {...field}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  size={"lg"}
                />
                <FormErrorMessage>{form.errors.confirmPassword}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
            
          <Checkbox
            isChecked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
            >
            Show Password
          </Checkbox>


          <Button type="submit" colorScheme="teal" isLoading={false}>
            Reset Password
          </Button>
        </VStack>
      </Form>
    </Formik>
  );
};

