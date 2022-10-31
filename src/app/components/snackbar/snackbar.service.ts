import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SnackbarService {
    private snackbarSubject = new Subject<any>();
    public snackbarState = this.snackbarSubject.asObservable();

    constructor(
    ) { }

    public show(message: string, options?: any): void {
        const snackOptions = typeof options !== 'undefined' ? options : {};
        const show = typeof snackOptions.show !== 'undefined' ? snackOptions.show : true;
        const type = typeof snackOptions.type !== 'undefined' ? snackOptions.type : 'danger'; // success
        const timeout = typeof snackOptions.timeout !== 'undefined' ? snackOptions.timeout : 2000;
        this.snackbarSubject.next({
            message,
            show,
            type,
            timeout
        });
    }
}
