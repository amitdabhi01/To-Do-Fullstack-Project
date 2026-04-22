import HttpError from "../middleware/HttpError.js";
import Todo from "../model/Todo.js";

const create = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;

    const existingTodo = await Todo.findOne({ title });

    if (existingTodo) {
      return next(new HttpError("Title is already exist", 400));
    }

    const newTodo = new Todo({
      title,
      description,
      status,
    });

    await newTodo.save();

    res
      .status(201)
      .json({ success: true, message: "New Todo list added ", newTodo });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const getAll = async (req, res, next) => {
  try {
    const todos = await Todo.find({});

    if (!todos) {
      return next(new HttpError("Todo data not found", 404));
    }

    if (todos.length === 0) {
      res.status(200).json({ success: true, message: "No data found" });
    }

    res.status(200).json({
      success: true,
      message: "Todo data fetched successfully",
      todos,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const getSpecific = async (req, res, next) => {
  try {
    // const { id } = req.params // using destructure property;

    const id = req.params.id;

    const todo = await Todo.findById(id);

    if (!todo) {
      return next(new HttpError("Todo not found with this id", 404));
    }

    res.status(200).json({
      success: true,
      message: "Requested todo data found successful",
      todo,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const deleteTodo = async (req, res, next) => {
  try {
    const id = req.params.id;

    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return next(new HttpError("No todo data found", 404));
    }

    res
      .status(200)
      .json({ success: true, message: "Todo delete successfully" });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const update = async (req, res, next) => {
  try {
    const id = req.params.id;

    const todo = await Todo.findById(id);

    if (!todo) {
      return next(new HttpError("No todo data found with this id", 404));
    }

    const update = Object.keys(req.body);

    const allowedFields = ["title", "description", "status"];

    const isValid = update.every((fields) => allowedFields.includes(fields));

    if (!isValid) {
      return next(new HttpError("Only allowed fields can be update", 400));
    }

    update.forEach((update) => (todo[update] = req.body[update]));

    await todo.save();

    res
      .status(200)
      .json({ success: true, message: "Todo updated successfully", todo });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

export default { create, getAll, getSpecific, deleteTodo, update };
