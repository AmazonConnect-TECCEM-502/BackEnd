import { Request, Response } from "express";
import AbstractController from "./AbstractController";
import * as AWS from "aws-sdk";
import {
  AWS_S3_ACCESS_KEY_ID,
  AWS_S3_SECRET_ACCESS_KEY,
  AWS_REGION,
  AWS_S3_BUCKET,
} from "../config";
import { isUndefined } from "util";

class CallController extends AbstractController {
  private static instance: CallController;
  public static getInstance(): AbstractController {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new CallController("call");
    return this.instance;
  }

  protected initRoutes(): void {
    this.router.get("/getCalls", this.getVideos.bind(this));
    this.router.post("/uploadCall", this.postUploadVideo.bind(this));
  }

  private async getVideos(req: Request, res: Response) {
    try {
      AWS.config.update({
        accessKeyId: AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: AWS_S3_SECRET_ACCESS_KEY,
        region: AWS_REGION,
      });

      const { fileName, file } = req.body;

      const params = {
        Bucket: AWS_S3_BUCKET,
        Key: fileName,
        Body: file,
      };

      const s3 = new AWS.S3();

      s3.listObjects(params, function (err, data) {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.status(200).send(data.Contents);
        }
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  private async postUploadVideo(req: Request, res: Response) {
    try {
      AWS.config.update({
        accessKeyId: AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: AWS_S3_SECRET_ACCESS_KEY,
        region: AWS_REGION,
      });

      const fileName = req.body.fileName;
      const blob = req.body.blob;

      const params = {
        Bucket: AWS_S3_BUCKET,
        Key: fileName,
        Body: blob,
      };

      const s3 = new AWS.S3();

      s3.putObject(params, function (err: any, data: any) {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.status(201).json({ message: data });
        }
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default CallController;
