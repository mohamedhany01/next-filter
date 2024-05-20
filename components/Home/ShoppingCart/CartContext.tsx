import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import Product from '../../constants/Product.interface';

export interface CartItem {
  id: number;
  product: Product;
}

interface CartState {
  items: CartItem[];
}

// Define separate action types for adding, removing, and checking out items
interface AddToCartAction {
  type: 'ADD_TO_CART';
  payload: Product;
}

interface RemoveFromCartAction {
  type: 'REMOVE_FROM_CART';
  payload: number;
}

interface CheckoutAction {
  type: 'CHECKOUT';
}

// Union type for CartAction
type CartAction = AddToCartAction | RemoveFromCartAction | CheckoutAction;

const CartContext = createContext<
  | {
      state: CartState;
      dispatch: React.Dispatch<CartAction>;
    }
  | undefined
>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const newItem: CartItem = {
        id: state.items.length + 1, // Generate a unique ID for the new item
        product: action.payload,
      };
      return { ...state, items: [...state.items, newItem] };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case 'CHECKOUT':
      return { ...state, items: [] };
    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
