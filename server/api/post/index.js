import { AsyncRouter } from 'express-async-router';
import * as controller from './post.controller';
import objectId from 'express-param-objectid';
import paginate from 'express-paginate';

export default io => {
  const router = new AsyncRouter();

  router.param('id', objectId);

  router.use(paginate.middleware(10, 50));

  router.get('/', controller.index);
  router.get('/:id', controller.get);
  router.post('/', controller.create(io));
  router.put('/:id', controller.update(io));
  router.delete('/:id', controller.destroy);

  return router;
};