import express from "express";

import todoController from "../controller/todoController.js";

const router = express.Router();

router.post("/create", todoController.create);

router.get("/getAll", todoController.getAll);

router.get("/:id", todoController.getSpecific);

router.delete("/delete/:id", todoController.deleteTodo);

router.patch("/update/:id", todoController.update);

export default router;
