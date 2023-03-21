import React , { useState, useEffect }  from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MuiAlert from '@mui/material/Alert';
import '../assets/css/custom.css';

const ThirdParty = () => {

const [rows, setRows] = useState({});
const [warning, setWarning] = useState('');

useEffect(() => {
    async function fetchUsers() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((data) => {
              if (data) { 
                let obj =Object.values(data);
                setRows(obj);
              } else {
                setWarning('Something Went Wrong!! please come back again');
              }
            });
        };
      fetchUsers();
}, [])

  
  return (
    <div className='tableStyles'>
        {warning.length>0 && <MuiAlert severity='error' elevation={6}  variant="filled">{warning}</MuiAlert>}
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow className='tableHeader'>
                <TableCell>ID</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Username</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Phone</TableCell>
                <TableCell align="left">Website</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.length>0 && rows.map((row) => (
                <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                    {row.id}
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.username}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">{row.phone}</TableCell>
                <TableCell align="left">{row.website}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </div>
  )
}

export default ThirdParty