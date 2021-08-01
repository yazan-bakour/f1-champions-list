import { Box, Typography } from "@material-ui/core";
// Using material ui Box component which allows us to right sx css inline, and it will be compiled into single uglified class.
// Also using material will not cause the compiler to go and look for css files, instead will read the css as javascript, whic is faster for browser to read. 
const Header = () => {
  return (
    <Box height={100} bgcolor="#15151e" paddingX={3} pt={2} position="relative">
      <Box>
        <img src="/f1_logo.svg" alt="F1 logo" />
      </Box>
      <Box
        position="absolute"
        bottom="0"
        right={0}
        left="0"
        padding="12px"
        bgcolor="#38383f"
      >
        <Typography component="h1" color="secondary" align="center">
          Welcome to F1 Champion list
        </Typography>
      </Box>
    </Box>
  );
};

export default Header;
