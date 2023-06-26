import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import {useRouter} from "next/router";
import React, {useMemo, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {useQuery} from "react-query";
import {UserFormUser} from "../../../components/pages/users/types";
import {editOneById, findOneById} from "../../../services/ApiService/UserApiService/UserApiService";
import {submit} from "../../../services/FormSubmissionService";
import {FormErrors} from "../../../types";

type FormInput = {
  firstName: string,
  lastName: string,
  email: string
};

const Page = () => {
  const router = useRouter();
  const userId = router.query.id;

  const query = useQuery({
    queryKey: ['user', userId],
    queryFn: () => findOneById(userId),
    staleTime: 60000,
    refetchOnMount: 'always',

    // The query will not execute until userId exists. Until then, query.isIdle will be true.
    enabled: !!userId
  });

  const {formState: {errors}, handleSubmit, register} = useForm<FormInput>({values: query?.data});

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
      editOneById,
      [userId, data],
      () => {
        // Clears all form errors.
        setApiErrors({...defaultApiErrors});
      },
      apiErrors,
      setApiErrors
    );
  };

  if (query.isIdle || query.isLoading) {
    return <p>Loading...</p>
  }

  return (
    <>
      <Link href="/users/list">List</Link>
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
        <Button className="bg-blue" type="submit" variant="contained">Save</Button>
      </form>
    </>
  );
};

Page.propTypes = {};

export default Page;
