import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, {useState} from "react";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {login} from "../../services/AuthenticationService";
import type {Credentials} from "../../types";

const Page = () => {
  const {control, formState: {errors}, handleSubmit, reset, resetField} = useForm<Credentials>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const [apiError, setApiError] = useState(undefined);

  const onSubmit: SubmitHandler<Credentials> = async (data: Credentials) => {
    await login(data)
      .then(() => {
        // Clears all form errors.
        setApiError(undefined);

        // Clears all fields.
        reset();
      })
      .catch(error => {
        setApiError(error);

        // Clears password field.
        resetField('password');
      });
  };

  const renderApiError = () => {
    if (apiError === undefined) {
      return null;
    }

    if (apiError === 'bad credentials') {
      return <p>Bad credentials.</p>;
    }

    return <p>Unknown error.</p>;
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name="email"
          control={control}
          render={({field}) => {
            return (
              <TextField
                {...field}
                error={!!errors.email}
                helperText={errors?.email?.message}
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
        <Controller
          name="password"
          control={control}
          render={({field}) => {
            return (
              <TextField
                {...field}
                error={!!errors.password}
                helperText={errors?.password?.message}
                label="Password"
                required
                type="password"
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
        <Button className="bg-blue" type="submit" variant="contained">Login</Button>
      </form>
      {renderApiError()}
    </>
  );
}

Page.propTypes = {};

export default Page;
