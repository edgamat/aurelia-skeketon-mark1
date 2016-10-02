import nprogress from 'nprogress';
import {bindable, noView} from 'aurelia-framework';

@noView
export class LoadingIndicator {
    @bindable loading = false;

    loadingChanged(newValue) {
        if(newValue) {
            nprogress.start();
            //console.log('Loading start...')
        }
        else {
            nprogress.done();
            //console.log('Loading done...')
        }
    }
}