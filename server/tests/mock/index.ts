import { Post, User } from '../../src';
import { clearPostsCollection, insertMockPosts } from './posts';
import { clearUsersCollection, insertMockAdmin, insertMockUser } from './users';

export type MockDB = {
  user: User;
  admin: User;
  posts: Post[];
};

/** Resets the database and returns the inserted users and posts */
export async function mockDB(): Promise<MockDB> {
  await clearUsersCollection();
  await clearPostsCollection();

  const user = await insertMockUser();
  const admin = await insertMockAdmin();
  const posts = [
    ...(await insertMockPosts(user)),
    ...(await insertMockPosts(admin)),
  ];

  return { user, admin, posts };
}
