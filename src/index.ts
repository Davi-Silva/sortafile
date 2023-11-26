import fs from 'fs/promises';

import { ROOT_DIRECTORY } from '@/constants';
import {
  File,
  areEnvironmentVariablesAvailable,
  errorMessage,
  successMessage,
  warningMessage,
} from '@/utils';

// TODO: Extend implementation to support "Edited" photos/videos
// Explaination: Whenever a file is not a .CR3 file move it to a
// "Edited" folder within the current newly created "day month year" folder

const traverseDirectory = async (currentPath: string) => {
  try {
    const files = await fs.readdir(currentPath);

    files.forEach(async (file) => {
      const newFile = new File(currentPath, file);
      const fileStat = await newFile.getStat();

      if (fileStat.isDirectory()) {
        traverseDirectory(newFile.getPath());
      } else {
        await newFile.moveFile();
      }
    });
  } catch (err) {
    errorMessage(err);
  }
};

if (!areEnvironmentVariablesAvailable) {
  warningMessage('Envrionment variables are not set.');
} else {
  successMessage('Copying files...');
  traverseDirectory(ROOT_DIRECTORY).catch((error) => {
    errorMessage(error);
  });
}
