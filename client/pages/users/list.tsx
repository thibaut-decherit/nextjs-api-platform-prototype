import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {GetStaticProps} from "next";
import Link from "next/link";
import React from "react";
import {dehydrate, QueryClient, useQuery} from "react-query";
import {UserListUser} from "../../components/pages/users/types";
import {findAll} from "../../services/ApiService/UserApiService/UserApiService";

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  /*
  staleTime is specified to prevent react-query from re fetching the data way too much: e.g. every single time the
  window loses then regains focus (sometimes even two times in a row during that event).
   */
  await queryClient.prefetchQuery({queryKey: 'users', queryFn: findAll, staleTime: 60000});

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
};

const Page = () => {
  const query = useQuery({queryKey: 'users', queryFn: findAll, staleTime: 60000});

  if (query.isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <>
      <Link href="/users/new">New</Link>
      <TableContainer component={Paper}>
        <Table aria-label="Users list">
          <TableHead>
            <TableRow>
              <TableCell>First name</TableCell>
              <TableCell>Last name</TableCell>
              <TableCell>Email address</TableCell>
              <TableCell>Created at</TableCell>
              <TableCell>Last modified at</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {query.data.map((user: UserListUser) => (
              <TableRow key={user.id}>
                <TableCell component="th" scope="row">
                  {user.firstName}
                </TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.createdAt}</TableCell>
                <TableCell>{user.lastModifiedAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

Page.propTypes = {};

export default Page;
