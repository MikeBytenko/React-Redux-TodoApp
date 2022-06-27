const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema(
  {
    note: {
      type: String,
      requied: true,
    },
    checked: {
      type: Boolean,
      default: false
    }
  },
);

NotesSchema.statics.format = notes => {
  return {
    note: notes.note
  };
};

module.exports = mongoose.model("Notes", NotesSchema);
