import React, { useEffect, useState } from 'react';
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
import { padding } from '@mui/system';
import { TOKENSYMBOL } from '@/constant';
export interface Asset {
  name: string;
  symbol: string;
  logo: string;
}
export interface Data {
  key: string;
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
    key: asset,
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
  createData('BTC', 305, 3.7, 67, 4.3, 100, <div>1231231312313131</div>),
  createData('ETH', 452, 25.0, 51, 4.9, 100, <div>123</div>),
  createData('USDT', 262, 16.0, 24, 6.0, 100, <div>123</div>),
  createData('OKB', 159, 6.0, 24, 4.0, 100, <div>123</div>)
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

function getComparator<T, Key extends keyof T>(
  order: Order,
  orderBy: Key
): (a: T, b: T) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number): T[] {
  return array.sort((a, b) => {
    return comparator(a, b); //sort
  });
}

export interface HeadCell<T> {
  id: keyof T;
  label: React.ReactNode;
  needSort: boolean;
}

interface EnhancedTableProps<T> {
  headCells: HeadCell<T>[];
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void;
  order: Order;
  orderBy?: keyof T;
}

function EnhancedTableHead<T>(props: EnhancedTableProps<T>) {
  const {
    // onSelectAllClick,
    order,
    orderBy,
    onRequestSort,
    headCells
  } = props;
  const createSortHandler =
    (property: keyof T) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead
      sx={{
        paddingRight: '16px'
      }}
    >
      <TableRow sx={{ height: 16 }}>
        {headCells.map((headCell, index) => (
          <TableCell
            sx={{
              border: 'none',
              paddingLeft: index === 0 ? '16px' : '0px'
            }}
            // padding={index === 0 ? 'normal' : 'none'}
            padding="none"
            key={headCell.id as any}
            align="left"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.needSort ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
                className={style.font}
                sx={{ color: '#666666' }}
              >
                {headCell.label}
              </TableSortLabel>
            ) : (
              <div className={style.font}>{headCell.label}</div>
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
  headCells: HeadCell<T>[];
  rows: T[];
  TableRows: React.JSXElementConstructor<{ row: T }>;
  defaultOrderBy?: keyof T;
}
export default function EnhancedTable<T extends { key: string }>({
  headCells,
  rows,
  TableRows,
  defaultOrderBy
}: TableProps<T>) {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState(defaultOrderBy);
  useEffect(() => {
    setOrderBy(defaultOrderBy);
  }, [defaultOrderBy]);
  console.log('orderBy', orderBy);
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof T
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
            <EnhancedTableHead<T>
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              headCells={headCells}
            />
            <TableBody>
              {orderBy
                ? stableSort(rows, getComparator(order, orderBy)).map((row) => {
                    return <TableRows key={row.key} row={row} />;
                  })
                : rows.map((row) => {
                    return <TableRows key={row.key} row={row} />;
                  })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
