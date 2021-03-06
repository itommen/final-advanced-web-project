import Post from './post.model';
import User from '../user/user.model';
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

export function getRecomendedPost({ params: { id } }) {
  return User.findById(id)
    .then(user => Post.find({})
      .then(result => {
        const userPosts = result.filter(x => x.author === user.userName);
        const notUserPosts = result.filter(x => x.author !== user.userName);

        const difficulties = userPosts.map(({ difficulty }) => difficulty);
        const avg = Math.round(difficulties.reduce((a, b) => a + b) / difficulties.length);

        const rec = notUserPosts.find(x => x.difficulty === avg);

        return rec ? Promise.resolve(rec)
          : Promise.reject();
      }));
}

export function getByUsername() {
  return Post.aggregate([
    {
      $group: {
        _id: '$author',
        count: { $sum: 1 }
      }
    }
  ]);
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
      post.difficulty = body.difficulty;

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
