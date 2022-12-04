import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'app-error-message',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './error-message.component.html',
    styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent {
    @Input() condition: boolean;
    @Input() message: string;
}
