import test from 'ava';
import supertest from 'supertest';
import mongoose from 'mongoose';
import {
  Account
} from '../../models';
import {
  hasProperty,
  isSameId,
} from '../../lib/somethings';

/*
로그인
auth
회원가입
회원삭제
앱 업데이트
레벨
 */

export default function (app, url) {
  const NAME = 'Account';
  const USER = {
    email: '_TEST@naver.com',
    password: '_TEST_TEST',
  };
  const APPLIST = [
    {
      app: mongoose.Types.ObjectId(),
      number: 0,
    },
    {
      app: mongoose.Types.ObjectId(),
      number: 1,
    },
  ];
  test.serial(`create ${NAME}`, async (t) => {
    const res = await supertest(app)
      .post(url)
      .send(USER);
    t.is(res.status, 200);
  });
  test.serial(`login ${NAME}`, async (t) => {
    const res = await supertest(app)
      .post(`${url}/login`)
      .send(USER);
    t.is(res.status, 200);
    const { body } = res;
    t.truthy(body.id);
    USER.id = body.id;
  });
  test.serial(`auth ${NAME}`, async (t) => {
    const res = await supertest(app)
      .get(url)
      .set('Authorization', `Bearer ${USER.id}`);
    t.is(res.status, 200);
    const { body } = res;
    t.truthy(body);
  });
  test.serial(`auth fail ${NAME}`, async (t) => {
    const res = await supertest(app)
      .get(url)
      .set('Authorization', `Bearer 1234`);
    t.not(res.status, 200);
  });
  test.serial(`change appList ${NAME}`, async (t) => {
    const res = await supertest(app)
      .put(`${url}/applist`)
      .set('Authorization', `Bearer ${USER.id}`)
      .send(APPLIST);
    t.is(res.status, 200);
  });
  test.serial(`remove ${NAME}`, async (t) => {
    const res = await supertest(app)
      .del(`${url}`)
      .set('Authorization', `Bearer ${USER.id}`);
    t.is(res.status, 200);
  });
  test.after.always.cb('delete all test data', (t) => {
    Account.deleteMany({
      email: {
        $in: [
          USER.email,
        ],
      },
    }, (error) => {
      if (error) {
        console.error(error);
        t.fail();
      } else {
        t.pass();
      }
      t.end();
    });
  });
}
