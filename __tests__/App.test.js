import Home from '../pages/index';
import {
  render,
  screen,
  act,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { CartProvider } from '../components/Home/ShoppingCart/CartContext';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          id: 1,
          name: 'Item 1',
          description: 'Description for Item 1',
          price: 2500,
          image: 'https://via.placeholder.com/150',
        },
        {
          id: 2,
          name: 'Item 2',
          description: 'Description for Item 2',
          price: 2500,
          image: 'https://via.placeholder.com/150',
        },
        {
          id: 3,
          name: 'Item 3',
          description: 'Description for Item 3',
          price: 1000,
          image: 'https://via.placeholder.com/150',
        },
        {
          id: 4,
          name: 'Item 4',
          description: 'Description for Item 4',
          price: 4000,
          image: 'https://via.placeholder.com/150',
        },
        {
          id: 5,
          name: 'Item 5',
          description: 'Description for Item 5',
          price: 3000,
          image: 'https://via.placeholder.com/150',
        },
        {
          id: 6,
          name: 'Item 6',
          description: 'Description for Item 6',
          price: 1500,
          image: 'https://via.placeholder.com/150',
        },
      ]),
  })
);

const PRODUCTS_COUNT = 6;
const MAX_PRICE = 4000;
const MIN_PRICE = 1000;

describe('App First Load', () => {
  test('should render the homepage with only 6 products', async () => {
    const { container } = await act(async () =>
      render(
        <CartProvider>
          <Home />
        </CartProvider>
      )
    );

    const products = container.querySelectorAll('.product-name');
    expect(products.length).toBe(PRODUCTS_COUNT);
  });
});

describe('Search Functionality', () => {
  it('should filter items by name in real-time as user types', async () => {
    const { container } = await act(async () =>
      render(
        <CartProvider>
          <Home />
        </CartProvider>
      )
    );

    const user = userEvent.setup();

    const searchBar = await screen.findByPlaceholderText('Item name');

    await user.type(searchBar, 'Item 1');

    const products = container.querySelectorAll('.product-name');
    expect(products.length).toBe(1);
  });

  test('should display no items when searching for a non-existent product', async () => {
    const { container } = await act(async () =>
      render(
        <CartProvider>
          <Home />
        </CartProvider>
      )
    );

    const user = userEvent.setup();

    const searchBar = await screen.findByPlaceholderText('Item name');

    await user.type(searchBar, 'Foo');

    const products = container.querySelectorAll('.product-name');
    expect(products.length).toBe(0);

    const notFound = screen.getByText('Item Not Found');
    expect(notFound).toBeInTheDocument();
  });
});

describe('Sorting Items', () => {
  describe('By Name', () => {
    it('should sort items alphabetically (A-Z) by name', async () => {
      const { container } = await act(async () =>
        render(
          <CartProvider>
            <Home />
          </CartProvider>
        )
      );

      const user = userEvent.setup();

      const azRadioButton = await screen.findByLabelText('A - Z');

      expect(azRadioButton.checked).toEqual(false);

      await user.click(azRadioButton);

      expect(azRadioButton.checked).toEqual(true);

      const products = container.querySelectorAll('.product-name');
      expect(products.length).toBe(PRODUCTS_COUNT);

      const firstItem = products[0].textContent;
      expect(firstItem).toBe('Item 1');

      const lastItem = products[products.length - 1].textContent;
      expect(lastItem).toBe('Item 6');
    });

    test('should sort items alphabetically (Z-A) by name', async () => {
      const { container } = await act(async () =>
        render(
          <CartProvider>
            <Home />
          </CartProvider>
        )
      );

      const user = userEvent.setup();

      const zaRadioButton = await screen.findByLabelText('Z - A');

      expect(zaRadioButton.checked).toEqual(false);

      await user.click(zaRadioButton);

      expect(zaRadioButton.checked).toEqual(true);

      const products = container.querySelectorAll('.product-name');
      expect(products.length).toBe(PRODUCTS_COUNT);

      const firstItem = products[0].textContent;
      expect(firstItem).toBe('Item 6');

      const lastItem = products[products.length - 1].textContent;
      expect(lastItem).toBe('Item 1');
    });
  });

  describe('By Price', () => {
    test('should sort items ascending by price', async () => {
      const { container } = await act(async () =>
        render(
          <CartProvider>
            <Home />
          </CartProvider>
        )
      );

      const user = userEvent.setup();

      const lowRadioButton = await screen.findByLabelText('Low');

      expect(lowRadioButton.checked).toEqual(false);

      await user.click(lowRadioButton);

      expect(lowRadioButton.checked).toEqual(true);

      const products = container.querySelectorAll('.product-price');
      expect(products.length).toBe(PRODUCTS_COUNT);

      const firstItem = products[0].textContent;
      expect(firstItem).toBe(`$${MIN_PRICE.toLocaleString()}`);

      const lastItem = products[products.length - 1].textContent;
      expect(lastItem).toBe(`$${MAX_PRICE.toLocaleString()}`);
    });

    test('should sort items descending by price', async () => {
      const { container } = await act(async () =>
        render(
          <CartProvider>
            <Home />
          </CartProvider>
        )
      );

      const user = userEvent.setup();

      const highRadioButton = await screen.findByLabelText('High');

      expect(highRadioButton.checked).toEqual(false);

      await user.click(highRadioButton);

      expect(highRadioButton.checked).toEqual(true);

      const products = container.querySelectorAll('.product-price');
      expect(products.length).toBe(PRODUCTS_COUNT);

      const firstItem = products[0].textContent;
      expect(firstItem).toBe(`$${MAX_PRICE.toLocaleString()}`);

      const lastItem = products[products.length - 1].textContent;
      expect(lastItem).toBe(`$${MIN_PRICE.toLocaleString()}`);
    });
  });
});

