import {
  StoriesFetchFailureAction,
  StoriesFetchInitAction,
  StoriesFetchSuccessAction,
  StoriesRemoveAction,
} from './interface.type';
import { Stories } from './List.type';

export type StoriesAction =
  | StoriesFetchInitAction
  | StoriesFetchFailureAction
  | StoriesFetchSuccessAction
  | StoriesRemoveAction;

export type StoriesState = {
  data: Stories;
  isLoading: boolean;
  isError: boolean;
};
