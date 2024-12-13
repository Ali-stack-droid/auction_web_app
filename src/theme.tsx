export default {
  typography: {
    fontFamily: '"Poppins", sans-serif',
    h5: {
      fontWeight: 700,
      color: '#2D3748',
    },
    h4: {
      fontSize: '24px',
      fontWeight: 500,
      color: '#2D3748',
    },
    body1: {
      color: '#383838',
    },
  },
  palette: {
    primary: {
      main: '#2F83E9', // Set primary color
    },
    secondary: {
      main: '#19549F', // Set primary color
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          color: '#383838', // Default text color for all typography
        },
      },
    },
  },
}