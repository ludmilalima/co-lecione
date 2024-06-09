import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Editor, Validators } from 'ngx-editor';

@Component({
    selector: 'app-cards',
    templateUrl: './cards.component.html',
    styleUrls: ['./cards.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
    @Input() avatarSrc?: string;
    @Input() headerImageSrc?: string;
    @Input() title?: string;
    @Input() subtitle?: string;
    @Input() content?: string;
    @Input() actionTitle?: string;
    @Input() actionLink?: string;

    editor: Editor;

    form = new FormGroup({
        editorContent: new FormControl(
            { value: null, disabled: true },
            Validators.required()
        ),
    });

    constructor() {
        this.editor = new Editor();
    }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['content']) {
            this.form.get('editorContent').setValue(changes['content'].currentValue);
        }
    }

    ngAfterViewInit(): void {
        this.editor.setContent(JSON.parse(this.content));
    }

    ngOnDestroy(): void {
        this.editor.destroy();
    }

    openLink(): void {
        if (this.actionLink && (this.actionLink.startsWith('http://') || this.actionLink.startsWith('https://'))) {
            window.open(this.actionLink, '_blank');
        } else {
            window.open('https://' + this.actionLink, '_blank');
        }
    }
}
