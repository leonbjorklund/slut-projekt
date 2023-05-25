import busboy from "busboy";
import { Request, Response } from "express";
import mongoose from "mongoose";
import sharp from "sharp";
import { fileBucket } from "../models/file-model";

export async function getFileById(req: Request, res: Response) {
  const _id = new mongoose.mongo.ObjectId(req.params.id);

  const file = await fileBucket.find({ _id }).next();
  if (!file?.contentType) {
    return res.status(404).json("File not found");
  }

  res.setHeader("Content-Type", file.contentType);
  // res.setHeader('Content-Disposition', `attachment; filename=${file.filename}`);

  const downloadStream = fileBucket.openDownloadStream(_id);
  downloadStream.pipe(res);
}

export async function uploadFile(req: Request, res: Response) {
  const bb = busboy({ headers: req.headers });
  req.pipe(bb);

  bb.on("file", (_, file, info) => {
    const { filename, mimeType } = info;

    const uploadStream = fileBucket
      .openUploadStream(filename, { contentType: mimeType })
      .on("finish", (data: mongoose.mongo.GridFSFile) => {
        res.status(201).json(data._id);
      });

    const resizer = sharp().resize(1080).jpeg({ quality: 90 });

    file.pipe(resizer).pipe(uploadStream);
  });
}

export async function deleteFileById(req: Request, res: Response) {
  const _id = new mongoose.mongo.ObjectId(req.params.id);

  const file = await fileBucket.find({ _id }).next();
  if (!file) {
    return res.status(404).json("File not found");
  }

  await fileBucket.delete(_id);
  res.status(204).json();
}
