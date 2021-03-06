import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {AuthServices} from '../../services/auth.services';
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface';
import {of} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {PersistanceService} from '../../../shared/services/persistance.service';
import {Router} from '@angular/router';
import { loginAction, loginFailureAction, loginSuccessAction } from '../actions/login.action';

@Injectable()
export class LoginEffect {
  login$ = createEffect((): Actions =>
    this.actions$.pipe(
      ofType(loginAction),
      switchMap(({request}) => {
        return this.authService.login(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            this.persistanceService.set('accessToken', currentUser.token);
            return loginSuccessAction({currentUser});
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(loginFailureAction({errors: errorResponse.error.errors}));
          })
        );
      })
    ));
  redirectAfterSubmit$ = createEffect(() => this.actions$.pipe(
    ofType(loginSuccessAction),
    tap(() => {
      this.router.navigateByUrl('/');
    })
    ),
    {dispatch: false}
  );

  constructor(
    private actions$: Actions,
    private authService: AuthServices,
    private persistanceService: PersistanceService,
    private router: Router) {
  }
}
