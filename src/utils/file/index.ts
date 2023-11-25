import fs from 'fs';
import path from 'path';

class File {
  private filePath: string;

  constructor(directory: string, filename: string) {
    this.filePath = path.join(directory, filename);
  }

  getStat() {
    return fs.statSync(this.filePath);
  }

  getPath() {
    return this.filePath;
  }

  moveFile(destinationPath: string) {}
}

export default File;
