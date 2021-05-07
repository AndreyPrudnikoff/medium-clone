import {FeedStateInterface} from '../types/feedState.interface';
import {Action, createReducer, on} from '@ngrx/store';
import {getFeedAction, getFeedFailureAction, getFeedSuccessAction} from './actions/getFeed.action';

const initialSate: FeedStateInterface = {
  isLoading: false,
  error: null,
  data: null
};

const feedReducer = createReducer(
  initialSate,
  on(getFeedAction, (state): FeedStateInterface => ({
    ...state,
    isLoading: true
  })),
  on(getFeedSuccessAction, (state, action): FeedStateInterface => ({
    ...state,
    isLoading: false,
    data: action.feed
  })),
  on(getFeedFailureAction, (state, action): FeedStateInterface => ({
    ...state,
    isLoading: false
  }))
);

export function reducers(state: FeedStateInterface, action: Action): FeedStateInterface {
  return feedReducer(state, action);
}
