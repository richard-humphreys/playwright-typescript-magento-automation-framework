import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchPage } from '../pages/SearchPage';
import { ProductPage } from '../pages/ProductPage';
import { MiniCart } from '../pages/MiniCart';
import { CartPage } from '../pages/CartPage';
import { CategoryPage } from '../pages/CategoryPage';

type Pages = {
  homePage: HomePage;
  searchPage: SearchPage;
  categoryPage: CategoryPage;
  productPage: ProductPage;
  miniCart: MiniCart;
  cartPage: CartPage;
};

export const test = base.extend<Pages>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  searchPage: async ({ page }, use) => {
    await use(new SearchPage(page));
  },

  categoryPage: async ({ page }, use) => {
    await use(new CategoryPage(page));
  },

  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },

  miniCart: async ({ page }, use) => {
    await use(new MiniCart(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  }
});

export { expect } from '@playwright/test';
