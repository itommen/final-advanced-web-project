import Post from './post.model';
import _ from 'lodash';
import empty from 'http-reject-empty';

export function index({ query: { term, filter } }) {
  const query = term && filter ? {
    [filter]: new RegExp(term)
  } : {};

  return Post.find(query);
}

export function get({ params: { id } }) {
  return Post.findById(id)
    .then(empty);
}

export function create(io) {
  return ({ body }, res) => Post.create(body)
    .then(() => {
      res.status(201);

      io.emit('refresh');

      return Promise.resolve();
    });
}

export function update(io) {
  return ({ body, params: { id } }) => Post.findById(id)
    .then(empty)
    .then(post => {
      post.author = body.author;
      post.content = body.content;
      post.title = body.title;

      return post.save();
    })
    .then(() => {
      io.emit('refresh');
    })
    .then(_.noop);
}

export function destroy({ params: { id } }) {
  return Post.findById(id)
    .then(empty)
    .then(post => post.remove())
    .then(_.noop);
}
