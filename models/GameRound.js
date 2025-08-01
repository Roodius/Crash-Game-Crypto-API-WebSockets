const mongoose = require('mongoose');
const { required } = require('zod/mini');


const betSchema = new mongoose.Schema({
    roundId:{
        type:String,
        require:true,
        unique:true
    },
    seed:{
        type:String,
        required:true,
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

    const Gamerounds = new mongoose.model('GameRounds',betSchema)

module.exports = Gamerounds


