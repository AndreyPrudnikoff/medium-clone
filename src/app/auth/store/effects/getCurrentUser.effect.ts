import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface';
import {of} from 'rxjs';
import {AuthServices} from '../../services/auth.services';
import {PersistanceService} from '../../../shared/services/persistance.service';
import {getCurrentUserAction, getCurrentUserFailureAction, getCurrentUserSuccessAction} from '../actions/getCurrentUser.action';
import {Injectable} from '@angular/core';

@Injectable()
export class GetCurrentUserEffect {
  getCurrentUser$ = createEffect((): Actions =>
    this.actions$.pipe(
      ofType(getCurrentUserAction),
      switchMap(() => {
        const token = this.persistanceService.get('accessToken');
        if (!token) {
          return of(getCurrentUserFailureAction());
        }
        return this.authService.getCurrentUser().pipe(
          map((currentUser: CurrentUserInterface) => {
            return getCurrentUserSuccessAction({currentUser});
          }),
          catchError(() => {
            return of(getCurrentUserFailureAction());
          })
        );
      })
    ));

  constructor(
    private actions$: Actions,
    private authService: AuthServices,
    private persistanceService: PersistanceService) {
  }
}
