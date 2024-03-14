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
pageRoute.post('/:pageId/content', changeContent);
pageRoute.get('/:pageId/content', loadContent);
pageRoute.put('/:pageId', update);

pageRoute.use(verifyToken)

pageRoute.post('/', create);


pageRoute.delete('/:pageId', deletePageRecord);

pageRoute.get('/:pageId', details);
pageRoute.get('/', list);

export default pageRoute;