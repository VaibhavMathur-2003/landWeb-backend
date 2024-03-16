import express from 'express';
import {
  changeContent,
  create,
  update,
  deletePageRecord,
  details,
  list,
  loadContent,
} from '../Controllers/page.controller';
import verifyToken from '../Middleware/Auth';

const pageRoute = express.Router();



pageRoute.post('/', verifyToken, create);
pageRoute.delete('/:pageId', verifyToken, deletePageRecord);
pageRoute.put('/:pageId',verifyToken, update);
pageRoute.get('/:pageId',verifyToken, details);
pageRoute.get('/',verifyToken, list);

export default pageRoute;