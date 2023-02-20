// System
import { exec } from 'child_process';

// Types
import { ShellResult } from '../types/utilities';

export async function sh(cmd: string): Promise<ShellResult> {
  return new Promise(function (resolve, reject) {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
}
