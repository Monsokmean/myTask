const mongoose = require("mongoose");


mongoose.connect('mongodb://localhost:27017/taskManager',{
  useNewUrlParser: true,
  useUnifiedTopology: true
});
