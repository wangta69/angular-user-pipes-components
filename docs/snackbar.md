# Snackbar

app.module.ts
```
import { SnackbarModule } from './components/snackbar/snackbar';

@NgModule({
    imports: [
        SnackbarModule
    ]
})
```

app.component.html
```
<app-snackbar></app-snackbar>
```

any.component.ts
```
import { SnackbarService } from './components/snackbar/snackbar.service';
constructor(
        private SnackbarSvc: SnackbarService
    ) {

    }

anyMethod() {
    this.SnackbarSvc.show(res.error);
}

```

```
this.SnackbarSvc.show(message, options);
options: {
    show: true | false
    type: 'danger' | 'success'
    timeout: 2000  (milisecond)
}
```

