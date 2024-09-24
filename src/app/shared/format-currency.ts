export class CurrencyFormatter {
    static formatCurrency(value: number, locale = 'es-ES', currency = 'COP') {
        return new Intl.NumberFormat(locale).format(value);
    }
}