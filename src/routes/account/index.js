import express from 'express';
import mongoose from 'mongoose';
import logging from '../../lib/logging';
import {
  fromMongo,
} from '../../lib/dbConnector';
import {
  Account,
} from '../../models';
import auth from '../../auth';

const router = express.Router();
const NAME = ['Account', '계정', 'アカウント'];

(async () => {
  if ((await Account.find({})).length < 1) {
    await new Account({
      userId: '00000000',
      password: '00000000',
      name: '',
      email: '',
      phone: '',
      isInitial: true,
    }).save();
    logging.info('[DEFAULT ACCOUNT]', 'userId: 00000000, password: 00000000');
  }
})();

// 회원가입
router.post(
  '/',
  async (req, res) => {
    const PROCESS = '회원 가입';
    try {
      const account = await new Account(req.body).save();
      const result = fromMongo(account.toObject());
      res.json(result);
    } catch (error) {
      logging.error(error);
      res.status(500).json({ message: `${NAME[1]} ${PROCESS}` });
    }
  },
);
// 수정
router.put(
  '/',
  async (req, res) => {
    const PROCESS = '수정';
    try {
      console.log(req.body);
      const { id, ...rest } = req.body;
      const result = await Account.updateOne({ _id: mongoose.Types.ObjectId(id) }, { $set: {...rest} });
      res.json(result);
    } catch (error) {
      logging.error(error);
      res.status(500).json({ message: `${NAME[1]} ${PROCESS}` });
    }
  },
);

// 로그인
router.post(
  '/login',
  async (req, res) => {
    const PROCESS = ['Login failed', '로그인 실패', 'ログインに失敗し'];
    const { langSelected } = res.locals;
    const ERROR_MESSAGE = `ERROR: ${NAME[langSelected]} ${PROCESS[langSelected]}`;
    const { userId, password } = req.body;
    try {
      const account = await Account.findOne({
        userId,
      }).exec();
      if (!account) {
        return res.status(400).json({
          message: ERROR_MESSAGE,
        });
      }
      const valid = await account.passwordIsValid(password);
      if (!valid) {
        return res.status(400).json({
          message: ERROR_MESSAGE,
        });
      }
      const result = fromMongo(account.toObject());
      // delete result.password;
      return res.json(result);
    } catch (error) {
      logging.error(error);
      return res.status(400).json({
        message: ERROR_MESSAGE,
      });
    }
  },
);
//
router.post(
  '/franchiseeLogin',
  async (req, res) => {
    const PROCESS = ['Login failed', '로그인 실패', 'ログインに失敗し'];
    const { langSelected } = res.locals;
    const ERROR_MESSAGE = `ERROR: ${NAME[langSelected]} ${PROCESS[langSelected]}`;
    const { id, franchiseeId } = req.body;
    try {
      const franchiseeAccount = await Account.findById(franchiseeId);
      if (!id || String(franchiseeAccount.rootId) === id) {
        res.json(fromMongo(franchiseeAccount.toObject()));
      } else {
        res.status(400).json({
          message: ERROR_MESSAGE,
        });
      }
    } catch (error) {
      logging.error(error);
      res.status(400).json({
        message: ERROR_MESSAGE,
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
router.get(
  '/list',
  async (req, res) => {
    const ERROR_MESSAGE = 'ERROR';
    try {
      const accounts = await Account.find({})
        .sort({ _id: -1 })
        .populate('rootId');

      res.json(fromMongo(accounts.map(o => o.toObject()).map(o => o.rootId ? {
        ...o,
        root: o.rootId,
        rootId: o.rootId._id,
      } : o)));
    } catch (error) {
      logging.error(error);
      return res.status(400).json({
        message: ERROR_MESSAGE,
      });
    }
  },
);
router.post(
  '/franchiseeList',
  async (req, res) => {
    const query = {
      type: 'franchisee',
    };
    if (req.body.id) query.rootId = mongoose.Types.ObjectId(req.body.id);
    const list = await Account.find(query)
      .sort({ _id: -1 })
      .populate('rootId');
    res.json(fromMongo(list.map(o => o.toObject()).map(o => o.rootId ? {
      ...o,
      root: o.rootId,
      rootId: o.rootId._id,
    } : o)));
  },
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
  async (req, res) => {
    const PROCESS = '삭제';
    try {
      await Account.deleteMany(
        {
          _id: { $in: req.body },
          isInitial: { $not: { $eq: true } },
        },
      );
      res.json({ success: true });
    } catch (error) {
      logging.error(error);
      res.status(400).json({
        message: `${NAME[0]} ${PROCESS} 에러`,
      });
    }
  },
);
export default router;
