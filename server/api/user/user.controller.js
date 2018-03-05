import User from './user.model';
import empty from 'http-reject-empty';

export function index() {
  return User.find({});
}

export function get({ params: { id } }) {
  return User.findById(id)
    .then(empty);
}

export function destroy() {
  return null;
}

export function login({ body }, res) {
  return User.find(body)
    .then(result => {
      if (result.length !== 1) {
        return Promise.reject();
      }

      res.status(201);

      return result[0];
    });
}

export function create({ body }, res) {
  return User.create(body)
    .then(() => {
      res.status(201);

      return Promise.resolve();
    });
}