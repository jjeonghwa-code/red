import nconf from 'nconf';
import path from 'path';

nconf
  // 1. CMD Arguments
  .argv()
  // 2. 환경 변수
  .env([
    'DATA_BACKEND',
    'MONGO_URL',
    'NODE_ENV',
    'PORT',
    'SECRET',
    'RED_API_URL',
    'RED_API_TOKEN',
  ])
  // 3. Config file
  .file({ file: path.join(__dirname, '../', 'config.json') })
  // 4. Defaults
  .defaults({
    PORT: 8080,
    SECRET: 'yangkiyeopsecret',
    NODE_ENV: 'development',
  });

function checkConfig(setting) {
  if (!nconf.get(setting)) {
    throw new Error(`You must set ${setting} as an environment variable or in config.json!`);
  }
}

// 필수 세팅 체크
if (nconf.get('DATA_BACKEND') === 'mongodb') {
  checkConfig('MONGO_URL');
}
checkConfig("RED_API_URL");
checkConfig("RED_API_TOKEN");

export default nconf;
