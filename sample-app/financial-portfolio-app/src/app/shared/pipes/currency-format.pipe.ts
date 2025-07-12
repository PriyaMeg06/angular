import { Pipe, PipeTransform } from '@angular/core';
import { formatCurrency } from '@angular/common';
import { LOCALE_ID, Inject } from '@angular/core';

@Pipe({
  name: 'currencyFormat',
})
export class CurrencyFormatPipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private locale: string) {}

  transform(
    value: number,
    currencyCode: string = 'USD',
    display: 'code' | 'symbol' | 'symbol-narrow' = 'symbol',
    digitsInfo: string = '1.2-2'
  ): string | null {
    if (value == null) {
      return null;
    }
    return formatCurrency(
      value,
      this.locale,
      currencyCode,
      display,
      digitsInfo
    );
  }
}
