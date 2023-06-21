import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, {useMemo, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {UserFormUser} from "../../components/pages/users/types";
import {add} from "../../services/ApiService/UserApiService/UserApiService";
import {submit} from "../../services/FormSubmissionService";
import {FormErrors} from "../../types";

type FormInput = {
  firstName: string,
  lastName: string,
  email: string
};

const Page = () => {
  const {formState: {errors}, handleSubmit, register, reset} = useForm<FormInput>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: ''
    }
  });

  const defaultApiErrors = useMemo(() => {
    return {
      company: [],
      email: [],
      firstName: [],
      lastName: []
    };
  }, []);
  const [apiErrors, setApiErrors] = useState<FormErrors>({...defaultApiErrors});

  const onSubmit: SubmitHandler<FormInput> = async (data: UserFormUser) => {
    await submit(
      add,
      [data],
      () => {
        // Clears all form errors.
        setApiErrors({...defaultApiErrors});

        // Clears all fiels.
        reset();
      },
      apiErrors,
      setApiErrors
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <TextField
        {...register('firstName', {
          maxLength: {
            message: 'Input cannot be longer than 255 characters.',
            value: 255
          },
          required: 'Input is required.'
        })}
        error={apiErrors.firstName.length > 0 || !!errors.firstName}
        helperText={apiErrors.firstName[0] || errors?.firstName?.message}
        label="First name"
        required
        variant="outlined"
      />
      <TextField
        {...register('lastName', {
          maxLength: {
            message: 'Input cannot be longer than 255 characters.',
            value: 255
          },
          required: 'Input is required.'
        })}
        error={apiErrors.lastName.length > 0 || !!errors.lastName}
        helperText={apiErrors.lastName[0] || errors?.lastName?.message}
        label="Last name"
        required
        variant="outlined"
      />
      <TextField
        {...register('email', {
          maxLength: {
            message: 'Input cannot be longer than 255 characters.',
            value: 255
          },
          pattern: {
            message: 'You must enter an email address.',
            value: /^.+@\S+\.\S+$/
          },
          required: 'Input is required.'
        })}
        error={apiErrors.email.length > 0 || !!errors.email}
        helperText={apiErrors.email[0] || errors?.email?.message}
        label="Email address"
        required
        type="email"
        variant="outlined"
      />
      <Button className="bg-blue" type="submit" variant="contained">Create</Button>
    </form>
  );
};

Page.propTypes = {};

export default Page;
