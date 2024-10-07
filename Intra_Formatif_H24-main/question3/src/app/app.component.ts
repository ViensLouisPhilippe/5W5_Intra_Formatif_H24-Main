import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

interface AppFormData {
  email?: string | null;
  roadnumber?: string | null;
  postalcode?: string | null;
  comments?: string | null;
  rue?: string | null;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'reactive.form';
  appForm: FormGroup<any>;
  appFormData? : AppFormData;

  constructor(
    private fb: FormBuilder
  ) { 
    this.appForm = this.fb.group({
      name: ['', [Validators.required]],
      roadnumber : ['', [Validators.required, Validators.min(1000), Validators.max(9999)]],
      postalcode : ['', [Validators.pattern(/^[A-Z][0-9][A-Z][ ]?[0-9][A-Z][0-9]$/)]],
      comments : ['', [this.minWordsValidator]],
      rue: ['', []] 
    }, {validators:this.userNameCheckValidator});

    this.appForm.valueChanges.subscribe(() => {
      this.appFormData = this.appForm.value;
    });
  }

  minWordsValidator(form: AbstractControl): ValidationErrors | null {
      const comment = form.value;
      if(!comment){
        return null;
      }
      const wordCount = comment.trim().split(/\s+/).length;
  
      return wordCount < 10 ? { minWords: true } : null;
  }

  userNameCheckValidator(form: AbstractControl): ValidationErrors | null {
    const comment = form.get('comments')?.value;
    const name = form.get('name')?.value;
    if(!comment || !name){
      return null;
    }
    let formValid = comment.includes(name);
    return formValid ? {NameInComment: true } : null;
}
}


