/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as aboutMilestones from "../aboutMilestones.js";
import type * as admin from "../admin.js";
import type * as assets from "../assets.js";
import type * as capital from "../capital.js";
import type * as collections from "../collections.js";
import type * as content from "../content.js";
import type * as coupons from "../coupons.js";
import type * as crypto from "../crypto.js";
import type * as customers from "../customers.js";
import type * as email from "../email.js";
import type * as expenses from "../expenses.js";
import type * as faq from "../faq.js";
import type * as featuredProducts from "../featuredProducts.js";
import type * as finance from "../finance.js";
import type * as investors from "../investors.js";
import type * as messages from "../messages.js";
import type * as models from "../models.js";
import type * as orders from "../orders.js";
import type * as products from "../products.js";
import type * as reviews from "../reviews.js";
import type * as settings from "../settings.js";
import type * as shippingRates from "../shippingRates.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  aboutMilestones: typeof aboutMilestones;
  admin: typeof admin;
  assets: typeof assets;
  capital: typeof capital;
  collections: typeof collections;
  content: typeof content;
  coupons: typeof coupons;
  crypto: typeof crypto;
  customers: typeof customers;
  email: typeof email;
  expenses: typeof expenses;
  faq: typeof faq;
  featuredProducts: typeof featuredProducts;
  finance: typeof finance;
  investors: typeof investors;
  messages: typeof messages;
  models: typeof models;
  orders: typeof orders;
  products: typeof products;
  reviews: typeof reviews;
  settings: typeof settings;
  shippingRates: typeof shippingRates;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
