import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

interface AppFormData {
  email?: string | null;
  roadnumber?: string | null;
  postalcode?: string | null;
  comments?: string | null;
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
      comments : ['', [this.minWordsValidator]]
    }, {validators:this.userNameCheckValidator});

    this.appForm.valueChanges.subscribe(() => {
      this.appFormData = this.appForm.value;
    });
  }

  minWordsValidator(form: AbstractControl): ValidationErrors | null {
      const comment = form.get('comments')?.value;
      if(!comment){
        return null;
      }
      const wordCount = comment.trim().split(/\s+/).length;
  
      return wordCount < 10 ? { minWords: { requiredLength: 10, actualLength: wordCount } } : null;
  }

  userNameCheckValidator(form: AbstractControl): ValidationErrors | null {
    const comment = form.get('comments')?.value;
    const name = form.get('nom')?.value;
    if(!comment || !name){
      return null;
    }

    return comment.includes(name) ? { noNameInComment: true } : null;
}
}


