import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'app-cards',
    templateUrl: './cards.component.html',
    styleUrls: ['./cards.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsComponent {
    @Input() avatarSrc?: string;
    @Input() headerImageSrc?: string;
    @Input() title?: string;
    @Input() subtitle?: string;
    @Input() content?: string;
    @Input() action?: string;
}
