# Moment

```
import { MomentPipesModule } from '../../pipes/ng-moment-pipes/moment.module';

@NgModule({
  imports: [
    CommonModule,
    MomentPipesModule,
  ],

```
```
{{item.created_at | moment : 'YYYY.MM.DD HH:mm:ss'}}
```
https://momentjs.com/docs/
```
yy : 2022 // 4자리 년도
YYYY : 2022 // 4자리 년도
YY : 22 // 마지막 2자리 연도
MM : 10 // 월
d: 5 // 일
DD : 05 // 일
HH : 16 // 24시간
hh : 16 // UTC 시간 인듯
mm : 16 // 분
ss :  06 // 초
```