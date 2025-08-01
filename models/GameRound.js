const mongoose = require('mongoose');
const { required } = require('zod/mini');


const roundsSchema = new mongoose.Schema({
    roundId:{
        type:String,
        require:true,
        unique:true
    },
    crashPoint:{
        type:Number,
        required:true,
    },
    startedAt:{
        type:Date,
        default:Date.now(),
    },
    endedAt:{
        type:Date,
    }

});

    const Gamerounds = new mongoose.model('gameRounds',roundsSchema)

module.exports = Gamerounds


