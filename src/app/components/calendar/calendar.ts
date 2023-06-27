import { NgModule, Component, Input, Pipe, PipeTransform} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import * as moment from 'moment';

@Component({
    selector: 'calendar-widget',
    templateUrl: 'calendar.html',
    styleUrls: ['calendar.scss'],
})

export class CalendarComponent {

    attendances = {}; // 출석일{mmdd : YYYY-MM-DD HH:ii:ss}
    ym: any;
    weeks = [];
    month: any;


    constructor() {
        // 카렌다를 만든다.
        this.ym = moment();

        this.month = this.ym.clone(); // 선택된 날짜 정보를 복사한다.
        const start = this.ym.clone();
        start.date(1); // 선택된 달의 첫번째 날짜 객체

        this.removeTime(start.day(0)); // 이달의 첫일의 일요일 날짜의 객체를 시작일로 세팅.

        this.buildMonth(start, this.month); // scope와 시작일, 해당 월의 정보를 넘긴다.
    }



    private buildMonth(start: any, month: any) {
        // 전달 받은 정보로 해당 월의 정보를 만듬.
        this.weeks = [];
        const date = start.clone();
        let done = false, monthIndex = date.month(), count = 0;

        while (!done) {
            // start로 넘어온 일을 시작으로 달의 주정보를 생성 weeks 배열에 추가한다.ㅣ
            this.weeks.push({ days: this.buildWeek(date.clone(), month) });

            date.add(1, 'w'); // 다음 주로 이동.

            done = count++ > 2 && monthIndex !== date.month(); // 달이 넘어 가면 멈춘다.
            monthIndex = date.month();
        }
    }

    private buildWeek(date: any, month: any) {
        // 한주의 첫번쨰 날과 달의 정보를 받는다.
        const days = []; // 총 7일의 정보가 들어간다.
        for (let i = 0; i < 7; i++) {
            days.push({
                number: date.date(),
                isCurrentMonth: date.month() === month.month(),
                isToday: date.isSame(new Date(), 'day'),
                date
            });
            date = date.clone();
            date.add(1, 'd');

        }
        return days;
    }

    private removeTime(date: any) {
        // 넘어온 날짜의 제일 첫일[일요일 00:00] 으로 맞추는 역활, 한주의 일요일로 맞추는 역활
        return date.day(0).hour(0).minute(0).second(0).millisecond(0);
    }

    // 이벤트 정의
    // 날짜 선택 이벤트.
    public select(day: any) {
        this.ym = day.date;
        // 클릭시에 selected를 클릭한 날짜로 변경.
    }

    // 다음달 로 넘기는 이벤트
    public next() {
        const next = this.month.clone();

        this.removeTime( next.month( next.month() + 1).date(1));
        this.month.month(this.month.month() + 1);
        this.ym = this.month.clone();
        this.buildMonth(next, this.month);
    }

    // 이전달로 넘기는 이벤트
    public previous() {
        const previous = this.month.clone();
        this.removeTime(previous.month(previous.month() - 1).date(1));
        this.month.month(this.month.month() - 1);
        this.ym = this.month.clone();
        this.buildMonth( previous, this.month);
    }
}


@Pipe({name: 'moment'})
export class MomentPipe implements PipeTransform {
    transform(value: Date | moment.Moment, ...args: any[]): any {
        const [format] = args;
        return moment(value).format(format);
    }
}



@NgModule({
    declarations: [ CalendarComponent, MomentPipe ],
    imports: [
         CommonModule, MatIconModule
    ],
    exports: [CalendarComponent]
})
export class CalendarModule {}
