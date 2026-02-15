import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Commerce API client for Hanzo Commerce backend.
 * Provides access to products, orders, carts, checkout, subscriptions,
 * coupons, referrals, and affiliates.
 */
export class Commerce extends APIResource {
  /**
   * List products
   */
  listProducts(
    query?: CommerceListProductsParams,
    options?: RequestOptions,
  ): APIPromise<CommerceProductListResponse> {
    return this._client.get('/product', { query, ...options });
  }

  /**
   * Create a product
   */
  createProduct(
    body: CommerceCreateProductParams,
    options?: RequestOptions,
  ): APIPromise<CommerceProductResponse> {
    return this._client.post('/product', { body, ...options });
  }

  /**
   * Retrieve a product by ID
   */
  getProduct(
    productId: string,
    options?: RequestOptions,
  ): APIPromise<CommerceProductResponse> {
    return this._client.get(`/product/${productId}`, options);
  }

  /**
   * Update a product
   */
  updateProduct(
    productId: string,
    body: CommerceUpdateProductParams,
    options?: RequestOptions,
  ): APIPromise<CommerceProductResponse> {
    return this._client.patch(`/product/${productId}`, { body, ...options });
  }

  /**
   * Delete a product
   */
  deleteProduct(productId: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.delete(`/product/${productId}`, options);
  }

  /**
   * List orders
   */
  listOrders(
    query?: CommerceListOrdersParams,
    options?: RequestOptions,
  ): APIPromise<CommerceOrderListResponse> {
    return this._client.get('/order', { query, ...options });
  }

  /**
   * Create an order
   */
  createOrder(
    body: CommerceCreateOrderParams,
    options?: RequestOptions,
  ): APIPromise<CommerceOrderResponse> {
    return this._client.post('/order', { body, ...options });
  }

  /**
   * Retrieve an order by ID
   */
  getOrder(orderId: string, options?: RequestOptions): APIPromise<CommerceOrderResponse> {
    return this._client.get(`/order/${orderId}`, options);
  }

  /**
   * Authorize payment for an order (hold funds)
   */
  authorizeOrder(orderId: string, options?: RequestOptions): APIPromise<CommerceOrderResponse> {
    return this._client.post(`/order/${orderId}/authorize`, options);
  }

  /**
   * Capture payment for an authorized order
   */
  captureOrder(orderId: string, options?: RequestOptions): APIPromise<CommerceOrderResponse> {
    return this._client.post(`/order/${orderId}/capture`, options);
  }

  /**
   * One-step charge for an order (authorize + capture)
   */
  chargeOrder(orderId: string, options?: RequestOptions): APIPromise<CommerceOrderResponse> {
    return this._client.post(`/order/${orderId}/charge`, options);
  }

  /**
   * Refund an order (full or partial)
   */
  refundOrder(
    orderId: string,
    body?: CommerceRefundParams,
    options?: RequestOptions,
  ): APIPromise<CommerceOrderResponse> {
    return this._client.post(`/order/${orderId}/refund`, { body, ...options });
  }

  /**
   * Get order status
   */
  getOrderStatus(orderId: string, options?: RequestOptions): APIPromise<CommerceOrderStatusResponse> {
    return this._client.get(`/order/${orderId}/status`, options);
  }

  /**
   * List payments for an order
   */
  listOrderPayments(orderId: string, options?: RequestOptions): APIPromise<CommercePaymentListResponse> {
    return this._client.get(`/order/${orderId}/payments`, options);
  }

  /**
   * Create a cart
   */
  createCart(body?: CommerceCreateCartParams, options?: RequestOptions): APIPromise<CommerceCartResponse> {
    return this._client.post('/cart', { body, ...options });
  }

  /**
   * Retrieve a cart by ID
   */
  getCart(cartId: string, options?: RequestOptions): APIPromise<CommerceCartResponse> {
    return this._client.get(`/cart/${cartId}`, options);
  }

  /**
   * Update a cart
   */
  updateCart(
    cartId: string,
    body: CommerceUpdateCartParams,
    options?: RequestOptions,
  ): APIPromise<CommerceCartResponse> {
    return this._client.put(`/cart/${cartId}`, { body, ...options });
  }

  /**
   * Set cart contents (replace all items)
   */
  setCart(
    cartId: string,
    body: CommerceSetCartParams,
    options?: RequestOptions,
  ): APIPromise<CommerceCartResponse> {
    return this._client.post(`/cart/${cartId}/set`, { body, ...options });
  }

