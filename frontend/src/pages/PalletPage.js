import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { map, isEmpty, concat } from 'lodash';
import { borderColor } from '@mui/system';
import { Link } from 'react-router-dom';
import '../assets/css/custom.css';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const PalletPage = () => {
    let [scannerCode, setScannerCode] = useState('');
    let [scannedCodes, setScannedCodes] = useState([]);
    let [isLoading, setIsLoading] = useState(false);

    const [open, setOpen] = React.useState(false);
    const [msg, setMsg] = React.useState('');
    const [isSuccess, setIsSuccess] = useState(true);

    let [pallet, setPallet] = useState('');
    let [shippers, setShippers] = useState([]);
    let [fn, setFn] = useState('');
    let [sn, setSn] = useState('');
    let [result, setResult] = useState('');
    let [resultF, setResultF] = useState('');
    let [currentShipper, setCurrentShipper] = useState([]);

    useEffect(() => {
        
    }, []);

    const onSubmitPalletCode = (e) => {
        setPallet(e.target.value);
    }
    const onFirstNum = (e) => {
        setFn(e.target.value);
    }
    const onSecondNum = (e) => {
        setSn(e.target.value);
    }
    //status function used above
    const checkStatus = (response) => {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(new Error(response.statusText))
        }
    }
    const calu = () => {
        var sum = parseInt(fn) + parseInt(sn);
        setResultF(sum.toString());
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fn : fn, sn : sn })
        };
        setIsLoading(true);
        //fetch('http://3.15.154.27:8125/add_code', requestOptions)
        //fetch('http://3.18.104.218:8125/add_code', requestOptions)
        // fetch('https://adc.eyeota.ai/api/add_to_pallet', requestOptions)
            fetch('http://localhost:8001/api/calulate', requestOptions)
            .then(checkStatus)
            .then(response => {
                return response.json()
            })
            .then(data => {
                // TODO: if valid then add else display message
                console.log(data);
                setResult(data);
                setIsLoading(false);
                setOpen(true);
                setIsSuccess(true);
            })
            .catch(error => {

                setIsLoading(false);
                setOpen(true);
                setIsSuccess(false);
                setMsg(`There was an error!, ${error.toString()}`);
            });
    }

   
    
    return (
        <>

            <Box
                sx={{
                    '& > :not(style)': { m: 1, width: '100ch' },
                }}
                noValidate
                sx={{ flexGrow: 1, padding: '10px', marginTop: '10px' }}>
                {isLoading && <CircularProgress />}
                <Grid container spacing={2}>
                    <Grid style={{ margin: '10px', minHeight: '400px' }} item container direction="row" xs={4}>

                        <Grid item xs>
                            <img src='/img/hera.jpg' style={{ width: "200px", height: '200px' }}></img>
                            <Divider ></Divider>
                            <TextField fullWidth style={{ paddingBottom: '10px', marginTop: '50px' }}
                                label="First Number" variant="outlined"
                                value={fn}
                                autoFocus
                                placeholder="Enter First Number"
                                // onKeyUp={onEnterCode}
                                onChange={onFirstNum}
                            />
                            <TextField fullWidth style={{ paddingBottom: '10px', marginTop: '15px' }}
                                label="Second Number" variant="outlined"
                                value={sn}
                                autoFocus
                                placeholder="Enter Second Number"
                                // onKeyUp={onEnterCode}
                                onChange={onSecondNum}
                            />
                            <Button style={{ width: '100%' }} variant="contained" component="label" onClick={() => calu()}>
                                Submit

                            </Button>
                            <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                marginRight : 'auto',
                                marginLeft : 'auto',
                                fontWeight: 700,
                                fontSize : "20px",
                                color: 'inherit',
                                textDecoration: 'none',
                                fontFamily : 'ui-seri',
                                
                            }}
                        >
                          addition result(from server) :  {result}
                        </Typography>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                marginRight : 'auto',
                                marginLeft : 'auto',
                                fontWeight: 700,
                                fontSize : "19px",
                               
                                color: 'inherit',
                                textDecoration: 'none',
                                fontFamily : 'ui-seri',
                                
                            }}
                        >
                          addition result(from ReactJS):  {resultF}
                        </Typography>
                            <Link to="/third-party" className='linkTag'>Third Party API</Link>
                            <Link to="/third-party" className='linkTag'>Inventory</Link>
                        </Grid>

                    </Grid>
                    <Divider orientation="vertical" flexItem  ></Divider>
                    <Grid style={{ margin: '10px', paddingLeft: 0, minHeight: '400px' }} item container direction="row" xs={7.2}>
                        <Typography contentEditable='true'
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                marginRight : 'auto',
                                marginLeft : 'auto',
                                fontWeight: 700,
                                fontSize : "30px",
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                fontFamily : 'ui-seri',
                                
                            }}
                        >
                           Galla Sathvika
                        </Typography>
                        <Box contentEditable='true'
                            component="div"
                            sx={{
                            whiteSpace: 'normal',
                            my: 2,
                            p: 1,
                            color: (theme) =>
                                theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                            border: '1px solid',
                            borderRadius: 2,
                            bgcolor : 'white',
                            borderColor : '#1976d2',
                            fontSize: '0.875rem',
                            fontWeight: '700',
                            borderWidth : '3px',
                            height : '65vh '
                            }}
                        >
                            Hello everyone, I am Sathvika Galla pursuing my master's in computer science in university at Albany. I completed an internship related to Web Development in Ntt data. Besides that, I also have experience and extended knowledge regarding machine learning as I have worked on a project for predicting and classifying Cyber Crime Incidents during my undergrad. As a part of my experience, I have also done several projects related to building some websites like online-library where I have used HTML, CSS and SQL which gave me an understanding and hands-on experience on both front end & back-end technologies. I am self-driven and very enthusiastic about learning new skills.
                        </Box>
                        
                        <Divider ></Divider>
                        

                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default PalletPage;

