import { Post, PostModel, User } from '../../src';
import { toJSON } from '../support/utils';

export function getMockPost(
  title = 'Post A',
  content = 'Hello there!'
): Omit<Post, '_id' | 'author' | 'createdAt'> {
  return {
    title,
    content,
  };
}

export async function insertMockPost(
  title: string,
  content: string,
  author: User
) {
  const post = new PostModel({ ...getMockPost(title, content), author });
  await post.save();
  return toJSON(post) as Post;
}

export async function insertMockPosts(author: User) {
  return await Promise.all(
    Array.from({ length: 5 }, (_, i) => {
      const title = 'Post ' + i;
      const content = `${i} is less than 5`;
      return insertMockPost(title, content, author);
    })
  );
}

export async function clearPostsCollection() {
  await PostModel.deleteMany({});
}