  /**
   * Discard a cart
   */
  discardCart(cartId: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.post(`/cart/${cartId}/discard`, options);
  }

  /**
   * Checkout: authorize payment (creates order from cart)
   */
  checkoutAuthorize(
    body: CommerceCheckoutParams,
    options?: RequestOptions,
  ): APIPromise<CommerceOrderResponse> {
    return this._client.post('/checkout/authorize', { body, ...options });
  }

  /**
   * Checkout: one-step charge
   */
  checkoutCharge(
    body: CommerceCheckoutParams,
    options?: RequestOptions,
  ): APIPromise<CommerceOrderResponse> {
    return this._client.post('/checkout/charge', { body, ...options });
  }

  /**
   * Checkout: capture previously authorized order
   */
  checkoutCapture(orderId: string, options?: RequestOptions): APIPromise<CommerceOrderResponse> {
    return this._client.post(`/checkout/capture/${orderId}`, options);
  }

  /**
   * Checkout: confirm/complete order
   */
  checkoutConfirm(orderId: string, options?: RequestOptions): APIPromise<CommerceOrderResponse> {
    return this._client.post(`/checkout/confirm/${orderId}`, options);
  }

  /**
   * Checkout: cancel order
   */
  checkoutCancel(orderId: string, options?: RequestOptions): APIPromise<CommerceOrderResponse> {
    return this._client.post(`/checkout/cancel/${orderId}`, options);
  }

  /**
   * List subscriptions
   */
  listSubscriptions(
    query?: CommerceListSubscriptionsParams,
    options?: RequestOptions,
  ): APIPromise<CommerceSubscriptionListResponse> {
    return this._client.get('/subscribe', { query, ...options });
  }

  /**
   * Create a subscription
   */
  createSubscription(
    body: CommerceCreateSubscriptionParams,
    options?: RequestOptions,
  ): APIPromise<CommerceSubscriptionResponse> {
    return this._client.post('/subscribe', { body, ...options });
  }

  /**
   * Retrieve a subscription by ID
   */
  getSubscription(
    subscriptionId: string,
    options?: RequestOptions,
  ): APIPromise<CommerceSubscriptionResponse> {
    return this._client.get(`/subscribe/${subscriptionId}`, options);
  }

  /**
   * Update/change subscription plan
   */
  updateSubscription(
    subscriptionId: string,
    body: CommerceUpdateSubscriptionParams,
    options?: RequestOptions,
  ): APIPromise<CommerceSubscriptionResponse> {
    return this._client.patch(`/subscribe/${subscriptionId}`, { body, ...options });
  }

  /**
   * Cancel a subscription (at period end by default)
   */
  cancelSubscription(
    subscriptionId: string,
    query?: CommerceCancelSubscriptionParams,
    options?: RequestOptions,
  ): APIPromise<unknown> {
    return this._client.delete(`/subscribe/${subscriptionId}`, { query, ...options });
  }

  /**
   * Apply promotion/coupon code to a subscription
   */
  applySubscriptionPromotion(
    subscriptionId: string,
    body: CommerceApplyPromotionParams,
    options?: RequestOptions,
  ): APIPromise<CommerceSubscriptionResponse> {
    return this._client.post(`/subscribe/${subscriptionId}/promotion`, { body, ...options });
  }

  /**
   * Get billing portal session URL
   */
  getBillingPortal(options?: RequestOptions): APIPromise<CommerceBillingPortalResponse> {
    return this._client.get('/billing/portal', options);
  }

  /**
   * List invoices
   */
  listInvoices(
    query?: CommerceListInvoicesParams,
    options?: RequestOptions,
  ): APIPromise<CommerceInvoiceListResponse> {
    return this._client.get('/invoices', { query, ...options });
  }

  /**
   * Get usage metrics
   */
  getUsage(options?: RequestOptions): APIPromise<CommerceUsageResponse> {
    return this._client.get('/usage', options);
  }

  /**
   * List coupons
   */
  listCoupons(
    query?: CommerceListCouponsParams,
    options?: RequestOptions,
  ): APIPromise<CommerceCouponListResponse> {
    return this._client.get('/coupon', { query, ...options });
  }

  /**
   * Create a coupon
   */
  createCoupon(
    body: CommerceCreateCouponParams,
    options?: RequestOptions,
  ): APIPromise<CommerceCouponResponse> {
    return this._client.post('/coupon', { body, ...options });
  }

