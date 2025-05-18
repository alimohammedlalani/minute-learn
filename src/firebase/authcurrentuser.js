import { auth } from './firebase/auth';

const currentUser = auth.currentUser;
if (currentUser) {
  console.log('User is logged in:', currentUser.email);
} else {
  console.log('No user is logged in');
}