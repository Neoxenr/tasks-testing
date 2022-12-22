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
            `echo "${verifyDto.solutionCode}" > ${testingDirectory}/index.js && \ 
            echo "${verifyDto.testCode}" > ${testingDirectory}/test.js`,
          );
      }

      let output = '';

      await sh(
        `docker run --name testing-${verifyDto.language} -v ${testingDirectory}:/app/task \
        ${verifyDto.dockerImageName}:latest npm test 2>&1 | tee ${testingDirectory}/output`,
      ).then(({ stdout }) => (output = stdout));

      const exitStatus = await sh(
        'docker container inspect --format "{{.State.ExitCode}}" $(docker container ls -lq)',
      ).then(({ stdout }) => stdout.slice(0, stdout.indexOf('\n')));

      await sh(`docker rm testing-${verifyDto.language}`);

      let result = '';

      if (exitStatus === '0') {
        result = 'passed';
      } else if (exitStatus === '124') {
        result = 'failed-infinity';
      } else {
        result = 'failed';
      }

      const passed = result === 'passed';

      // сохрани в бд

      return {
        passed: passed,
        output: output,
        result: result,
        status: exitStatus,
      };
    } catch (err: any) {
      return { passed: false, output: '', result: 'failed', status: 1 };
    } finally {
      await sh(`rm -rf ${testingDirectory}`);
    }
  }
}