  /**
   * Retrieve a coupon by ID
   */
  getCoupon(couponId: string, options?: RequestOptions): APIPromise<CommerceCouponResponse> {
    return this._client.get(`/coupon/${couponId}`, options);
  }

  /**
   * Update a coupon
   */
  updateCoupon(
    couponId: string,
    body: CommerceUpdateCouponParams,
    options?: RequestOptions,
  ): APIPromise<CommerceCouponResponse> {
    return this._client.patch(`/coupon/${couponId}`, { body, ...options });
  }

  /**
   * Delete a coupon
   */
  deleteCoupon(couponId: string, options?: RequestOptions): APIPromise<unknown> {
    return this._client.delete(`/coupon/${couponId}`, options);
  }

  /**
   * Generate coupon codes
   */
  generateCouponCodes(
    couponId: string,
    body: CommerceGenerateCouponCodesParams,
    options?: RequestOptions,
  ): APIPromise<CommerceCouponCodesResponse> {
    return this._client.post(`/coupon/${couponId}/codes`, { body, ...options });
  }

  /**
   * List referrals
   */
  listReferrals(query?: CommerceListParams, options?: RequestOptions): APIPromise<CommerceReferralListResponse> {
    return this._client.get('/referral', { query, ...options });
  }

  /**
   * Create a referral
   */
  createReferral(
    body: CommerceCreateReferralParams,
    options?: RequestOptions,
  ): APIPromise<CommerceReferralResponse> {
    return this._client.post('/referral', { body, ...options });
  }

  /**
   * Get referrals for a user
   */
  getUserReferrals(userId: string, options?: RequestOptions): APIPromise<CommerceReferralListResponse> {
    return this._client.get(`/user/${userId}/referrals`, options);
  }

  /**
   * Get referrers for a user
   */
  getUserReferrers(userId: string, options?: RequestOptions): APIPromise<CommerceReferralListResponse> {
    return this._client.get(`/user/${userId}/referrers`, options);
  }

  /**
   * List affiliates
   */
  listAffiliates(
    query?: CommerceListParams,
    options?: RequestOptions,
  ): APIPromise<CommerceAffiliateListResponse> {
    return this._client.get('/affiliate', { query, ...options });
  }

  /**
   * Create an affiliate
   */
  createAffiliate(
    body: CommerceCreateAffiliateParams,
    options?: RequestOptions,
  ): APIPromise<CommerceAffiliateResponse> {
    return this._client.post('/affiliate', { body, ...options });
  }

  /**
   * Get affiliate by ID
   */
  getAffiliate(affiliateId: string, options?: RequestOptions): APIPromise<CommerceAffiliateResponse> {
    return this._client.get(`/affiliate/${affiliateId}`, options);
  }

  /**
   * Connect/link an affiliate
   */
  connectAffiliate(affiliateId: string, options?: RequestOptions): APIPromise<CommerceAffiliateResponse> {
    return this._client.get(`/affiliate/${affiliateId}/connect`, options);
  }

  /**
   * Get dashboard metrics (daily)
   */
  getDashboardMetrics(options?: RequestOptions): APIPromise<CommerceDashboardMetricsResponse> {
    return this._client.get('/counter/dashboard/daily', options);
  }

  /**
   * Get topline metrics
   */
  getToplineMetrics(options?: RequestOptions): APIPromise<CommerceToplineMetricsResponse> {
    return this._client.get('/counter/topline', options);
  }

  /**
   * Search orders
   */
  searchOrders(
    query: CommerceSearchParams,
    options?: RequestOptions,
  ): APIPromise<CommerceOrderListResponse> {
    return this._client.get('/search/order', { query, ...options });
  }

  /**
   * Search users
   */
  searchUsers(
    query: CommerceSearchParams,
    options?: RequestOptions,
  ): APIPromise<unknown> {
    return this._client.get('/search/user', { query, ...options });
  }
}

// ────────────────────── Common types ──────────────────────

