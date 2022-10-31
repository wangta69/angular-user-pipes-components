import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagenatorComponent } from './pagenator.component';

@NgModule({
    declarations: [PagenatorComponent],
    imports: [
        CommonModule
    ],
    exports: [
        PagenatorComponent
    ]
})
export class PagenatorModule { }
