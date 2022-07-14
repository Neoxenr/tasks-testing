import { Injectable } from '@nestjs/common';
import { sh } from './utilities';
import { readFile } from 'fs/promises';
import { VerifyDto } from './app.controller';

@Injectable()
export class AppService {
  async verify(verifyDto: VerifyDto): Promise<boolean> {
    try {
      // git clone
      // docker pull
      // docker run
      // return result
      // free resources

      await sh(
        `git clone ${verifyDto.repository} -b ${verifyDto.branch} /var/tmp/code-example/`,
      );
      // https://gitlab.com/graduate-work2/code-example.git
      await sh('docker pull neoxenr/typescript-testing');

      await sh(
        'docker run --rm --name testing -v /var/tmp/code-example:/app/task/ neoxenr/typescript-testing:latest npm run test',
      );

      const isPassed: boolean = await readFile(
        '/var/tmp/code-example/output.json',
      )
        .then((response: any) => JSON.parse(response))
        .then((json: any) => json.success);

      return isPassed;
    } catch (err: any) {
      console.error(err);

      return false;
    }
    // finally {
    //   await sh('rm -rf /var/tmp/code-example');
    // }
  }
}
