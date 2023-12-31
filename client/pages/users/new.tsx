import {UserFormApiErrors, UserFormUser} from "@/components/pages/users/types";
import {add} from "@/services/ApiService/UserApiService/UserApiService";
import {submit} from "@/services/FormSubmissionService";
import {FormErrors} from "@/types";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import _ from "lodash";
import Link from "next/link";
import React, {useMemo, useState} from "react";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {useQueryClient} from "react-query";

type Inputs = {
  firstName: string,
  lastName: string,
  email: string
};

const Page = () => {
  const queryClient = useQueryClient();

  const {control, formState: {errors}, handleSubmit, reset} = useForm<Inputs>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: ''
    }
  });

  const defaultApiErrors: UserFormApiErrors = useMemo(() => {
    return {
      company: [],
      email: [],
      firstName: [],
      lastName: []
    };
  }, []);
  const [apiErrors, setApiErrors] = useState<FormErrors>(_.cloneDeep(defaultApiErrors));

  const onSubmit: SubmitHandler<Inputs> = async (data: UserFormUser) => {
    await submit(
      add,
      [data],
      () => {
        // Clears all form errors.
        setApiErrors(_.cloneDeep(defaultApiErrors));

        // Clears all fields.
        reset();

        // Clears the react-query cache for the users list.
        queryClient.invalidateQueries(['users']);
      },
      apiErrors,
      setApiErrors
    );
  };

  return (
    <>
      <Link href="/users/list">List</Link>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name="firstName"
          control={control}
          render={({field}) => {
            return (
              <TextField
                {...field}
                error={apiErrors.firstName.length > 0 || !!errors.firstName}
                helperText={apiErrors.firstName[0] || errors?.firstName?.message}
                label="First name"
                required
                variant="outlined"
              />
            );
          }}
          rules={{
            maxLength: {
              message: 'Input cannot be longer than 255 characters.',
              value: 255
            },
            required: 'Input is required.'
          }}
        />
        <Controller
          name="lastName"
          control={control}
          render={({field}) => {
            return (
              <TextField
                {...field}
                error={apiErrors.lastName.length > 0 || !!errors.lastName}
                helperText={apiErrors.lastName[0] || errors?.lastName?.message}
                label="Last name"
                required
                variant="outlined"
              />
            );
          }}
          rules={{
            maxLength: {
              message: 'Input cannot be longer than 255 characters.',
              value: 255
            },
            required: 'Input is required.'
          }}
        />
        <Controller
          name="email"
          control={control}
          render={({field}) => {
            return (
              <TextField
                {...field}
                error={apiErrors.email.length > 0 || !!errors.email}
                helperText={apiErrors.email[0] || errors?.email?.message}
                label="Email address"
                required
                variant="outlined"
              />
            );
          }}
          rules={{
            maxLength: {
              message: 'Input cannot be longer than 255 characters.',
              value: 255
            },
            pattern: {
              message: 'You must enter an email address.',
              value: /^.+@\S+\.\S+$/
            },
            required: 'Input is required.'
          }}
        />
        <Button className="bg-blue" type="submit" variant="contained">Create</Button>
      </form>
    </>
  );
};

Page.propTypes = {};

export default Page;
