import fs from 'fs';

import { ROOT_DIRECTORY } from '@/constants';
import {
  File,
  areEnvironmentVariablesAvailable,
  errorMessage,
  successMessage,
} from '@/utils';

const traverseDirectory = (currentPath: string) => {
  const files = fs.readdirSync(currentPath);

  files.forEach(async (file) => {
    const newFile = new File(currentPath, file);
    const fileStat = await newFile.getStat();

    if (fileStat.isDirectory()) {
      traverseDirectory(newFile.getPath());
    } else {
      await newFile.moveFile();
    }
  });
};

if (!areEnvironmentVariablesAvailable) {
  errorMessage('Envrionment variables are not set.');
} else {
  successMessage('Traversing files...');
  traverseDirectory(ROOT_DIRECTORY);
}
