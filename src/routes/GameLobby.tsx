import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


export const LoadingGame = () => {
    return (
      <Box sx={{ display: 'flex', width:'100%' }}>
        <CircularProgress />
      </Box>
    );
  }