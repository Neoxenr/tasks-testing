import { sh } from './utilities';
import { Injectable } from '@nestjs/common';
import { VerifyDto } from './dto/verify.dto';

@Injectable()
export class AppService {
  async verify(
    userId: string,
    taskId: string,
    verifyDto: VerifyDto,
  ): Promise<any> {
    const testingDirectory = '/var/tmp/testing';

    try {
      await sh(`docker pull ${verifyDto.dockerImageName}`);

      await sh(`mkdir ${testingDirectory}`);

      switch (verifyDto.language) {
        case 'JS':
          await sh(
            `echo "${verifyDto.solutionCode}" > ${testingDirectory}/index.js && echo ${testingDirectory}/"${verifyDto.testCode}" > test.js`,
          );
      }

      // команда для запуска тестов (аргументы) npm test
      // $? и stdout/stderr
      await sh(
        `docker run --rm -v ${testingDirectory}:/app/task ${verifyDto.dockerImageName}:latest`,
      );

      const result = await sh('echo $?').then(({ stdout }) =>
        stdout.slice(0, stdout.indexOf('\n')),
      );

      return { success: result === '0' ? true : false };
    } catch (err: any) {
      return { success: false };
    } finally {
      await sh(`rm -rf ${testingDirectory}`);
    }
  }
}
