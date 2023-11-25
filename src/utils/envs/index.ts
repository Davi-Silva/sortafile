import {
  DESTINATION_DIRECTORY,
  ROOT_DIRECTORY,
  SHOULD_DELETE_ORIGINAL_FILES,
} from '@/constants';

export const areEnvironmentVariablesAvailable =
  ROOT_DIRECTORY && DESTINATION_DIRECTORY;

export const shouldDeleteOriginalFiles = parseInt(SHOULD_DELETE_ORIGINAL_FILES);
