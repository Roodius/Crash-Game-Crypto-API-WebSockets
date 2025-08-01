const express = require('express');
const router = express.Router();
const {getCrashHistory,getPlayerBet,getRoundDetails} = require('../controllers/gameController')


router.get('/crash-history',getCrashHistory)


router.get('/round/:roundId',getRoundDetails)


router.get('/player-bethistory/:socketId',getPlayerBet)

router.get('/' ,() => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

module.exports = router
