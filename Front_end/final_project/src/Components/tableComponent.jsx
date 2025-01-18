import React, { useMemo, useEffect, useState } from 'react';
import { useTable, usePagination } from 'react-table';
import { CSVLink } from 'react-csv';
import { createClient } from '@supabase/supabase-js';

const TableComponent = () => {
  const [data, setData] = useState([]);
  
  // Supabase initialization
  const supabaseUrl = 'https://bqeujxgpwuiyigjlmpsn.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxZXVqeGdwd3VpeWlnamxtcHNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5MzQ2MTgsImV4cCI6MjA0NzUxMDYxOH0.y5WRPP61rAkPk3zWcr7yqCQFVEUvZxzi-b5yL-REGUU';
  const supabase = createClient(supabaseUrl, supabaseKey);

  useEffect(() => {
    // Fetch data from the users_main table in Supabase
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('users_main')
        .select('id, name, age, career, total_attendance, attendance_time');
      
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setData(data); // Set the data into state
      }
    };

    fetchData();
  }, []);

  const columns = useMemo(
    () => [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Name', accessor: 'name' },
      { Header: 'Age', accessor: 'age' },
      { Header: 'Career', accessor: 'career' },
      { Header: 'Total Attendance', accessor: 'total_attendance' },
      { Header: 'Attendance Time', accessor: 'attendance_time' },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable({ columns, data }, usePagination);

  return (
    <div>
      <table {...getTableProps()} className="w-full">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} className="text-left">
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} className="p-2 bg-gray-100">
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="border-t">
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} className="p-2">
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex items-center justify-between mt-4">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>
        <button onClick={() => gotoPage(pageOptions.length - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <select
          value={pageSize}
          onChange={e => setPageSize(Number(e.target.value))}
          className="px-2 py-1 ml-2"
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        <CSVLink data={data} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
          Export CSV
        </CSVLink>
      </div>
    </div>
  );
};

export default TableComponent;
