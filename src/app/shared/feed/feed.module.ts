import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FeedComponent} from './components/globalFeed/feed.component';
import {GetFeedEffect} from './store/effects/getFeed.effect';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store/reducers';
import {FeedService} from './services/feed.service';


@NgModule({
  imports: [CommonModule, EffectsModule.forFeature([GetFeedEffect]), StoreModule.forFeature('feed', reducers)],
  exports: [FeedComponent],
  declarations: [FeedComponent],
  providers: [FeedService]
})
export class FeedModule {}
