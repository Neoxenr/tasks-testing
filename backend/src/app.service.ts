import { sh } from './utilities';
import { readFile } from 'fs/promises';
import { VerifyDto } from './app.controller';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async verify(verifyDto: VerifyDto): Promise<any> {
    try {
      await sh('rm -rf /var/tmp/code-example');

      await sh(
        `git clone ${verifyDto.repository} -b ${verifyDto.branch} /var/tmp/code-example/`,
      );

      await sh('docker pull neoxenr/typescript-testing');

      await sh(
        'docker run --rm --name testing -v /var/tmp/code-example:/app/task/ neoxenr/typescript-testing:latest npm run test',
      );

      const result: any = await readFile(
        '/var/tmp/code-example/output.json',
      ).then((response: any) => JSON.parse(response));

      return result;
    } catch (err: any) {
      console.error(err);

      return {};
    }
  }
}
