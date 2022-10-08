import { body } from "express-validator";

export const postValidator = [
  body("text", "Текст должен быть минимум 5 символов").isLength({min:5}),
]