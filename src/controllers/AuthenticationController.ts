import { Request, Response } from "express";
import { checkSchema } from "express-validator";
import AbstractController from "./AbstractController";
import db from "../models";

class AuthenticationController extends AbstractController {
  //Singleton

  private static instance: AuthenticationController;
  public static getInstance(): AbstractController {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new AuthenticationController("auth");
    return this.instance;
  }

  protected initRoutes(): void {
    // creates a user in cognito and in our database with the specified attributes, it also
    // sends a verification code to the user's email
    this.router.post(
      "/signup",
      this.validateBody("signup"),
      this.handleErrors,
      this.signup.bind(this)
    );

    // gives the user a session token when he/she inputs his/her email and password
    this.router.post(
      "/signin",
      this.validateBody("signin"),
      this.handleErrors,
      this.signin.bind(this)
    );

    // receives the email that the user registered in the system and the verification code
    // he/she received
    this.router.post(
      "/verify",
      this.validateBody("verify"),
      this.handleErrors,
      this.verify.bind(this)
    );

    // returns all users from the database (only for testing)
    this.router.get(
      "/readUsers",
      this.handleErrors,
      this.getReadUsers.bind(this)
    );

    // verifies that the user is signed-in in the frontend
    this.router.get(
      "/verifyToken",
      this.authMiddleware.verifyToken,
      this.verifyToken.bind(this)
    );
  }

  private async signup(req: Request, res: Response) {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const user_type = req.body.user_type;
    const manager_id = req.body.manager_id;
    const password = req.body.password;

    console.log(req.body);

    try {
      // Create Cognito User
      const user = await this.cognitoService.signUpUser(email, password, [
        {
          Name: "email",
          Value: email,
        },
      ]);
      console.log("Cognito user created", user);

      //Save user in DB SQL
      await db["User"].create({
        first_name: first_name,
        last_name: last_name,
        email: email,
        user_type: user_type,
        manager_id: manager_id,
        cognito_uuid: user.UserSub,
      });
      console.log("User created in RDS");
      res.status(201).send({ message: "User signed up" });
    } catch (error: any) {
      res.status(500).send({ code: error.code, message: error.message });
    }
  }

  private async verify(req: Request, res: Response) {
    const { email, code } = req.body;
    try {
      await this.cognitoService.verifyUser(email, code);
      //await this.emailService.emailNotificationSingUp( email, email);
      return res.status(200).end();
    } catch (error: any) {
      //console.log('failed auth controller', error);
      res.status(500).send({ code: error.code, message: error.message }).end();
    }
  }

  private async signin(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const login = await this.cognitoService.signInUser(email, password);

      // const userDB = await UserModel.query(email).usingIndex('EmailIndex').exec().promise()
      // const userDBResult = userDB[0].Items[0].attrs;

      res.status(200).send({ ...login.AuthenticationResult });
      //.end();
    } catch (error: any) {
      res.status(500).send({ code: error.code, message: error.message });
    }
  }

  private async getReadUsers(req: Request, res: Response) {
    try {
      const users = await db["User"].findAll();
      res.status(200).send(users);
    } catch (err) {
      res.status(500).send("Error fatal:" + err);
    }
  }

  private async verifyToken(req: Request, res: Response) {
    res.status(200).send();
  }

  protected validateBody(type: "signup" | "signin" | "verify") {
    switch (type) {
      case "signup":
        return checkSchema({
          email: {
            in: "body",
            isEmail: {
              errorMessage: "Must be a valid email",
            },
          },
          password: {
            in: "body",
            isString: {
              errorMessage: "Must be a string",
            },
            isLength: {
              options: {
                min: 8,
              },
              errorMessage: "Must be at least 8 characters",
            },
          },
          first_name: {
            in: "body",
            isString: {
              errorMessage: "Must be a string",
            },
            isLength: {
              options: {
                min: 2,
                max: 40,
              },
              errorMessage: "Must be between 4 and 20 characters",
            },
          },
          last_name: {
            in: "body",
            isString: {
              errorMessage: "Must be a string",
            },
            isLength: {
              options: {
                min: 2,
                max: 40,
              },
              errorMessage: "Must be between 4 and 20 characters",
            },
          },
        });
      case "signin":
        return checkSchema({
          email: {
            in: "body",
            isEmail: {
              errorMessage: "Must be a valid email",
            },
          },
          password: {
            isString: {
              errorMessage: "Must be a string",
            },
            isLength: {
              options: {
                min: 8,
              },
              errorMessage: "Must be at least 8 characters",
            },
          },
        });
      case "verify":
        return checkSchema({
          email: {
            in: "body",
            isEmail: {
              errorMessage: "Must be a valid email",
            },
          },
          code: {
            isString: {
              errorMessage: "Must be a string",
            },
            isLength: {
              options: {
                min: 6,
                max: 8,
              },
              errorMessage: "Must be between 6 and 8 characters",
            },
          },
        });
    }
  }
}

export default AuthenticationController;