describe('Filtering Items by Price Range', () => {
  test('should display items within the specified price range', async () => {
    const { container } = await act(async () =>
      render(
        <CartProvider>
          <Home />
        </CartProvider>
      )
    );

    const priceSlider = await screen.findByRole('price-slider');

    const minPriceInput = priceSlider.querySelector("input[data-index='0'");
    const maxPriceInput = priceSlider.querySelector("input[data-index='1'");

    fireEvent.change(minPriceInput, { target: { value: '3000' } });
    fireEvent.change(maxPriceInput, { target: { value: '4000' } });

    await waitFor(() => {
      const products = container.querySelectorAll('.product-price');
      expect(products.length).toBe(2);
      expect(products[0].textContent).toBe('$4,000');
      expect(products[1].textContent).toBe('$3,000');
    });
  });

  test('should display no items when setting a price range outside available limits', async () => {
    const { container } = await act(async () =>
      render(
        <CartProvider>
          <Home />
        </CartProvider>
      )
    );

    const priceSlider = await screen.findByRole('price-slider');

    const minPriceInput = priceSlider.querySelector("input[data-index='0'");
    const maxPriceInput = priceSlider.querySelector("input[data-index='1'");

    fireEvent.change(minPriceInput, { target: { value: '5000' } });
    fireEvent.change(maxPriceInput, { target: { value: '5000' } });

    await waitFor(() => {
      const products = container.querySelectorAll('.product-price');
      const notFound = screen.getByText('Item Not Found');

      expect(products.length).toBe(0);
      expect(notFound).toBeInTheDocument();
    });
  });
});

describe('Cart Functionality', () => {
  it('should add items (Three Items) when click on add to cart button', async () => {
    const { container } = await act(async () =>
      render(
        <CartProvider>
          <Home />
        </CartProvider>
      )
    );

    const user = userEvent.setup();

    const allProducts = await screen.findAllByRole('add-to-cart');

    await user.click(allProducts[0]);
    await user.click(allProducts[0]);
    await user.click(allProducts[3]);

    await waitFor(() => {
      const productsInCart = container.querySelectorAll('.cart-item');
      expect(productsInCart.length).toBe(3);
    });
  });

  it('should add items (Three Items) and then remove (One Item) when click on add/remove cart button', async () => {
    const { container } = await act(async () =>
      render(
        <CartProvider>
          <Home />
        </CartProvider>
      )
    );

    const user = userEvent.setup();

    const allProductsWithAddCart = await screen.findAllByRole('add-to-cart');

    await user.click(allProductsWithAddCart[0]);
    await user.click(allProductsWithAddCart[0]);
    await user.click(allProductsWithAddCart[3]);

    const allProductsWithRemoveCart =
      await screen.findAllByRole('remove-from-cart');

    await user.click(allProductsWithRemoveCart[0]);

    await waitFor(() => {
      const productsInCart = container.querySelectorAll('.cart-item');
      expect(productsInCart.length).toBe(2);
    });
  });

  it('should make cart empty when checkout', async () => {
    const { container } = await act(async () =>
      render(
        <CartProvider>
          <Home />
        </CartProvider>
      )
    );

    const user = userEvent.setup();

    const allProductsWithAddCart = await screen.findAllByRole('add-to-cart');

    await user.click(allProductsWithAddCart[0]);
    await user.click(allProductsWithAddCart[0]);
    await user.click(allProductsWithAddCart[3]);

    const checkout = await screen.findByRole('checkout');

    await user.click(checkout);

    await waitFor(() => {
      const productsInCart = container.querySelectorAll('.cart-item');
      expect(productsInCart.length).toBe(0);
    });
  });
});
