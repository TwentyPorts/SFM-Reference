import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LinkIcon from '@mui/icons-material/Link';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const pages = ['Home', 'About', 'Submit'];

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

function DefaultNavbar() {

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static" color="primary">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img
              width={window.innerWidth <= 600 ? "25px" : "30px"}
              height={window.innerWidth <= 600 ? "25px" : "30px"}
              src="https://cdn2.steamgriddb.com/file/sgdb-cdn/icon/64b3ec1fdfacead70c3a9bd77d824306/32/512x512.png"
              alt="sfm logo"
            ></img>
            <Typography
              variant={window.innerWidth <= 600 ? "h6" : "h5"}
              noWrap
              component="a"
              href="/SFM-Reference"
              sx={{
                mr: 4,
                display: 'flex',
                fontFamily: 'sans-serif',
                fontWeight: 700,
                color: '#eee',
                textDecoration: 'none',
                letterSpacing: '0.5px',
                overflow: 'visible',
                '@media (max-width: 600px)': {
                  mr: 2,
                  letterSpacing: '0.2px',
                },
              }}
            >
              &nbsp;SFM Reference
            </Typography>

            <Box sx={{ flexGrow: 1, display: 'flex' }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  sx={{
                    my: 2, color: '#fff', display: 'block', '@media (max-width: 600px)': {
                      paddingLeft: 0,
                      paddingRight: 0,
                    },
                  }}
                  component={Link}
                  to={page}
                >
                  {page}
                </Button>
              ))}
              <Button
                key="github-link"
                sx={{
                  ml: 2, my: 2, color: '#fff', display: 'flex', '@media (max-width: 600px)': {
                    ml: 0,
                    paddingLeft: 0,
                    paddingRight: 0,
                  },
                }}
                component="a"
                href="https://github.com/TwentyPorts/SFM-Reference"
                target="_blank"
                rel="noopener noreferrer"
              >
                GITHUB&nbsp;<LinkIcon />
              </Button>

            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
export default DefaultNavbar;
