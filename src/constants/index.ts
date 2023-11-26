import 'dotenv/config';

export const ROOT_DIRECTORY = process.env.ROOT_DIRECTORY as string;
export const DESTINATION_DIRECTORY = process.env
  .DESTINATION_DIRECTORY as string;
export const SHOULD_DELETE_ORIGINAL_FILES = process.env
  .SHOULD_DELETE_ORIGINAL_FILES as string;
export const EDITED_FOLDER_NAME = 'Edited';
