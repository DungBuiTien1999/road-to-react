import { Story, Stories } from './List.type';

export interface StoriesFetchInitAction {
  type: 'STORIES_FETCH_INIT';
}
export interface StoriesFetchSuccessAction {
  type: 'STORIES_FETCH_SUCCESS';
  payload: Stories;
}
export interface StoriesFetchFailureAction {
  type: 'STORIES_FETCH_FAILURE';
}
export interface StoriesRemoveAction {
  type: 'REMOVE_STORY';
  payload: Story;
}
