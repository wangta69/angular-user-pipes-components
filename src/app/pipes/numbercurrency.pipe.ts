import { Pipe, PipeTransform, NgModule } from '@angular/core';

/**
 * 사용자 숫자 입력, 현재 number:'1.2-5'  를 사용하고 있는데 단위가 적은 경우 이 것이 디스플레이 되지 않는 단점 보완
 */
@Pipe({name: 'numbercurrency'})
export class NumberCurrencyPipe implements PipeTransform {
    constructor(

    ) {}
    transform(amount: number | string, currency: string): number | string {

        if (typeof amount === 'number') {
            amount = amount.toString();
        }
        amount = Number.parseFloat(amount).toFixed(10);
        if (!amount) {
            return amount;
        }

        switch (currency) {
            case 'KRW':
                amount = parseInt(amount, 10);
                break;
            default:
                break;
        }

        const num = amount.toString().split('.');
        let rtn = num[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        if (num[1]) {
            const last = num[1].replace(/(0+$)/, '');
            if (last) {
            rtn = rtn + '.' + last;
            }
        }
        return rtn;
    }
}

@NgModule({
    declarations: [ NumberCurrencyPipe ],
    exports: [ NumberCurrencyPipe ],
})
export class NumberCurrencyPipeModule { }
