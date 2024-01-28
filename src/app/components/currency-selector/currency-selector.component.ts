import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-currency-selector',
  templateUrl: './currency-selector.component.html',
  styleUrls: ['./currency-selector.component.scss']
})
export class CurrencySelectorComponent implements OnInit {
  @Input() label: string = '';
  @Output() selectedCurrency: EventEmitter<any> = new EventEmitter();

  public currencyList: any = [];
  public currencyFormControl: FormControl = new FormControl();

  constructor(
    private _currencyService: CurrencyService
  ) { }

  ngOnInit(): void {
    this.getCurrencyList();
  }

  public getCurrencyList(): void {
    this._currencyService.getCurrencies().subscribe(data => {
      if (data?.supported_codes) {
        data?.supported_codes.forEach((c: any) => {
          this.currencyList.push({
            code: c[0],
            name: c[1]
          });
        });
      } else {
        console.log('Error')
      }
    });

    this._currencyService.getCountries().subscribe(data => {
      data.forEach((c: any) => {
        let code = Object.keys(c.currencies)[0];
        let currency = this.currencyList.find((curr: any) => curr.code === code);
        if (currency != undefined) {
          currency['symbol'] = c.currencies[code].symbol;
          currency['image'] = c.flags.svg;
        }
      });
    });
  }

  public selectCurrency(curr: any) {
    if (this.label === 'From') {
      this._currencyService.setFrom(curr?.value || curr);
      this.selectedCurrency.emit(curr?.value || curr);
    } else if (this.label === 'To') {
      this._currencyService.setTo(curr?.value || curr);
      this.selectedCurrency.emit();
    }
  }

  public setCurrency(): void {
    debugger
    let value: any;
    if (this.label === 'From') {
      value = this._currencyService.getFrom() !== null ? this._currencyService.getFrom() : null;
    } else if (this.label === 'To') {
      value = this._currencyService.getTo() !== null ? this._currencyService.getTo() : null;
    }
    this.currencyFormControl.setValue(value);
  }
}
