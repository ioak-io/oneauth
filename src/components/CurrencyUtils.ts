export function isEmptyOrSpaces(str: any) {
  return !str || str.match(/^ *$/) !== null;
}

export function formatCurrency(
  value: number,
  currency: string,
  numberFormat: string,
  hideCurrencyDisplay?: boolean,
  minimumFractionDigits: number = 0,
  maximumFractionDigits: number = 0
) {
  if (!value) {
    return 0;
  }
  const _currency = currency || 'USD';
  const _numberFormat = numberFormat || 'en-US';

  return new Intl.NumberFormat(_numberFormat, {
    style: 'currency',
    currency: _currency,
    minimumFractionDigits,
    maximumFractionDigits,
    currencyDisplay: hideCurrencyDisplay ? 'none' : 'symbol',
  }).format(value);
}

export function formatCurrencyByCompanyDetail(
  value: number,
  company: any,
  minimumFractionDigits: number = 0,
  maximumFractionDigits: number = 0
) {
  if (!value) {
    return 0;
  }
  const _currency = company?.currency || 'USD';
  const _numberFormat = company?.numberFormat || 'en-US';

  return new Intl.NumberFormat(_numberFormat, {
    style: 'currency',
    currency: _currency,
    minimumFractionDigits,
    maximumFractionDigits,
    // currencyDisplay: hideCurrencyDisplay ? 'none' : 'symbol',
  }).format(value);
}
