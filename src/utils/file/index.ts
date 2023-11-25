import chalk from 'chalk';
import fs from 'fs/promises';
import path from 'path';

import { DESTINATION_DIRECTORY } from '@/constants';
import { DateFormatter, shouldDeleteOriginalFiles } from '@/utils';

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

  getFileName() {
    return path.basename(this.filePath);
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
      await fs.writeFile(fileDestination, data);

      if (shouldDeleteOriginalFiles) {
        await fs.unlink(this.filePath);
      }

      console.log(
        `${chalk.hex('#bf1313').bold(this.getPath())} has been moved to ${chalk
          .hex('#13bf19')
          .bold(fileDestination)}`,
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
}

export default File;
