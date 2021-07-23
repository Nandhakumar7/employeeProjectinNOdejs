const mongoose = require('mongoose');

// database connection created here
mongoose.connect('mongodb://localhost:2719/employees?replicaSet=myrpl', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites:false
})

module.exports = mongoose;
