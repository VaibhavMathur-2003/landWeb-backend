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

pageRoute.use(verifyToken)

pageRoute.post('/', create);
pageRoute.post('/:pageId/content', changeContent);

pageRoute.put('/:pageId', update);

pageRoute.delete('/:pageId', deletePageRecord);

pageRoute.get('/:pageId', details);
pageRoute.get('/', list);
pageRoute.get('/:pageId/content', loadContent);

export default pageRoute;