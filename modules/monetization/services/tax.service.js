// src/modules/monetization/services/tax.service.js

const DEFAULT_TAX_RATE = 0.15; // 15%
const DEFAULT_VAT_RATE = 0.15; // South Africa VAT

class TaxService {

  /**
   * Calculate withholding tax
   */
  calculateTax(amount, rate = DEFAULT_TAX_RATE) {

    amount = Number(amount || 0);

    const tax = amount * rate;

    return {
      amount,
      rate,
      tax,
      net: amount - tax
    };
  }

  /**
   * Calculate VAT
   */
  calculateVAT(amount, vatRate = DEFAULT_VAT_RATE) {

    amount = Number(amount || 0);

    const vat = amount * vatRate;

    return {
      amount,
      vatRate,
      vat,
      total: amount + vat
    };
  }

  /**
   * Creator payout after tax
   */
  calculatePayout({
    earnings = 0,
    platformFee = 0,
    taxRate = DEFAULT_TAX_RATE
  }) {

    earnings = Number(earnings);

    platformFee = Number(platformFee);

    const taxableIncome =
      earnings - platformFee;

    const tax =
      taxableIncome * taxRate;

    return {

      gross: earnings,

      platformFee,

      taxableIncome,

      tax,

      payout:
        taxableIncome - tax

    };

  }

  /**
   * Year summary
   */
  yearlySummary(records = []) {

    let gross = 0;

    let tax = 0;

    let net = 0;

    records.forEach(item => {

      gross += item.gross || 0;

      tax += item.tax || 0;

      net += item.net || 0;

    });

    return {

      gross,

      tax,

      net

    };

  }

  /**
   * Tax eligibility
   */
  requiresTaxDocument(totalEarnings) {

    return Number(totalEarnings) >= 5000;

  }

}

module.exports = new TaxService();