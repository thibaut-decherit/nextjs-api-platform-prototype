import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import _ from "lodash";
import {GetServerSideProps} from "next";
import Link from "next/link";
import PropTypes from "prop-types";
import React, {useState} from "react";
import {dehydrate, QueryClient, useQuery} from "react-query";
import useSetQueryStringParam from "../../components/hooks/useSetQueryStringParam";
import {UserListUser} from "../../components/pages/users/types";
import Placeholder from "../../components/Placeholder";
import {paginatedFindAll} from "../../services/ApiService/UserApiService/UserApiService";

const buildQuery = (itemsPerPage: number, pageNumber: number) => {
  return {
    queryKey: ['users', itemsPerPage, pageNumber],
    queryFn: () => paginatedFindAll(itemsPerPage, pageNumber),
    staleTime: 60000
  };
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const itemsPerPage = Number(_.get(context, 'query.itemsPerPage', 25)) || 25;
  const pageNumber = Number(_.get(context, 'query.page', 1)) || 1;

  const queryClient = new QueryClient();

  /*
  staleTime is specified to prevent react-query from re fetching the data way too much: e.g. every single time the
  window loses then regains focus (sometimes even two times in a row during that event).
   */
  await queryClient.prefetchQuery(buildQuery(itemsPerPage, pageNumber));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ssrItemsPerPage: itemsPerPage,
      ssrPageNumber: pageNumber
    }
  };
};

const Page = (
  {
    ssrItemsPerPage,
    ssrPageNumber
  }: {
    ssrItemsPerPage: number;
    ssrPageNumber: number;
  }
) => {
  const setQueryStringParam = useSetQueryStringParam();

  const [pageNumber, setPageNumber] = useState(ssrPageNumber);
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement>, newPageNumber: number) => {
    // TablePagination starts at 0, not at 1.
    newPageNumber = newPageNumber + 1;

    setPageNumber(newPageNumber);
    setQueryStringParam('page', String(newPageNumber), 'push');
  }

  const [itemsPerPage, setItemsPerPage] = useState(ssrItemsPerPage);
  const handleChangeItemsPerPage = (event: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>) => {
    setItemsPerPage(event.target.value);
    setQueryStringParam('itemsPerPage', event.target.value, 'push');
  }

  const query = useQuery(buildQuery(itemsPerPage, pageNumber));

  const renderPlaceholders = () => {
    const placeholders = [];
    for (let i = 0; i < itemsPerPage; i++) {
      placeholders.push(
        <TableRow key={i}>
          <TableCell component="th" scope="row"><Placeholder/></TableCell>
          <TableCell><Placeholder/></TableCell>
          <TableCell><Placeholder/></TableCell>
          <TableCell><Placeholder/></TableCell>
          <TableCell><Placeholder/></TableCell>
        </TableRow>
      );
    }

    return placeholders;
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
            {query.isLoading
              ? (
                renderPlaceholders()
              )
              : (
                query.data.results.map((user: UserListUser) => (
                  <TableRow key={user.id}>
                    <TableCell component="th" scope="row">{user.firstName}</TableCell>
                    <TableCell>{user.lastName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.createdAt}</TableCell>
                    <TableCell>{user.lastModifiedAt}</TableCell>
                  </TableRow>
                ))
              )
            }
          </TableBody>
        </Table>
      </TableContainer>
      {query.isLoading
        ? (
          <Placeholder/>
        )
        : (
          <TablePagination
            component="div"
            count={query.data.totalItemsCount}
            page={pageNumber - 1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeItemsPerPage}
            rowsPerPage={itemsPerPage}
            rowsPerPageOptions={[25, 50, 100]}
          />
        )
      }
    </>
  );
};

Page.propTypes = {
  ssrItemsPerPage: PropTypes.number.isRequired,
  ssrPageNumber: PropTypes.number.isRequired
};

export default Page;
