import express from 'express';
import mongoose from 'mongoose';
import request from 'request';
import logging from '../../lib/logging';
import {
  fromMongo,
} from '../../lib/dbConnector';
import {
  Project,
} from '../../models';
import auth from '../../auth';
import config from '../../config';

const router = express.Router();
const NAME = ['Project', '프로젝트', 'プロジェクト'];

router.post(
  '/',
  async (req, res) => {
    const PROCESS = '저장';
    try {
      const { id, ...rest } = req.body;
      const found = await Project.findById(id);
      let result;
      if (found) {
        result = await Project.updateOne({
          _id: id,
        }, {
          $set: rest,
        });
      } else {
        result = await new Project(rest)
          .save();
      }
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
      const { id, ...rest } = req.body;
      const result = await Project.updateOne({ _id: mongoose.Types.ObjectId(id) }, { $set: {...rest} });
      res.json(result);
    } catch (error) {
      logging.error(error);
      res.status(500).json({ message: `${NAME[1]} ${PROCESS}` });
    }
  },
);
//
router.post(
  '/list',
  async (req, res) => {
    const ERROR_MESSAGE = 'ERROR';
    try {
      const { accountId } = req.body;
      const projects = await Project.find({
        accountId: mongoose.Types.ObjectId(accountId),
        order_status: 0,
      });
      res.json(fromMongo(projects.map(o => o.toObject())));
    } catch (error) {
      logging.error(error);
      return res.status(400).json({
        message: ERROR_MESSAGE,
      });
    }
  },
);
router.put(
  '/order',
  async (req, res) => {
    const ERROR_MESSAGE = 'ERROR';
    try {
      const projectIds = req.body;
      const projects = await Project.find({
        _id: { $in: projectIds.map(mongoose.Types.ObjectId) },
        order_status: 0,
      });
      const body = [];
      projects.forEach(project => {
        body.push({
          userId: String(project.accountId),
          projectId: project.projectId,
          token: project.templateToken,
          orderInfo: {
            order_count: project.quantity,
            total_price: project.quantity * project.price,
          },
        });
      });
      const api = config.get('RED_API_URL');
      const token = config.get('RED_API_TOKEN');
      request.post(`${api}/v1/orders`, {
        json: true,
        body: body,
        auth: {
          'bearer': token,
        },
      }, (err, resp, body) => {
        console.log(body);
        res.json(fromMongo(projects.map(o => o.toObject())));
      });
      await Project.updateMany({
        _id: { $in: projects.map(o => o._id) },
      }, {
        $set: {
          order_status: 1,
          order_datetime: Date.now(),
        },
      });
    } catch (error) {
      logging.error(error);
      return res.status(400).json({
        message: ERROR_MESSAGE,
      });
    }
  },
);
router.post(
  '/orderedList',
  async (req, res) => {
    const ERROR_MESSAGE = 'ERROR';
    try {
      const { accountId, franchiseeId } = req.body;
      const accArr = [mongoose.Types.ObjectId(accountId)];
      if (franchiseeId) {
        accArr.push(mongoose.Types.ObjectId(franchiseeId))
      }
      const projects = await Project.find({
        accountId: { $in: accArr },
        order_status: { $in: [1, 2] }
      });
      res.json(fromMongo(projects.map(o => o.toObject())));
    } catch (error) {
      logging.error(error);
      return res.status(400).json({
        message: ERROR_MESSAGE,
      });
    }
  },
);
router.get(
  '/list',
  async (req, res) => {
    const ERROR_MESSAGE = 'ERROR';
    try {
      const projects = await Project.find({})
        .sort({ _id: -1 })
        .populate('rootId');

      res.json(fromMongo(projects.map(o => o.toObject()).map(o => o.rootId ? {
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
router.get(
  '/:id',
  async (req, res) => {
    const ERROR_MESSAGE = 'ERROR';
    try {
      res.json(fromMongo((await Project.findById(req.params.id)).toObject()));
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
    const list = await Project.find(query)
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
      await Project.updateOne(
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
      await Project.deleteMany(
        {
          _id: { $in: req.body },
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
