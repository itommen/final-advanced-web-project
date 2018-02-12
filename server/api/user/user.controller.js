import User from './user.model';
import empty from 'http-reject-empty';

export function index () {
  return User.find({});
}

export function get ({params: {id}}) {
  return User.findById(id)
        .then(empty);
}

export function destroy () {
  return null;
}

export function update () {
  return null;
}

export function create () {
  return null;
}