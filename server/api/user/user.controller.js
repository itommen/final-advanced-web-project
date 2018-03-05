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

export function update() {
  return null;
}

// export function create({ body }, res) {
//   console.log('HERE1');

// }

export function create({ body }, res) {
  return User.create(body)
    .then(() => {
      res.status(201);

      return Promise.resolve();
    });
}