import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Editor, NgxEditorModule, Validators } from 'ngx-editor';

@Component({
    selector: 'app-cards',
    templateUrl: './cards.component.html',
    styleUrls: ['./cards.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatButtonModule,
        NgxEditorModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [Editor],
})
export class CardsComponent implements OnInit, OnChanges, OnDestroy {
    @Input() avatarSrc?: string;
    @Input() headerImageSrc?: string;
    @Input() title?: string;
    @Input() subtitle?: string;
    @Input() content?: Object;
    @Input() actionTitle?: string;
    @Input() actionLink?: string;

    form = new FormGroup({
        editorContent: new FormControl(
            { value: null, disabled: true },
            Validators.required()
        ),
    });

    constructor(
        public _editor: Editor
    ) {
        this._editor = new Editor();
    }

    ngOnInit(): void {
        this.form.get('editorContent').setValue(this.content);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['content']) {
            this.form.get('editorContent').setValue(changes['content'].currentValue);
        }
    }

    ngOnDestroy(): void {
        this._editor.destroy();
    }

    openLink(): void {
        if (this.actionLink && (this.actionLink.startsWith('http://') || this.actionLink.startsWith('https://'))) {
            window.open(this.actionLink, '_blank');
        } else {
            window.open('https://' + this.actionLink, '_blank');
        }
    }
}
