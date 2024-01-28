import { Component } from '@angular/core';
import { CurrencyService } from './services/currency.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public currencyList: any = [];
  public symbol: string = '';
  public amount: number | undefined;
  public result: number = 0;

  constructor(
    public currencyService: CurrencyService
  ) {
  }

  ngOnInit(): void {
  }

  public selectedCurrency(currency: any): void {
    this.symbol = currency.symbol;
  }

  public convert(): void {
    const fromCode = this.currencyService.getFrom().code;
    const toCode = this.currencyService.getTo().code;
    this.currencyService.convert(fromCode, toCode, this.amount ? this.amount : 0).subscribe(data => {
      if (data.result === 'success') {
        this.result = data.conversion_result;
      }
    });
  }
}
