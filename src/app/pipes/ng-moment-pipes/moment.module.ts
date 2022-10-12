import { NgModule } from '@angular/core';
import { MomentPipe } from './moment.pipe';
import { MomentUnixPipe } from './momentUnix.pipe';
import { MomentLocalPipe } from './momentLocal.pipe';
import { MomentRelativePipe,  MomentRelativeOfPipe} from './momentRelative.pipe';

@NgModule({
  declarations: [
    MomentPipe,
    MomentUnixPipe,
    MomentRelativePipe,
    MomentRelativeOfPipe,
    MomentLocalPipe
  ],
  exports: [
    MomentPipe,
    MomentUnixPipe,
    MomentRelativePipe,
    MomentRelativeOfPipe,
    MomentLocalPipe
  ]
})
export class MomentPipesModule {}
