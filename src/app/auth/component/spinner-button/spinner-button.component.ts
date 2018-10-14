import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-spinner-button',
    templateUrl: './spinner-button.component.html',
    styleUrls: ['./spinner-button.component.scss']
})
export class SpinnerButtonComponent implements OnInit {

    @Input()
    label: string;

    @Input()
    working: boolean;

    ngOnInit() {
    }

}
