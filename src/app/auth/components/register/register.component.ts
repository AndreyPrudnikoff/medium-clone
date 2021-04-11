import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';

import {registerAction} from '../../store/actions/register.action';
import {Observable} from 'rxjs';
import {isSubmittingSelector} from '../../store/selectors';
import {AuthServices} from '../../services/auth.services';
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface';
import {RegisterRequestInterface} from '../../types/registerRequest.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup = this.fb.group({
    username: ['', Validators.required],
    email: '',
    password: '',
  });
  // @ts-ignore
  isSubmitting$: Observable<boolean> = this.store.pipe(select(isSubmittingSelector));

  constructor(private fb: FormBuilder, private store: Store, private authService: AuthServices) {
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    console.log(this.form.value);
    const request = {user: this.form.value};
    this.store.dispatch(registerAction({request}));
  }
}
