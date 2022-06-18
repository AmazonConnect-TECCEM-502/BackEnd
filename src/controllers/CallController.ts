import { Request, Response } from "express";
import AbstractController from "./AbstractController";
import db from "../models";
import { Op, where, fn, col } from "sequelize";

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
    // returns all the calls stored in the database which have a processed date, a client_id and an agent_id
    this.router.get("/getCalls", this.getVideos.bind(this));

    // returns the calls with the desired filters
    this.router.post("/getCalls", this.postFilterVideos.bind(this));

    // creates a Call record in the database with the call_id, video_url, client_id, agent_id and created date
    this.router.post(
      "/postVideoBD",
      this.authMiddleware.verifyToken,
      this.postVideo.bind(this)
    );

    // this method is called after a Call is done processing and it updates
    // all the processed date of the Call
    this.router.post("/updateCall", this.updateCall.bind(this));

    // this method is called after a Call has generated it's transcription and it
    // updates the transcription_url field
    this.router.post(
      "/updateCallTranscriptionRating",
      this.updateCallTranscriptionRating.bind(this)
    );

    // this method is called after the Call has been successfully subtitled and
    // it updates the duration of the Call
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
        attributes: ["video_url", "duration", "rating", "created"],
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

  private async postFilterVideos(req: Request, res: Response) {
    try {
      var callFilters: any = {}; // This variable stores all the filters which can be sent in th body
      var conditionsWithDate: any = [];
      var hasDate = false;

      // In this section of the code we check which filters were sent through the request's body
      // and we add them to the callFilters object
      if (req.body.day) {
        hasDate = true;
        conditionsWithDate.push(where(fn("DAY", col("created")), req.body.day));
      }

      if (req.body.month) {
        hasDate = true;
        conditionsWithDate.push(
          where(fn("MONTH", col("created")), req.body.month)
        );
      }

      if (req.body.year) {
        hasDate = true;
        conditionsWithDate.push(
          where(fn("YEAR", col("created")), req.body.year)
        );
      }

      if (req.body.agents) {
        callFilters["agent_id"] = req.body.agents;
      }

      if (req.body.clients) {
        callFilters["client_id"] = req.body.clients;
      }

      if (req.body.ratings) {
        callFilters["rating"] = req.body.ratings;
      }

      callFilters["processed"] = { [Op.not]: null };

      // Check if the user is sending categories filters and add them to the object
      if (req.body.categories) {
        var categoriesFilter: any = {};
        categoriesFilter["category_id"] = req.body.categories;

        // Check if date filters were sent in the request
        if (hasDate) {
          conditionsWithDate.push(callFilters);
          const calls = await db["Call"].findAll({
            where: {
              [Op.and]: conditionsWithDate,
            },
            attributes: ["video_url", "duration", "rating", "created"],
            include: [
              {
                model: db["User"],
                attributes: ["first_name", "last_name"],
                where: {
                  user_id: { [Op.not]: null },
                },
              },
              {
                model: db["Client"],
                attributes: ["first_name", "last_name"],
                where: {
                  client_id: { [Op.not]: null },
                },
              },
              {
                model: db["Problem_category"],
                attributes: ["category_id", "category_name"],
                where: categoriesFilter,
              },
            ],
          });

          res.status(200).json(calls);
        } else {
          const calls = await db["Call"].findAll({
            where: callFilters,
            attributes: ["video_url", "duration", "rating", "created"],
            include: [
              {
                model: db["User"],
                attributes: ["first_name", "last_name"],
                where: {
                  user_id: { [Op.not]: null },
                },
              },
              {
                model: db["Client"],
                attributes: ["first_name", "last_name"],
                where: {
                  client_id: { [Op.not]: null },
                },
              },
              {
                model: db["Problem_category"],
                attributes: ["category_id", "category_name"],
                where: categoriesFilter,
              },
            ],
          });

          res.status(200).json(calls);
        }
      } else {
        // If the user did not send categories but sent date
        if (hasDate) {
          conditionsWithDate.push(callFilters);
          const calls = await db["Call"].findAll({
            where: {
              [Op.and]: conditionsWithDate,
            },
            attributes: ["video_url", "duration", "rating", "created"],
            include: [
              {
                model: db["User"],
                attributes: ["first_name", "last_name"],
                where: {
                  user_id: { [Op.not]: null },
                },
              },
              {
                model: db["Client"],
                attributes: ["first_name", "last_name"],
                where: {
                  client_id: { [Op.not]: null },
                },
              },
              {
                model: db["Problem_category"],
                attributes: ["category_id", "category_name"],
                where: categoriesFilter,
              },
            ],
          });

          res.status(200).json(calls);
        } else {
          const calls = await db["Call"].findAll({
            where: callFilters,
            attributes: ["video_url", "duration", "rating", "created"],
            include: [
              {
                model: db["User"],
                attributes: ["first_name", "last_name"],
                where: {
                  user_id: { [Op.not]: null },
                },
              },
              {
                model: db["Client"],
                attributes: ["first_name", "last_name"],
                where: {
                  client_id: { [Op.not]: null },
                },
              },
              {
                model: db["Problem_category"],
                attributes: ["category_id", "category_name"],
              },
            ],
          });

          res.status(200).json(calls);
        }
      }
    } catch (err: any) {
      res.status(500).json({ error: err });
    }
  }

  // Post  One Video Link with name
  private async postVideo(req: Request, res: Response) {
    try {
      // Sequilize  with bd to send  the data with query
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

  private async updateCall(req: Request, res: Response) {
    const url = req.body.url;
    const date = new Date();
    // Obtain the current date and pass it to the format YYYY-MM-DD HH:MM:SS
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
