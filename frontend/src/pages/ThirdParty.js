import React , { useState, useEffect }  from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Link } from 'react-router-dom';
import '../assets/css/custom.css';

const ThirdParty = () => {

const [rows, setRows] = useState({});

useEffect(() => {
    async function fetchUsers() {
        fetch('https://give-me-users-forever.vercel.app/api/users/0/next')
            .then((response) => response.json())
            .then((data) => {
              if (data.users) { 
                var obj =Object.values(data.users);
                setRows(obj);
              } else {
              }
            });
        };
      fetchUsers();
}, [])

  
  return (
    <div className='tableStyles'>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow className='tableHeader'>
                <TableCell>ID</TableCell>
                <TableCell align="left">JobTitle</TableCell>
                <TableCell align="left">EmailAddress</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Phone</TableCell>
                <TableCell align="left">Company</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.length>0 && rows.map((row) => (
                <TableRow
                key={row.ID}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                    {row.ID}
                </TableCell>
                <TableCell align="left">{row.JobTitle}</TableCell>
                <TableCell align="left">{row.EmailAddress}</TableCell>
                <TableCell align="left">{row.FirstNameLastName}</TableCell>
                <TableCell align="left">{row.Phone}</TableCell>
                <TableCell align="left">{row.Company}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </div>
  )
}

export default ThirdParty