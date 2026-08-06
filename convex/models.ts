export const INVESTMENT_MODELS = [
  "Loan",
  "Pure Equity",
  "Profit Share",
  "Batch Revenue Share",
  "Hybrid",
] as const;
export type InvestmentModel = (typeof INVESTMENT_MODELS)[number];

export const INVESTOR_STATUSES = ["Active", "Completed", "Defaulted", "Withdrawn"] as const;
export type InvestorStatus = (typeof INVESTOR_STATUSES)[number];

export const RELATIONSHIPS = ["Family", "Friend", "External", "Other"] as const;
export type Relationship = (typeof RELATIONSHIPS)[number];

export const REPAYMENT_FREQUENCIES = ["Monthly", "Quarterly", "One-time at end"] as const;
export type RepaymentFrequency = (typeof REPAYMENT_FREQUENCIES)[number];

export const PAYOUT_FREQUENCIES = ["Monthly", "Quarterly", "Per-batch"] as const;
export type PayoutFrequency = (typeof PAYOUT_FREQUENCIES)[number];

export const PAYOUT_KINDS = [
  "profit-cycle",
  "loan-repayment",
  "distribution",
  "withdrawal-payout",
  "manual-adjustment",
] as const;
export type PayoutKind = (typeof PAYOUT_KINDS)[number];

export const EXPENSE_CATEGORIES = [
  "COGS",
  "Fabric",
  "Production",
  "Marketing",
  "Operations",
  "Shipping",
  "Packaging",
  "Other",
] as const;

export const ASSET_CATEGORIES = [
  "Cash",
  "Inventory",
  "Equipment",
  "Vehicle",
  "Property",
  "Other",
] as const;

export const CAPITAL_METHODS = ["Cash", "Bank Transfer", "Other"] as const;

export const CNIC_REGEX = /^\d{5}-\d{7}-\d$/;

export function validateCnic(cnic: string): boolean {
  return CNIC_REGEX.test(cnic.trim());
}

export function maskCnic(cnic: string): string {
  const digits = cnic.replace(/\D/g, "");
  if (digits.length < 4) return "XXXXX-XXXXX-XXXX";
  return "XXXXX-XXXXX-" + digits.slice(-4);
}

export interface LoanResult {
  totalRepayment: number;
  perInstallment: number;
  periods: number;
  payoffTimestamp: number;
  payoffDate: string;
}

export function loanModel(
  principal: number,
  interestRatePct: number,
  repaymentPeriodMonths: number,
  frequency: RepaymentFrequency,
  startTimestamp: number,
): LoanResult {
  const totalRepayment = principal + (principal * interestRatePct) / 100;
  const periods =
    frequency === "Monthly"
      ? Math.max(1, Math.round(repaymentPeriodMonths))
      : frequency === "Quarterly"
        ? Math.max(1, Math.ceil(repaymentPeriodMonths / 3))
        : 1;
  const perInstallment = totalRepayment / periods;
  const periodMs =
    frequency === "Monthly"
      ? 30 * 86400000
      : frequency === "Quarterly"
        ? 91 * 86400000
        : Math.max(1, Math.round(repaymentPeriodMonths)) * 30 * 86400000;
  const payoffTimestamp = startTimestamp + periods * periodMs;
  return {
    totalRepayment,
    perInstallment,
    periods,
    payoffTimestamp,
    payoffDate: new Date(payoffTimestamp).toISOString().split("T")[0],
  };
}

export interface EquityResult {
  postMoneyValuation: number;
  ownershipPercentage: number;
}

export function pureEquityModel(investment: number, preMoneyValuation: number): EquityResult {
  const postMoneyValuation = preMoneyValuation + investment;
  const ownershipPercentage = postMoneyValuation > 0 ? (investment / postMoneyValuation) * 100 : 0;
  return { postMoneyValuation, ownershipPercentage };
}

export function profitShareModel(netProfit: number, sharePct: number): { payout: number } {
  return { payout: Math.max(0, netProfit) * (sharePct / 100) };
}

export function batchModel(netProfit: number, sharePct: number): { payout: number } {
  return profitShareModel(netProfit, sharePct);
}

export interface HybridResult {
  payout: number;
  toPrincipal: number;
  principalRemainingAfter: number;
}

export function hybridModel(
  netProfit: number,
  principalRemaining: number,
  sharePctAfterRecovery: number,
): HybridResult {
  if (netProfit <= 0) {
    return { payout: 0, toPrincipal: 0, principalRemainingAfter: principalRemaining };
  }
  if (principalRemaining <= 0) {
    return {
      payout: (netProfit * sharePctAfterRecovery) / 100,
      toPrincipal: 0,
      principalRemainingAfter: 0,
    };
  }
  const toPrincipal = Math.min(netProfit, principalRemaining);
  const excess = netProfit - toPrincipal;
  const payout = toPrincipal + (excess * sharePctAfterRecovery) / 100;
  return { payout, toPrincipal, principalRemainingAfter: principalRemaining - toPrincipal };
}

export function isPositiveNumber(n: unknown): n is number {
  return typeof n === "number" && Number.isFinite(n) && n >= 0;
}

export function isPercent(n: unknown): n is number {
  return typeof n === "number" && Number.isFinite(n) && n >= 0 && n <= 100;
}

export interface InvestorInput {
  investmentModel: string;
  investmentAmount?: number;
  interestRate?: number;
  repaymentPeriodMonths?: number;
  repaymentFrequency?: string;
  preMoneyValuation?: number;
  profitSharePercentage?: number;
  batchProfitSharePercentage?: number;
  profitSharePercentageAfterPrincipal?: number;
}

export function validateInvestmentInput(input: InvestorInput): string[] {
  const errors: string[] = [];
  const model = input.investmentModel;
  if (!INVESTMENT_MODELS.includes(model as InvestmentModel)) {
    errors.push("Invalid investment model.");
    return errors;
  }
  if (!isPositiveNumber(input.investmentAmount) || (input.investmentAmount ?? 0) <= 0) {
    errors.push("Investment amount must be a positive number.");
  }
  if (model === "Loan") {
    if (!isPercent(input.interestRate)) errors.push("Interest rate must be between 0 and 100.");
    if (!isPositiveNumber(input.repaymentPeriodMonths) || (input.repaymentPeriodMonths ?? 0) <= 0)
      errors.push("Repayment period must be greater than 0 months.");
    if (!REPAYMENT_FREQUENCIES.includes(input.repaymentFrequency as RepaymentFrequency))
      errors.push("Invalid repayment frequency.");
  }
  if (model === "Pure Equity") {
    if (!isPositiveNumber(input.preMoneyValuation) || (input.preMoneyValuation ?? 0) <= 0)
      errors.push("Pre-money valuation must be a positive number.");
  }
  if (model === "Profit Share" || model === "Batch Revenue Share") {
    if (!isPercent(input.profitSharePercentage ?? input.batchProfitSharePercentage))
      errors.push("Profit share percentage must be between 0 and 100.");
  }
  if (model === "Hybrid") {
    if (!isPercent(input.profitSharePercentageAfterPrincipal))
      errors.push("Profit share percentage must be between 0 and 100.");
  }
  return errors;
}
