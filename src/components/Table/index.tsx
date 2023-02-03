import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
// import DeleteIcon from '@mui/icons-material/Delete';
// import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import style from './index.module.less';

interface Data {
  asset: string;
  totalDeposit: number;
  depositApr: number;
  totalLoan: number;
  loanApr: number;
  matchAmount: number;
  option: React.ReactNode;
}

function createData(
  asset: string,
  totalDeposit: number,
  depositApr: number,
  totalLoan: number,
  loanApr: number,
  matchAmount: number,
  option: React.ReactNode
): Data {
  return {
    asset,
    totalDeposit,
    depositApr,
    totalLoan,
    loanApr,
    matchAmount,
    option
  };
}

export const rows = [
  createData('Cupcake', 305, 3.7, 67, 4.3, 100, <div>1231231312313131</div>),
  createData('Donut', 452, 25.0, 51, 4.9, 100, <div>123</div>),
  createData('Eclair', 262, 16.0, 24, 6.0, 100, <div>123</div>),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 100, <div>123</div>),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 100, <div>123</div>),
  createData('Honeycomb', 408, 3.2, 87, 6.5, 100, <div>123</div>)
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string | React.ReactNode },
  b: { [key in Key]: number | string | React.ReactNode }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  console.log('stabilizedThis', stabilizedThis);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]); //sort
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
  needSort: boolean;
}

interface EnhancedTableProps {
  headCells: HeadCell[];
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  order: Order;
  orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    // onSelectAllClick,
    order,
    orderBy,
    onRequestSort,
    headCells
  } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.needSort ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {/* {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null} */}
              </TableSortLabel>
            ) : (
              <div>{headCell.label}</div>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

interface TableProps<T> {
  headCells: HeadCell[];
  rows: T[];
  TableRows: React.JSXElementConstructor<{ row: T }>;
}
export default function EnhancedTable({
  headCells,
  rows,
  TableRows
}: TableProps<Data>) {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('totalDeposit');
  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, boxShadow: 'none' }}>
        <TableContainer>
          <Table
            sx={{
              minWidth: 750,
              borderCollapse: 'separate',
              borderSpacing: '0 8px'
            }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              headCells={headCells}
            />
            <TableBody
            // sx={{
            //   border: 0
            // }}
            >
              {stableSort(rows, getComparator(order, orderBy))
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  // const isItemSelected = isSelected(row.name);
                  return <TableRows key={row.asset} row={row} />;
                })}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </Paper>
    </Box>
  );
}
