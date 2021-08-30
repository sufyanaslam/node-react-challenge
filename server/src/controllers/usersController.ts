import { Request, Response } from "express";
import { User } from "../models";
import bcrypt from "bcrypt";
import { check, validationResult } from "express-validator";

export class UserController {
  public validate(method: string): any {
    switch (method) {
      case "createUser": {
        return [
          check("email")
            .custom(async (value) => {
              const user = await User.findOne({
                where: {
                  email: value,
                },
              });
              if (user) {
                return Promise.reject("Email is already in use");
              }
            })
            .not()
            .isEmpty()
            .withMessage("Email can't be blank")
            .isEmail()
            .withMessage("Email format should be correct"),
          check("password")
            .not()
            .isEmpty()
            .withMessage("Password can't be blank"),
          check("firstName")
            .not()
            .isEmpty()
            .withMessage("First Name can't be blank"),
        ];
      }
      case "login": {
        return [
          check("email")
            .not()
            .isEmpty()
            .withMessage("Email can't be blank")
            .isEmail()
            .withMessage("Email format should be correct"),
          check("password")
            .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            )
            .withMessage(
              "Password must includes one uppercase, one lowercase, one special character, one digit and min length is 8"
            ),
        ];
      }
    }
  }

  public async addNewUser(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ success: false, errors: errors.array() });
      }

      const user = await User.create({
        email: req.body.email,
        firstName: req.body.firstName,
        password: req.body.password,
      });

      if (user) {
        return res.json({
          success: true,
          data: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
          },
        });
      } else {
        res.json({
          success: false,
          errors: [{ msg: "Unable to create User" }],
        });
      }
    } catch (errors) {
      res.status(422).json({
        success: false,
        errors,
      });
    }
  }

  public async signIn(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ success: false, errors: errors.array() });
      }

      const user = await User.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        res.json({
          success: true,
          data: {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
          },
        });
      } else {
        res.json({
          success: false,
          errors: [{ msg: "Email or password is incorrect" }],
        });
      }
    } catch (errors) {
      res.status(422).json({
        success: false,
        errors,
      });
    }
  }

  public async current(req: Request, res: Response) {
    try {
      // some current user logic here,  need to add JWT
    } catch (errors) {
      res.status(422).json({
        success: false,
        errors,
      });
    }
  }
}
