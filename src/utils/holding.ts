import db from '../db'

export const convertedValue = (holding: Holding) => {
  const currency: Currency = db
    .get('currencies')
    .find({ code: holding.currency_code })
    .value()

  // TODO: do not retrieve this everytime but allow immediate updates
  const currentGlobalCurrencyCode =
    localStorage.getItem('globalCurrencyCode') || 'EUR'
  const globalCurrency: Currency = db
    .get('currencies')
    .find({ code: currentGlobalCurrencyCode })
    .value()

  const euroValue: number = holding.value / (currency.euro_rate || 1)
  const globalCurrencyValue: number =
    euroValue * (globalCurrency.euro_rate || 1)

  return Math.round(globalCurrencyValue)
}
