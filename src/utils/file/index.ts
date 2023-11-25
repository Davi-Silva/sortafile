import fs from 'fs/promises';
import path from 'path';

import { DESTINATION_DIRECTORY } from '@/constants';
import { DateFormatter } from '@/utils';

class File {
  private filePath: string;

  constructor(directory: string, filename: string) {
    this.filePath = path.join(directory, filename);
  }

  async getStat() {
    const stat = await fs.stat(this.filePath);
    return stat;
  }

  getPath() {
    return this.filePath;
  }

  getFileName() {
    return path.basename(this.filePath);
  }

  async moveFile() {
    try {
      const readFile = await this.readFile();
      const stat = await this.getStat();

      const date = new DateFormatter(stat.mtime);
      const stringifiedDate = date.stringifyDate();
      // console.log(readFile);
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
      throw Error('Unable to read file');
    }
  }

  private async writeToFile(
    destionationFolder: string,
    filename: string,
    data: any,
  ) {
    try {
      const folderDestination = this.buildPath([
        DESTINATION_DIRECTORY,
        destionationFolder,
      ]);
      const fileDestination = this.buildPath([
        DESTINATION_DIRECTORY,
        destionationFolder,
        filename,
      ]);

      await this.createFolder(folderDestination);
      const written = await fs.writeFile(fileDestination, data);
      console.log({ written });

      // if (shouldDeleteOriginalFiles) {
      //   await fs.unlink(this.filePath);
      // }
    } catch (err) {
      throw Error(err);
    }
  }

  private async createFolder(destination: string) {
    await fs.mkdir(destination, { recursive: true });
  }

  private buildPath(pathnameArray: string[]) {
    return pathnameArray.join('/');
  }
}

export default File;
