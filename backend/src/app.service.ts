// Nest JS
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';

// DTO
import { VerifyRequestDto, VerifyResponseDto } from './types/dto/verify';

// Utilities
import { sh } from './utilities';
@Injectable()
export class AppService {
  async verify(verifyDto: VerifyRequestDto): Promise<VerifyResponseDto> {
    const testingDirectory = '/var/tmp/testing';

    const {
      language,
      dockerImageName,
      dockerMountingDirectoryName,
      solutionFileName,
      solutionCode,
      testFileName,
      testCode,
    } = verifyDto;

    try {
      await Promise.all([
        sh(`docker pull ${dockerImageName}`),
        sh(`mkdir ${testingDirectory}`),
      ]);

      await sh(
        `echo "${solutionCode}" > ${testingDirectory}/${solutionFileName} && \ 
        echo "${testCode}" > ${testingDirectory}/${testFileName}`,
      );

      const { stdout: output } = await sh(
        `docker run --name testing-${language} -v \
        ${testingDirectory}:\`docker image inspect -f '{{.Config.WorkingDir}}' ${dockerImageName}\`/${dockerMountingDirectoryName} \
        ${dockerImageName}:latest 2>&1 | tee ${testingDirectory}/output`,
      );

      const exitStatus = await sh(
        'docker container inspect --format "{{.State.ExitCode}}" $(docker container ls -lq)',
      ).then(({ stdout }) => +stdout.slice(0, stdout.indexOf('\n')));

      await sh(`docker rm testing-${language}`);

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
      await sh(`sudo -i rm -rf ${testingDirectory}`);
    }
  }
}
