import express from 'express';

const { changeContent, loadContent, update } = require("../Controllers/page.controller");


const contentRoute = express.Router();
contentRoute.post('/:pageId/content', changeContent);
contentRoute.get('/:pageId/content', loadContent);
contentRoute.put('/:pageId', update);

export default contentRoute;