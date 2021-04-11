import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {registerAction, registerFailureAction, registerSuccessAction} from '../actions/register.action';
import {catchError, map, switchMap} from 'rxjs/operators';
import {AuthServices} from '../../services/auth.services';
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface';
import {Observable, of} from 'rxjs';

@Injectable()
export class RegisterEffect {
  register$ = createEffect((): Actions =>
    this.action$.pipe(
      ofType(registerAction),
      switchMap(({request}) => {
        return this.authService.register(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            return registerSuccessAction({currentUser});
          }),
          catchError(() => {
            return of(registerFailureAction());
          })
        );
      })
    ));

  constructor(private action$: Actions, private authService: AuthServices) {
  }
}
