import { useCart } from './CartContext';
import {
  Alert,
  AlertTitle,
  IconButton,
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
} from '@mui/material';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

const Cart = () => {
  const { state, dispatch } = useCart();

  const removeFromCart = (id: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const checkoutCart = () => {
    dispatch({ type: 'CHECKOUT' });
  };

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3, mb: 2 }}>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant='h5' component='div' sx={{ mt: 2 }}>
            Shopping Cart ({state.items.length === 0 ? 0 : state.items.length})
          </Typography>
        </Box>

        <Divider sx={{ mt: 2 }} />

        {state.items.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          <div>
            <div className='max-h-[400px] overflow-y-scroll'>
              <ul className='cart mr-4'>
                {state.items.map((item, index) => (
                  <li key={index} className='cart-item my-4'>
                    <div className='flex'>
                      <Alert severity='info' className='flex-grow'>
                        <AlertTitle>{item.product.name}</AlertTitle>$
                        {item.product.price.toLocaleString()}
                      </Alert>
                      <div className='flex items-center justify-center bg-blue-100'>
                        <IconButton
                          color='success'
                          aria-label='remove from shopping cart'
                          onClick={() => removeFromCart(item.id)}
                          role='remove-from-cart'
                        >
                          <RemoveShoppingCartIcon color='error' />
                        </IconButton>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <Divider sx={{ my: 2 }} />

            <div className='my-4'>
              <div className='flex'>
                <Alert severity='success' className='flex-grow'>
                  <AlertTitle>
                    Total: $
                    {state.items
                      .reduce(
                        (p, c) => parseInt(p.toString()) + c.product.price,
                        0
                      )
                      .toLocaleString()}
                  </AlertTitle>
                </Alert>
                <div className='flex items-center justify-center bg-blue-100'>
                  <IconButton
                    color='success'
                    aria-label='Checkout'
                    onClick={checkoutCart}
                    role='checkout'
                  >
                    <ShoppingCartCheckoutIcon color='success' />
                  </IconButton>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Cart;
