import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {AxiosError} from "axios";
import _ from "lodash";
import {GetServerSideProps} from "next";
import Link from "next/link";
import {useSearchParams} from "next/navigation";
import type {NextRouter} from "next/router";
import {useRouter} from "next/router";
import PropTypes from "prop-types";
import React from "react";
import {dehydrate, QueryClient, useQuery} from "react-query";
import {UserListUser} from "../../components/pages/users/types";
import Placeholder from "../../components/Placeholder";
import {paginatedFindAll, PaginatedFindAllReturn} from "../../services/ApiService/UserApiService/UserApiService";

const buildQuery = (itemsPerPage: number, pageNumber: number) => {
  return {
    queryKey: ['users', itemsPerPage, pageNumber],
    queryFn: () => paginatedFindAll(itemsPerPage, pageNumber),
    /*
    staleTime is specified to prevent react-query from re fetching the data way too much: e.g. every single time the
    window loses then regains focus (sometimes even two times in a row during that event).
     */
    staleTime: 60000
  };
}
const defaultStatesValues = {
  pageNumber: 1,
  itemsPerPage: 25
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const itemsPerPage =
    Number(_.get(context, 'query.itemsPerPage', defaultStatesValues.itemsPerPage))
    || defaultStatesValues.itemsPerPage;
  const pageNumber =
    Number(_.get(context, 'query.page', defaultStatesValues.pageNumber))
    || defaultStatesValues.pageNumber;

  const queryClient = new QueryClient();
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
  const router: NextRouter = useRouter();
  const searchParams = useSearchParams();

  const [pageNumber, setPageNumber] = [
    Number(searchParams?.get('page') ?? ssrPageNumber),
    (pageNumber: number) => router.push({query: {...router.query, ['page']: String(pageNumber)}})
  ];
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPageNumber: number) => {
    // newPageNumber comes from TablePagination and therefore starts at 0, not at 1.
    newPageNumber = newPageNumber + 1;

    void setPageNumber(newPageNumber);
  }

  const [itemsPerPage, setItemsPerPage] = [
    Number(searchParams?.get('itemsPerPage') ?? ssrItemsPerPage),
    (itemsPerPage: number) => router.push({query: {...router.query, ['itemsPerPage']: String(itemsPerPage)}})
  ];
  const handleChangeItemsPerPage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    void setItemsPerPage(Number(event.target.value));
  }

  const query = useQuery<PaginatedFindAllReturn, AxiosError>(
    buildQuery(itemsPerPage, pageNumber)
  );

  const renderPlaceholders = () => {
    const placeholders: React.JSX.Element[] = [];
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
              <TableCell>ID</TableCell>
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
                query?.data?.results?.map((user: UserListUser) => (
                  <TableRow key={user.id}>
                    <TableCell component="th" scope="row">
                      <Link href={`/users/edit/${user.id}`}>{user.id}</Link>
                    </TableCell>
                    <TableCell>{user.firstName}</TableCell>
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
            count={query?.data?.totalItemsCount ?? 0}
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
