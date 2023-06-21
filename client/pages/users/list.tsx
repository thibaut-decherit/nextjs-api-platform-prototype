import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from "react";
import {useQuery} from "react-query";
import {UserListUser} from "../../components/pages/users/types";
import {findAll} from "../../services/ApiService/UserApiService/UserApiService";

const Page = () => {
  const query = useQuery('users', findAll);

  if (query.isLoading) {
    return <span>Loading...</span>;
  }

  return (
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
  );
};

Page.propTypes = {};

export default Page;
