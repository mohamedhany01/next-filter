import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const Button = () => {
  return (
    <Stack direction='row' spacing={1}>
      <IconButton color='primary' aria-label='add to shopping cart'>
        <AddShoppingCartIcon />
      </IconButton>
    </Stack>
  );
};

export default Button;
