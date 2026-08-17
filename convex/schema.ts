import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  products: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.string(),
    price: v.number(),
    compareAtPrice: v.optional(v.number()),
    images: v.array(v.string()),
    category: v.string(),
    subcategory: v.optional(v.string()),
    tags: v.array(v.string()),
    sizes: v.array(v.string()),
    colors: v.array(v.string()),
    material: v.optional(v.string()),
    careInstructions: v.optional(v.string()),
    details: v.optional(v.string()),
    dimensions: v.optional(v.string()),
    video: v.optional(v.string()),
    featured: v.boolean(),
    inStock: v.boolean(),
    stockCount: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_category", ["category"])
    .index("by_featured", ["featured"]),

  orders: defineTable({
    orderNumber: v.string(),
    customerId: v.optional(v.string()),
    customerName: v.string(),
    customerEmail: v.string(),
    phone: v.optional(v.string()),
    items: v.array(
      v.object({
        productId: v.string(),
        name: v.string(),
        price: v.number(),
        quantity: v.number(),
        size: v.optional(v.string()),
        color: v.optional(v.string()),
        image: v.optional(v.string()),
      })
    ),
    subtotal: v.number(),
    shipping: v.number(),
    tax: v.number(),
    discount: v.optional(v.number()),
    couponCode: v.optional(v.string()),
    total: v.number(),
    status: v.string(),
    paymentMethod: v.string(),
    billingAddress: v.object({
      street: v.string(),
      city: v.string(),
      state: v.string(),
      zip: v.string(),
      country: v.string(),
    }),
    shippingAddress: v.object({
      street: v.string(),
      city: v.string(),
      state: v.string(),
      zip: v.string(),
      country: v.string(),
    }),
    screenshot: v.optional(v.string()),
    notes: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_orderNumber", ["orderNumber"])
    .index("by_email", ["customerEmail"])
    .index("by_status", ["status"]),

  customers: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    address: v.optional(v.string()),
    totalOrders: v.number(),
    totalSpent: v.number(),
    status: v.string(),
    role: v.optional(v.string()),
    passwordHash: v.optional(v.string()),
    passwordSalt: v.optional(v.string()),
    loginAttempts: v.number(),
    lockedUntil: v.optional(v.number()),
    avatar: v.optional(v.string()),
    notes: v.optional(v.string()),
    isEmailVerified: v.optional(v.boolean()),
    otp: v.optional(v.string()),
    otpExpiresAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_email", ["email"]),

  reviews: defineTable({
    productId: v.string(),
    customerName: v.string(),
    customerEmail: v.string(),
    rating: v.number(),
    title: v.optional(v.string()),
    comment: v.string(),
    status: v.string(),
    createdAt: v.number(),
  })
    .index("by_productId", ["productId"])
    .index("by_status", ["status"]),

  messages: defineTable({
    name: v.string(),
    email: v.string(),
    subject: v.string(),
    message: v.string(),
    status: v.string(),
    replied: v.boolean(),
    createdAt: v.number(),
  }),

  coupons: defineTable({
    code: v.string(),
    type: v.string(),
    value: v.number(),
    minPurchase: v.optional(v.number()),
    maxUses: v.optional(v.number()),
    usedCount: v.number(),
    expiresAt: v.number(),
    isActive: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_code", ["code"]),

  content: defineTable({
    key: v.string(),
    title: v.string(),
    content: v.string(),
    type: v.string(),
    updatedAt: v.number(),
  })
    .index("by_key", ["key"]),

  collections: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    image: v.optional(v.string()),
    productIds: v.array(v.string()),
    isActive: v.boolean(),
    featured: v.optional(v.boolean()),
    createdAt: v.number(),
  })
    .index("by_slug", ["slug"]),

  featuredProducts: defineTable({
    productIds: v.array(v.string()),
    updatedAt: v.number(),
  }),

  faq: defineTable({
    question: v.string(),
    answer: v.string(),
    category: v.string(),
    order: v.number(),
    isActive: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_category", ["category"]),

  shippingRates: defineTable({
    name: v.string(),
    description: v.string(),
    price: v.number(),
    estimatedDays: v.string(),
    isActive: v.boolean(),
    createdAt: v.number(),
  }),

  aboutMilestones: defineTable({
    year: v.string(),
    title: v.string(),
    description: v.string(),
    order: v.number(),
    createdAt: v.number(),
  }),

  settings: defineTable({
    storeName: v.string(),
    storeEmail: v.string(),
    currency: v.string(),
    timezone: v.string(),
    defaultTaxRate: v.number(),
    taxInclusive: v.boolean(),
    updatedAt: v.number(),
  }),

  adminSessions: defineTable({
    customerId: v.id("customers"),
    tokenHash: v.string(),
    createdAt: v.number(),
    expiresAt: v.number(),
  })
    .index("by_tokenHash", ["tokenHash"])
    .index("by_customerId", ["customerId"]),

  investors: defineTable({
    fullName: v.string(),
    cnicEncrypted: v.string(),
    cnicMasked: v.string(),
    cnicHash: v.string(),
    phoneNumber: v.string(),
    email: v.optional(v.string()),
    relationshipToOwner: v.string(),
    dateAdded: v.number(),
    investmentAmount: v.number(),
    investmentDate: v.number(),
    investmentModel: v.string(),
    status: v.string(),
    notes: v.optional(v.string()),
    interestRate: v.optional(v.number()),
    repaymentPeriodMonths: v.optional(v.number()),
    repaymentFrequency: v.optional(v.string()),
    preMoneyValuation: v.optional(v.number()),
    profitSharePercentage: v.optional(v.number()),
    payoutFrequency: v.optional(v.string()),
    profitDefinitionNotes: v.optional(v.string()),
    batchNameOrId: v.optional(v.string()),
    batchProfitSharePercentage: v.optional(v.number()),
    expectedBatchDuration: v.optional(v.string()),
    profitSharePercentageAfterPrincipal: v.optional(v.number()),
    principalRecovered: v.number(),
    cumulativeProfitLogged: v.number(),
    totalPaidToDate: v.number(),
    batchSoldOutAt: v.optional(v.number()),
    closedAt: v.optional(v.number()),
    withdrawnAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_cnicHash", ["cnicHash"])
    .index("by_model", ["investmentModel"])
    .index("by_status", ["status"]),

  payouts: defineTable({
    investorId: v.id("investors"),
    cycleDate: v.number(),
    grossRevenue: v.number(),
    costs: v.number(),
    netProfit: v.number(),
    payoutAmount: v.number(),
    kind: v.string(),
    note: v.optional(v.string()),
    principalRecoveredAfter: v.number(),
    remainingBalanceAfter: v.number(),
    runningTotalPaid: v.number(),
    createdAt: v.number(),
  })
    .index("by_investorId", ["investorId"])
    .index("by_investor_created", ["investorId", "createdAt"]),

  auditLogs: defineTable({
    actorEmail: v.string(),
    action: v.string(),
    targetType: v.string(),
    targetId: v.string(),
    changes: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_target", ["targetType", "targetId"])
    .index("by_created", ["createdAt"]),

  capitalContributions: defineTable({
    investorId: v.id("investors"),
    amountReceived: v.number(),
    receivedDate: v.number(),
    method: v.string(),
    note: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_investorId", ["investorId"])
    .index("by_date", ["receivedDate"]),

  expenses: defineTable({
    title: v.string(),
    category: v.string(),
    amount: v.number(),
    expenseDate: v.number(),
    note: v.optional(v.string()),
    createdBy: v.string(),
    createdAt: v.number(),
  })
    .index("by_date", ["expenseDate"])
    .index("by_category", ["category"]),

  assets: defineTable({
    name: v.string(),
    category: v.string(),
    purchaseDate: v.number(),
    purchaseValue: v.number(),
    currentValue: v.number(),
    note: v.optional(v.string()),
    createdBy: v.string(),
    createdAt: v.number(),
  })
    .index("by_category", ["category"]),
});
