## Installation

1. Clone the repository
2. `npm i`
3. Chang `.env.local.example` to `.env.local`
4. Run `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000) with your browser

## Unit Testing

- Run `npm run test`

## Test Plan for The APP

#### Test Cases

This test plan covers the test cases for the Home page of the application, including rendering, search functionality, sorting, filtering, and cart operations.

**1. App First Load**

| Test Case ID | Test Description                | Steps                                                           | Expected Result                |
| ------------ | ------------------------------- | --------------------------------------------------------------- | ------------------------------ |
| TC01         | Render homepage with 6 products | 1. Render the Home component<br>2. Count the products displayed | 6 products should be displayed |

**2. Search Functionality**

| Test Case ID | Test Description                                           | Steps                                                              | Expected Result                                                         |
| ------------ | ---------------------------------------------------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| TC02         | Filter items by name in real-time                          | 1. Render the Home component<br>2. Type "Item 1" in the search bar | Only "Item 1" should be displayed                                       |
| TC03         | Display no items when searching for a non-existent product | 1. Render the Home component<br>2. Type "Foo" in the search bar    | No items should be displayed and "Item Not Found" message should appear |

**3. Sorting Items**

- By Name

| Test Case ID | Test Description                        | Steps                                                                                               | Expected Result                                     |
| ------------ | --------------------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| TC04         | Sort items alphabetically (A-Z) by name | 1. Render the Home component<br>2. Click the "A - Z" radio button<br>3. Check the order of products | Products should be sorted from "Item 1" to "Item 6" |
| TC05         | Sort items alphabetically (Z-A) by name | 1. Render the Home component<br>2. Click the "Z - A" radio button<br>3. Check the order of products | Products should be sorted from "Item 6" to "Item 1" |

- By Price

| Test Case ID | Test Description               | Steps                                                                                              | Expected Result                                 |
| ------------ | ------------------------------ | -------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| TC06         | Sort items ascending by price  | 1. Render the Home component<br>2. Click the "Low" radio button<br>3. Check the order of products  | Products should be sorted from $1,000 to $4,000 |
| TC07         | Sort items descending by price | 1. Render the Home component<br>2. Click the "High" radio button<br>3. Check the order of products | Products should be sorted from $4,000 to $1,000 |

**4. Filtering Items by Price Range**

| Test Case ID | Test Description                                                     | Steps                                                                     | Expected Result                                                         |
| ------------ | -------------------------------------------------------------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| TC08         | Display items within the specified price range                       | 1. Render the Home component<br>2. Adjust price slider to $3,000 - $4,000 | Only items priced $3,000 and $4,000 should be displayed                 |
| TC09         | Display no items when setting a price range outside available limits | 1. Render the Home component<br>2. Adjust price slider to $5,000 - $5,000 | No items should be displayed and "Item Not Found" message should appear |

**5. Cart Functionality**

| Test Case ID | Test Description               | Steps                                                                                              | Expected Result                         |
| ------------ | ------------------------------ | -------------------------------------------------------------------------------------------------- | --------------------------------------- |
| TC10         | Add items to cart              | 1. Render the Home component<br>2. Click "Add to Cart" on three different items                    | Three items should be added to the cart |
| TC11         | Add and remove items from cart | 1. Render the Home component<br>2. Add three items to the cart<br>3. Remove one item from the cart | Two items should remain in the cart     |
| TC12         | Empty the cart on checkout     | 1. Render the Home component<br>2. Add three items to the cart<br>3. Click on checkout             | Cart should be empty                    |
