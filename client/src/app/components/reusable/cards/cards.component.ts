import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Editor, Validators } from 'ngx-editor';

@Component({
    selector: 'app-cards',
    templateUrl: './cards.component.html',
    styleUrls: ['./cards.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() avatarSrc?: string;
    @Input() headerImageSrc?: string;
    @Input() title?: string;
    @Input() subtitle?: string;
    @Input() content?: string;
    @Input() action?: string;

    editor: Editor;

    form = new FormGroup({
        editorContent: new FormControl(
            { value: 'Carregando...', disabled: true },
            Validators.required()
        ),
    });

    constructor() {
        this.editor = new Editor();
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.editor.setContent(this.content);
    }

    ngOnDestroy(): void {
        this.editor.destroy();
    }
}
