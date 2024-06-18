import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedFormService {
  private formGroupSource = new BehaviorSubject<FormGroup | null>(null);
  currentForm = this.formGroupSource.asObservable();

  private formChangedSource = new BehaviorSubject<boolean>(false);
  formChanged = this.formChangedSource.asObservable();

  updateForm(form: FormGroup) {
    this.formGroupSource.next(form);
  }

  checkFormFilled(form: FormGroup) {
    const isFilled = Object.values(form.controls).some(control => control.value !== null && control.value !== '');
    this.formChangedSource.next(isFilled);
  }
}