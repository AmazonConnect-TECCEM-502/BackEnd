import { Request, Response } from "express";
import AbstractController from "./AbstractController";
import * as AWS from "aws-sdk";
import {
  AWS_S3_ACCESS_KEY_ID,
  AWS_S3_SECRET_ACCESS_KEY,
  AWS_REGION,
  AWS_S3_BUCKET,
} from "../config";
import db from "../models";
import { Op } from "sequelize";

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
    this.router.post(
      "/postVideoBD",
      this.authMiddleware.verifyToken,
      this.postVideo.bind(this)
    );
    this.router.post("/updateCall", this.updateCall.bind(this));
    this.router.post(
      "/updateCallTranscriptionRating",
      this.updateCallTranscriptionRating.bind(this)
    );
    this.router.post("/updateCallDuration", this.updateCallDuration.bind(this));
  }

  // Get Videos
  private async getVideos(req: Request, res: Response) {
    try {
      const calls = await db[`Call`].findAll({
        where: {
          processed: {
            [Op.not]: null,
          },
          agent_id: {
            [Op.not]: null,
          },
          client_id: {
            [Op.not]: null,
          },
        },
        attributes: ["video_url", "duration", "rating"],
        include: [
          {
            model: db["User"],
            attributes: ["first_name", "last_name"],
          },
          {
            model: db["Client"],
            attributes: ["first_name", "last_name"],
          },
          {
            model: db["Problem_category"],
            attributes: ["category_id", "category_name"],
          },
        ],
      });
      res.status(200).json(calls);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  // Post  One Video Link with name
  private async postVideo(req: Request, res: Response) {
    try {
      // Sequilize  con bd para mandar  los datos con query
      const file = req.body.file;
      const agent_id = req.body.agent_id;
      const client_id = req.body.client_id;
      console.log("File: " + file);
      db["Call"]
        .create({
          duration: 10,
          video_url: file,
          transcription_url: "",
          rating: 0,
          agent_id: agent_id,
          client_id: client_id,
        })
        .then((result: any) => {
          const call_id = result.dataValues.call_id;
          res
            .status(201)
            .json({ message: "Se subio a la BD", call_id: call_id });
        })
        .catch((err: any) => res.status(500).json({ error: err.message }));
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  // Upload Video
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

  private async updateCall(req: Request, res: Response) {
    const url = req.body.url;
    const date = new Date();
    const iso_date = `${date.getFullYear().toString().padStart(4, "0")}-${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date
      .getSeconds()
      .toString()
      .padStart(2, "0")}`;

    const call = await db[`Call`].findOne({
      where: {
        video_url: url,
      },
    });

    if (call === null) {
      res.status(404).send();
    } else {
      call.processed = iso_date;
      call.save();
      res.status(200).send();
    }
  }

  private async updateCallTranscriptionRating(req: Request, res: Response) {
    const video_url = req.body.video_url;
    const transcription_url = req.body.transcription_url;
    const rating = req.body.rating;
    const call = await db[`Call`].findOne({
      where: {
        video_url: video_url,
      },
    });

    if (call === null) {
      res.status(404).send();
    } else {
      call.transcription_url = transcription_url;
      call.rating = rating;
      call.save();
      res.status(200).send();
    }
  }

  private async updateCallDuration(req: Request, res: Response) {
    const video_url = req.body.video_url;
    const duration = req.body.duration;

    const call = await db[`Call`].findOne({
      where: {
        video_url: video_url,
      },
    });

    if (call === null) {
      res.status(404).send();
    } else {
      call.duration = duration;
      call.save();
      res.status(200).send();
    }
  }
}

export default CallController;
