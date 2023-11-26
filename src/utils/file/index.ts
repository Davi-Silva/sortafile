import fs from 'fs/promises';
import path from 'path';

import { DESTINATION_DIRECTORY, EDITED_FOLDER_NAME } from '@/constants';
import { DateFormatter, shouldDeleteOriginalFiles } from '@/utils';
import chalk from 'chalk';

class File {
  private filePath: string;

  constructor(directory: string, filename: string) {
    this.filePath = path.join(directory, filename);
  }

  async getStat() {
    try {
      const stat = await fs.stat(this.filePath);
      return stat;
    } catch (err) {
      throw Error(err);
    }
  }

  getPath() {
    return this.filePath;
  }

  async moveFile() {
    try {
      const readFile = await this.readFile();
      const stat = await this.getStat();

      const date = new DateFormatter(stat.mtime);
      const stringifiedDate = date.stringifyDate();
      await this.writeToFile(stringifiedDate, this.getFileName(), readFile);
    } catch (err) {
      throw Error(err);
    }
  }

  private async readFile() {
    try {
      const file = await fs.readFile(this.filePath);
      return file;
    } catch (err) {
      throw Error(err);
    }
  }

  private async writeToFile(
    destionationFolder: string,
    filename: string,
    data: any,
  ) {
    try {
      let folderDestinationArray: string[] = [];
      let fileDestinationArray: string[] = [];

      if (this.shouldCreateEditedFolder()) {
        folderDestinationArray = [
          DESTINATION_DIRECTORY,
          destionationFolder,
          EDITED_FOLDER_NAME,
        ];
        fileDestinationArray = [
          DESTINATION_DIRECTORY,
          destionationFolder,
          EDITED_FOLDER_NAME,
          filename,
        ];
      } else {
        folderDestinationArray = [DESTINATION_DIRECTORY, destionationFolder];
        fileDestinationArray = [
          DESTINATION_DIRECTORY,
          destionationFolder,
          filename,
        ];
      }

      const folderDestinationPath = this.buildPath(folderDestinationArray);
      const fileDestinationPath = this.buildPath(fileDestinationArray);

      await this.createFolder(folderDestinationPath);
      await fs.writeFile(fileDestinationPath, data);

      if (shouldDeleteOriginalFiles) {
        await fs.unlink(this.filePath);
      }

      console.log(
        `${chalk.hex('#bf1313').bold(this.getPath())} has been moved to ${chalk
          .hex('#13bf19')
          .bold(fileDestinationPath)}`,
      );
    } catch (err) {
      throw Error(err);
    }
  }

  private async createFolder(destination: string) {
    try {
      await fs.mkdir(destination, { recursive: true });
    } catch (err) {
      throw Error(err);
    }
  }

  private buildPath(pathnameArray: string[]) {
    return pathnameArray.join('/');
  }

  private getFileName() {
    return path.basename(this.filePath);
  }

  private getFileExtension() {
    const filename = this.getFileName();
    const filenameArray = filename.split('.');
    return filenameArray[filenameArray.length - 1];
  }

  private shouldCreateEditedFolder() {
    const ext = this.getFileExtension();

    switch (ext) {
      case 'png':
      case 'jpeg':
      case 'jpg':
        return true;
      default:
        return false;
    }
  }
}

export default File;
