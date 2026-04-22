import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      minLength: 2,
      maxLength: 100,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
      maxLength: 300,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "complete"],
      default: "pending",
    },
  },
  { timeseries: true },
);

const Todo = mongoose.model("Todo", TodoSchema);

export default Todo;
