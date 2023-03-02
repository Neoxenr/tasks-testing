// Nest JS
import { Injectable } from '@nestjs/common';

// DTO
import { VerifyRequestDto, VerifyResponseDto } from './types/dto/verify';

// Utilities
import { sh } from './utilities';
@Injectable()
export class AppService {
  async verify(verifyDto: VerifyRequestDto): Promise<VerifyResponseDto> {
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

      const { stdout: output } = await sh(
        `docker run --name testing-${verifyDto.language} -v ${testingDirectory}:/app/task \
        ${verifyDto.dockerImageName}:latest 2>&1 | tee \`pwd\`/output`,
      );

      const exitStatus = await sh(
        'docker container inspect --format "{{.State.ExitCode}}" $(docker container ls -lq)',
      ).then(({ stdout }) => +stdout.slice(0, stdout.indexOf('\n')));

      await sh(`docker rm testing-${verifyDto.language}`);

      let result = '';

      if (exitStatus === 0) {
        result = 'passed';
      } else if (exitStatus === 124) {
        result = 'failed-infinity';
      } else {
        result = 'failed';
      }

      const passed = result === 'passed';

      return {
        passed,
        output,
        result,
        status: exitStatus,
      };
    } catch (err: any) {
      return { passed: false, output: '', result: 'failed', status: 1 };
    } finally {
      await sh(`rm -rf ${testingDirectory}`);
    }
  }
}
