import { Component, OnInit, OnDestroy, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { SnackbarService } from './snackbar.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  animations: [
    trigger('state', [
        // 들어오고 나갈대만 현재것을 인식하고 나머지는 css를 인식
      transition(':enter', [
       style({ top: '-100px', transform: 'translateX(-50%) scale(0.3)' }),
        animate('150ms cubic-bezier(0, 0, 0.2, 1)', style({
          transform: 'translateX(-50%) scale(1)',
          opacity: 1,
          top: '20px'
        })),
      ]),
      transition(':leave', [
        animate('150ms cubic-bezier(0.4, 0.0, 1, 1)', style({
          transform: 'translateX(-50%) scale(0.1)',
          opacity: 0,
          top: '-100px'
        }))
      ])
    ])
  ]
})
export class SnackbarComponent implements OnInit, OnDestroy {
    public show: boolean = false;
    public message: string = '';
    public type: string = ''; // success || danger
    private snackbarSubscription?: Subscription;

    constructor(private snackbarService: SnackbarService) { }

    public ngOnInit(): void {
        this.snackbarSubscription = this.snackbarService.snackbarState
        .subscribe(
            (state) => {
                this.type = state.type;
                this.message = state.message;
                this.show = state.show;
                setTimeout(() => {
                    this.show = false;
                }, state.timeout);
        });
    }

    public ngOnDestroy(): void {
        if (this.snackbarSubscription) {
            this.snackbarSubscription.unsubscribe();
        }
    }

}


@NgModule({
    declarations: [
        SnackbarComponent
    ],
    imports: [
        CommonModule,
    ],

    exports: [
        SnackbarComponent
    ],
    providers: [
        SnackbarService,
    ],
})
export class SnackbarModule { }