export interface CommerceListParams {
  page?: number;
  count?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface CommerceSearchParams extends CommerceListParams {
  q: string;
}

export interface CommerceAddress {
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

export interface CommerceLineItem {
  productId: string;
  variantId?: string;
  quantity: number;
  price?: number;
}

export interface CommercePaymentMethod {
  type: 'card' | 'crypto' | 'wallet' | 'paypal';
  token?: string;
  address?: string;
}

// ────────────────────── Product types ──────────────────────

export interface CommerceProductResponse {
  id: string;
  slug: string;
  name: string;
  description?: string;
  price: number;
  listPrice?: number;
  sku?: string;
  available?: boolean;
  inventory?: number;
  sold?: number;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export type CommerceProductListResponse = Array<CommerceProductResponse>;

export interface CommerceCreateProductParams {
  slug: string;
  name: string;
  description?: string;
  price: number;
  listPrice?: number;
  sku?: string;
  available?: boolean;
  inventory?: number;
  metadata?: Record<string, unknown>;
}

export interface CommerceUpdateProductParams {
  name?: string;
  description?: string;
  price?: number;
  listPrice?: number;
  sku?: string;
  available?: boolean;
  inventory?: number;
  metadata?: Record<string, unknown>;
}

export type CommerceListProductsParams = CommerceListParams;

// ────────────────────── Order types ──────────────────────

export interface CommerceOrderResponse {
  id: string;
  status: string;
  items: Array<CommerceLineItem>;
  subtotal: number;
  total: number;
  currency: string;
  customerId?: string;
  shippingAddress?: CommerceAddress;
  billingAddress?: CommerceAddress;
  paymentMethod?: CommercePaymentMethod;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export type CommerceOrderListResponse = Array<CommerceOrderResponse>;

export interface CommerceOrderStatusResponse {
  id: string;
  status: string;
  updatedAt: string;
}

export interface CommerceCreateOrderParams {
  items: Array<CommerceLineItem>;
  customerId?: string;
  cartId?: string;
  shippingAddress?: CommerceAddress;
  billingAddress?: CommerceAddress;
  paymentMethod?: CommercePaymentMethod;
  currency?: string;
  metadata?: Record<string, unknown>;
}

export interface CommerceRefundParams {
  amount?: number;
  reason?: string;
}

export type CommerceListOrdersParams = CommerceListParams;

// ────────────────────── Payment types ──────────────────────

export interface CommercePaymentResponse {
  id: string;
  orderId: string;
  amount: number;
  status: string;
  method: string;
  createdAt: string;
}

export type CommercePaymentListResponse = Array<CommercePaymentResponse>;

// ────────────────────── Cart types ──────────────────────

export interface CommerceCartResponse {
  id: string;
  items: Array<CommerceLineItem>;
  subtotal: number;
  total: number;
  customerId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommerceCreateCartParams {
  customerId?: string;
  items?: Array<CommerceLineItem>;
}

export interface CommerceUpdateCartParams {
  items: Array<CommerceLineItem>;
}

export interface CommerceSetCartParams {
  items: Array<CommerceLineItem>;
}

// ────────────────────── Checkout types ──────────────────────

export interface CommerceCheckoutParams {
  cartId?: string;
  orderId?: string;
  items?: Array<CommerceLineItem>;
  paymentMethod: CommercePaymentMethod;
  shippingAddress?: CommerceAddress;
  billingAddress?: CommerceAddress;
  currency?: string;
  metadata?: Record<string, unknown>;
}

// ────────────────────── Subscription types ──────────────────────

export interface CommerceSubscriptionResponse {
  id: string;
  status: 'active' | 'canceled' | 'past_due' | 'trialing' | 'paused';
  planId: string;
  customerId: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export type CommerceSubscriptionListResponse = Array<CommerceSubscriptionResponse>;

export interface CommerceCreateSubscriptionParams {
  planId: string;
  customerId: string;
  paymentMethod?: CommercePaymentMethod;
  trialDays?: number;
  couponCode?: string;
  metadata?: Record<string, unknown>;
}

export interface CommerceUpdateSubscriptionParams {
  planId?: string;
  paymentMethod?: CommercePaymentMethod;
  metadata?: Record<string, unknown>;
}

export interface CommerceCancelSubscriptionParams {
  cancel_at_period_end?: boolean;
}

export interface CommerceApplyPromotionParams {
  code: string;
}

export type CommerceListSubscriptionsParams = CommerceListParams;

// ────────────────────── Billing types ──────────────────────

export interface CommerceBillingPortalResponse {
  url: string;
  expiresAt: string;
}

export interface CommerceInvoiceResponse {
  id: string;
  subscriptionId: string;
  amount: number;
  status: string;
  paidAt?: string;
  dueDate?: string;
  createdAt: string;
}

export type CommerceInvoiceListResponse = Array<CommerceInvoiceResponse>;

export type CommerceListInvoicesParams = CommerceListParams;

export interface CommerceUsageResponse {
  messages: number;
  tokens: number;
  cost: number;
  period: { start: string; end: string };
}

// ────────────────────── Coupon types ──────────────────────

export interface CommerceCouponResponse {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  amount: number;
  currency?: string;
  maxRedemptions?: number;
  timesRedeemed: number;
  expiresAt?: string;
  enabled: boolean;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export type CommerceCouponListResponse = Array<CommerceCouponResponse>;

export interface CommerceCreateCouponParams {
  code: string;
  type: 'percentage' | 'fixed';
  amount: number;
  currency?: string;
  maxRedemptions?: number;
  expiresAt?: string;
  enabled?: boolean;
  metadata?: Record<string, unknown>;
}

export interface CommerceUpdateCouponParams {
  enabled?: boolean;
  maxRedemptions?: number;
  expiresAt?: string;
  metadata?: Record<string, unknown>;
}

export interface CommerceGenerateCouponCodesParams {
  count: number;
  prefix?: string;
}

export interface CommerceCouponCodesResponse {
  codes: Array<string>;
}

export type CommerceListCouponsParams = CommerceListParams;

// ────────────────────── Referral types ──────────────────────

export interface CommerceReferralResponse {
  id: string;
  referrerId: string;
  referredId?: string;
  code: string;
  status: 'pending' | 'completed' | 'expired';
  reward?: number;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export type CommerceReferralListResponse = Array<CommerceReferralResponse>;

export interface CommerceCreateReferralParams {
  referrerId: string;
  code?: string;
  reward?: number;
  metadata?: Record<string, unknown>;
}

// ────────────────────── Affiliate types ──────────────────────

export interface CommerceAffiliateResponse {
  id: string;
  userId: string;
  code: string;
  commissionRate: number;
  totalEarnings: number;
  totalReferrals: number;
  status: 'active' | 'inactive' | 'suspended';
  payoutMethod?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export type CommerceAffiliateListResponse = Array<CommerceAffiliateResponse>;

export interface CommerceCreateAffiliateParams {
  userId: string;
  code?: string;
  commissionRate: number;
  payoutMethod?: string;
  metadata?: Record<string, unknown>;
}

// ────────────────────── Dashboard/Metrics types ──────────────────────

export interface CommerceDashboardMetricsResponse {
  revenue: number;
  orders: number;
  customers: number;
  averageOrderValue: number;
  period: { start: string; end: string };
}

export interface CommerceToplineMetricsResponse {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  activeSubscriptions: number;
}

export declare namespace Commerce {
  export {
    type CommerceListParams as CommerceListParams,
    type CommerceSearchParams as CommerceSearchParams,
    type CommerceAddress as CommerceAddress,
    type CommerceLineItem as CommerceLineItem,
    type CommercePaymentMethod as CommercePaymentMethod,
    type CommerceProductResponse as CommerceProductResponse,
    type CommerceProductListResponse as CommerceProductListResponse,
    type CommerceCreateProductParams as CommerceCreateProductParams,
    type CommerceUpdateProductParams as CommerceUpdateProductParams,
    type CommerceOrderResponse as CommerceOrderResponse,
    type CommerceOrderListResponse as CommerceOrderListResponse,
    type CommerceCreateOrderParams as CommerceCreateOrderParams,
    type CommerceRefundParams as CommerceRefundParams,
    type CommerceCartResponse as CommerceCartResponse,
    type CommerceCreateCartParams as CommerceCreateCartParams,
    type CommerceCheckoutParams as CommerceCheckoutParams,
    type CommerceSubscriptionResponse as CommerceSubscriptionResponse,
    type CommerceCreateSubscriptionParams as CommerceCreateSubscriptionParams,
    type CommerceUpdateSubscriptionParams as CommerceUpdateSubscriptionParams,
    type CommerceCancelSubscriptionParams as CommerceCancelSubscriptionParams,
    type CommerceBillingPortalResponse as CommerceBillingPortalResponse,
    type CommerceUsageResponse as CommerceUsageResponse,
    type CommerceCouponResponse as CommerceCouponResponse,
    type CommerceCreateCouponParams as CommerceCreateCouponParams,
    type CommerceReferralResponse as CommerceReferralResponse,
    type CommerceCreateReferralParams as CommerceCreateReferralParams,
    type CommerceAffiliateResponse as CommerceAffiliateResponse,
    type CommerceCreateAffiliateParams as CommerceCreateAffiliateParams,
    type CommerceDashboardMetricsResponse as CommerceDashboardMetricsResponse,
    type CommerceToplineMetricsResponse as CommerceToplineMetricsResponse,
  };
}
