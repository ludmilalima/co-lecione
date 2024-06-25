import { Directive, HostListener, Input } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

@Directive({
  selector: '[appCollapseAccordionOnClick]',
  standalone: true
})
export class CollapseAccordionOnClickDirective {
  @Input('appCollapseAccordionOnClick') accordion: MatAccordion;

  constructor() { }

  @HostListener('click') onClick() {
    if (this.accordion) {
      this.accordion.closeAll();
    }
  }
}