import { Box, Container, makeStyles, createStyles, Theme } from '@material-ui/core';
import Header from './app/views/Header';
import Main from './app/views/Main'
// ----------------------------------------------------------------------
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listBackgroundColor: {
      backgroundColor: 'rgba(225, 6, 0, 0.03)'
    }
  }),
);
// ----------------------------------------------------------------------
function App() {
  const classes = useStyles()
  return (
    <Box >
      <Header />
      <Container maxWidth='lg' className={classes.listBackgroundColor}>
        <Main />
      </Container>
    </Box>
  );
}

export default App;
