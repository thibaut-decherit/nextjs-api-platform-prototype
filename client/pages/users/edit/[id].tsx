import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {AxiosError} from "axios";
import Link from "next/link";
import {useRouter} from "next/router";
import React, {useMemo, useState} from "react";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {useQuery, useQueryClient} from "react-query";
import {UserFormApiErrors, UserFormUser} from "../../../components/pages/users/types";
import {deleteOneById, editOneById, findOneById} from "../../../services/ApiService/UserApiService/UserApiService";
import {submit} from "../../../services/FormSubmissionService";
import {FormErrors} from "../../../types";
import _ from "lodash";

type FormInput = {
  firstName: string,
  lastName: string,
  email: string
};

const Page = () => {
  const router = useRouter();
  const userId = String(router.query.id);
  const queryClient = useQueryClient();

  const query = useQuery<UserFormUser, AxiosError>({
    queryKey: ['user', userId],
    queryFn: () => findOneById(userId),
    staleTime: 60000,
    refetchOnMount: 'always',
    refetchOnWindowFocus: false,
    retry: false,

    // The query will not execute until userId exists. Until then, query.isIdle will be true.
    enabled: userId !== 'undefined'
  });

  const {control, formState: {errors}, handleSubmit} = useForm<UserFormUser>({values: query?.data});

  const defaultApiErrors: UserFormApiErrors = useMemo(() => {
    return {
      company: [],
      email: [],
      firstName: [],
      lastName: []
    };
  }, []);
  const [apiErrors, setApiErrors] = useState<FormErrors>(_.cloneDeep(defaultApiErrors));

  const handleDelete = () => {
    deleteOneById(userId)
      .then(() => {
        void router.push('/users/list');
      });
  };

  const onSubmit: SubmitHandler<FormInput> = async (data: UserFormUser) => {
    await submit(
      editOneById,
      [userId, data],
      () => {
        // Clears all form errors.
        setApiErrors(_.cloneDeep(defaultApiErrors));

        // Clears the react-query cache for that user and the users list.
        queryClient.invalidateQueries(['user', userId]);
        queryClient.invalidateQueries(['users']);
      },
      apiErrors,
      setApiErrors
    );
  };

  const renderLoading = () => {
    return <p>Loading...</p>;
  };

  const renderError = () => {
    if (query.error?.response?.status === 404) {
      return <p>User not found.</p>;
    } else {
      return <p>Unknown error.</p>;
    }
  };

  const renderForm = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name="firstName"
          control={control}
          render={({field}) => {
            /*
            Required because field.value is initially undefined and TextField does not update label shrink state until
            the form has been interacted with, even if field.value contains data on subsequent renders.
             */
            if (field.value === undefined) {
              return <></>;
            }

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
            /*
            Required because field.value is initially undefined and TextField does not update label shrink state until
            the form has been interacted with, even if field.value contains data on subsequent renders.
             */
            if (field.value === undefined) {
              return <></>;
            }

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
            /*
            Required because field.value is initially undefined and TextField does not update label shrink state until
            the form has been interacted with, even if field.value contains data on subsequent renders.
             */
            if (field.value === undefined) {
              return <></>;
            }

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
        <Button className="bg-blue" type="submit" variant="contained">Save</Button>
      </form>
    );
  };

  const renderConditional = () => {
    if (query.isIdle || query.isLoading) {
      return renderLoading();
    }

    if (query.isError) {
      return renderError();
    }

    return renderForm();
  };

  return (
    <>
      <Link href="/users/list">List</Link>
      {renderConditional()}
      {!query.isIdle && !query.isLoading && !query.isError && (
        <Button color="error" onClick={handleDelete} variant="contained">Delete</Button>
      )}
    </>
  );
};

Page.propTypes = {};

export default Page;
