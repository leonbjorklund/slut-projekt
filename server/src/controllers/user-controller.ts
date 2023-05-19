import { Request, Response } from 'express';

export async function createUser(req: Request, res: Response) {
  res.send('createUser');
}

export async function getAllUsers(req: Request, res: Response) {
  res.send('getAllUsers');
}

export async function getUserById(req: Request, res: Response) {
  res.send('getUserById');
}

export async function updateUser(req: Request, res: Response) {
  res.send('updateUser');
}
