import fs from 'fs';

import { ROOT_DIRECTORY } from '@/constants';
import { File, errorMessage, successMessage } from '@/utils';

const traverseDirectory = (currentPath: string) => {
  const files = fs.readdirSync(currentPath);

  files.forEach((file) => {
    const newFile = new File(currentPath, file);
    const fileStat = newFile.getStat();

    if (fileStat.isDirectory()) {
      traverseDirectory(newFile.getPath());
    } else {
      console.log('Created at:', fileStat.birthtime);
    }
  });
};

const currentDirectory = ROOT_DIRECTORY;

if (!currentDirectory) {
  errorMessage('Envrionment variable ROOT_DIRECTORY is not set.');
} else {
  successMessage('Traversing files...');
  traverseDirectory(currentDirectory);
}
