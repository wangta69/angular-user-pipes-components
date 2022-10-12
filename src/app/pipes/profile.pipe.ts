import { NgModule } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'profile'
})
export class ProfilePipe implements PipeTransform {

    public transform(input: string, type: string, arg?: any): any {
        switch(type) {
        
            case 'birth_ym':
                return input.replace(/(\d{4})(\d{2})(\d{2})/g, '$1.$2.$3');
            case 'birth_time':
                return input.replace(/(\d{2})(\d{2})/g, '$1:$2');


        }
        return input
    }

}

@NgModule({
  declarations: [ProfilePipe],
  imports: [
  ],
  exports: [ProfilePipe]
})
export class ProfilePipeModule { }


