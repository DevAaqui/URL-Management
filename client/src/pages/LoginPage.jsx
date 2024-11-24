// // import React, { Fragment } from 'react';
// import Header from '../components/Header';
// import Box from '@mui/material/Box';
// import { Container, Grid, Paper } from '@mui/material';
// import Login from '../components/Login';
// import TestLogin from '../components/TestLogin';

// const styles = {
//   container: { maxWidth: 'md' },
//   grid: { alignItems: 'center', justifyContent: 'center' }
// };

// const Test = () => {
//   return (
//     <>
//       <Header />
//       <Container sx={styles.container}>
//         <Grid container spacing={3} display="flex" justifyContent="center" alignItems="center">
//           <Login />
//         </Grid>
//       </Container>
//     </>
//   );
// };

// export default Test;
import React, { Fragment } from 'react';
// import Header from '../components/Header';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
// import Login from './components/Login';
// import TestLogin from '../components/TestLogin';
import Login from '../components/Login';
import Header from '../components/Header';
import { Stack } from '@mui/material';

const styles = {
  container: { maxWidth: 'xl', width:'100%', margin: 'auto' },
  grid: { alignItems: 'center', justifyContent: 'center', marginTop: '20px' }
};

const LoginPage = ({onLogin}) => {
  console.log('In Login')
  return (
    <Stack direction={'column'} spacing={20} sx={{alignItems: 'center'}}>
      <Header></Header>
      <Container sx={styles.container}>
        <Grid container spacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={styles.grid}> 
            <Login onLogin={onLogin} />
        </Grid>
      </Container>
    </ Stack>
  );
};

export default LoginPage;
