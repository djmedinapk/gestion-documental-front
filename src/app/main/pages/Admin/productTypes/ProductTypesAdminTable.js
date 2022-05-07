import { forwardRef, useRef, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import PropTypes from "prop-types";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import {
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import clsx from "clsx";
import ProductTypesAdminTablePaginationActions from "./ProductTypesAdminTablePaginationActions";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import {
  changeParamsDataPageIndex,
  getProductTypes,
} from "./store/productTypesAdminSlice";

const EnhancedTable = ({ columns, data, onRowClick }) => {
  const { getTableProps, headerGroups, prepareRow, page } = useTable(
    {
      columns,
      data,
      autoResetPage: true,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.allColumns.push((_columns) => [
        // Let's make a column for selection

        ..._columns,
      ]);
    }
  );

  const dispatch = useDispatch();
  const { t } = useTranslation("productTypeAdminPage");
  const paramsDataPageIndex = useSelector(
    ({ productTypesAdminApp }) =>
      productTypesAdminApp.productTypes.paramsData.PageIndex
  );
  const paramsDataPageSize = useSelector(
    ({ productTypesAdminApp }) =>
      productTypesAdminApp.productTypes.paramsData.PageSize
  );
  const paramsDataCount = useSelector(
    ({ productTypesAdminApp }) =>
      productTypesAdminApp.productTypes.paramsData.Count
  );

  const handleChangePage = (event, newPage) => {
    dispatch(changeParamsDataPageIndex(newPage + 1));
    dispatch(getProductTypes());
  };

  useEffect(() => {}, []);

  // Render the UI for your table
  return (
    <div className="flex flex-col w-full min-h-full sm:border-1 sm:rounded-16 overflow-hidden">
      <TableContainer className="flex flex-1">
        <Table {...getTableProps()} stickyHeader>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, i) => (
                  <TableCell
                    className="whitespace-nowrap p-4 md:p-12"
                    {...(!column.sortable
                      ? column.getHeaderProps()
                      : column.getHeaderProps(column.getSortByToggleProps()))}
                  >
                    {headerGroup.headers.length !== i + 1 ? (
                      t(column.Header.toUpperCase())
                    ) : (
                      <></>
                    )}

                    {column.sortable ? (
                      <TableSortLabel
                        active={column.isSorted}
                        // react-table has a unsorted state which is not treated here
                        direction={column.isSortedDesc ? "desc" : "asc"}
                      />
                    ) : null}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {page.map((row) => {
              prepareRow(row);
              return (
                <TableRow
                  {...row.getRowProps()}
                  onClick={(ev) => onRowClick(ev, row)}
                  className="truncate cursor-pointer"
                >
                  {row.cells.map((cell) => {
                    return (
                      <TableCell
                        {...cell.getCellProps()}
                        className={clsx("p-4 md:p-12", cell.column.className)}
                      >
                        {cell.render("Cell")}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        classes={{
          root: "shrink-0 border-t-1",
        }}
        rowsPerPageOptions={[paramsDataPageSize]}
        colSpan={5}
        count={paramsDataCount}
        rowsPerPage={paramsDataPageSize}
        page={paramsDataPageIndex - 1}
        SelectProps={{
          inputProps: { "aria-label": "rows per page" },
          native: false,
        }}
        labelDisplayedRows={({ from, to, count }) =>
          t("SHOWING_DATA_OF") +
          ` ${from}-${to} ` +
          t("OF") +
          ` ${count} ` +
          t("TOTAL_DATA")
        }
        onPageChange={handleChangePage}
        ActionsComponent={ProductTypesAdminTablePaginationActions}
      />
    </div>
  );
};

EnhancedTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  onRowClick: PropTypes.func,
};

export default EnhancedTable;
