import express from 'express';
import logging from '../../lib/logging';
import {
  fromMongo,
} from '../../lib/dbConnector';
import {
  Account,
} from '../../models';
import auth from '../../auth';

const router = express.Router();
const NAME = '계정';

// 회원가입
router.post(
  '/',
  async (req, res) => {
    const PROCESS = '회원 가입';
    try {
      const {
        email,
        password,
      } = req.body;
      const account = await new Account({
        email,
        password,
      }).save();
      const result = fromMongo(account.toObject());
      delete result.password;
      res.json(result);
    } catch (error) {
      logging.error(error);
      res.status(500).json({ message: `${NAME} ${PROCESS} 에러` });
    }
  },
);
// 로그인
router.post(
  '/login',
  async (req, res) => {
    const PROCESS = '로그인';
    const { email, password } = req.body;
    try {
      const account = await Account.findOne({
        email,
      }).exec();
      if (!account) {
        return res.status(400).json({
          message: `${NAME} ${PROCESS} 에러 : 입력된 계정이 없습니다.`,
        });
      }
      const valid = await account.passwordIsValid(password);
      if (!valid) {
        return res.status(400).json({
          message: `${NAME} ${PROCESS} 에러 : 비밀번호 입력이 잘못되었습니다.`,
        });
      }
      const result = fromMongo(account.toObject());
      delete result.password;
      return res.json(result);
    } catch (error) {
      logging.error(error);
      return res.status(400).json({
        message: `${NAME} ${PROCESS} 에러`,
      });
    }
  },
);
// 인증
router.get(
  '/',
  auth,
  async (req, res) => res.json(req.user),
);
// appList 업데이트
router.put(
  '/applist',
  auth,
  async (req, res) => {
    const PROCESS = '앱 리스트 업데이트';
    try {
      await Account.updateOne(
        { _id: req.user.id },
        { $set: { appList: req.body } }
      );
      res.json({ success: true });
    } catch (error) {
      logging.error(error);
      res.status(400).json({
        message: `${NAME} ${PROCESS} 에러`,
      });
    }
  },
);
// 삭제
router.delete(
  '/',
  auth,
  async (req, res) => {
    const PROCESS = '삭제';
    try {
      await Account.deleteOne(
        { _id: req.user.id },
      );
      res.json({ success: true });
    } catch (error) {
      logging.error(error);
      res.status(400).json({
        message: `${NAME} ${PROCESS} 에러`,
      });
    }
  },
);
export default router;
