import Post from './post.model';
import _ from 'lodash';
import empty from 'http-reject-empty';

export function index ({query: {term, filter}}) {
  const query = {};

  if (term) {
    query.term = term;
  }

  if (filter) {
    query.filter = filter;
  }

  return Post.find({});
}

export function get ({params: {id}}) {
  return Post.findById(id)
        .then(empty);
}

export function create ({body}, res) {
  return Post.create(body)
        .then(user => {
          res.status(201);

          return user;
        });
}

export function update ({body, params: {id}}) {
  return Post.findById(id)
        .then(empty)
        .then(post => {
          post.author = body.author;
          post.content = body.content;
          post.title = body.title;

          return post.save();
        })
        .then(_.noop);
}

export function destroy ({params: {id}}) {
  return Post.findById(id)
        .then(empty)
        .then(post => {
          return post.remove();
        })
        .then(_.noop);
}
