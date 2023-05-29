//creating an express router
//router calls a function based on a URL
//on this router object we create API endpoints
const express = require('express');
const fs = require('fs'); //to read files
const path = require('path'); //to write our path to our directory easier

const router = express.Router();


//GET method - returns stats by providing a playerID in the url
// we use an async function so that we can wait for this task to run and our program will still be responsive while this task runs
const getStats = async (req,res,next) => {
    try{
        const data = fs.readFileSync(path.join(__dirname,'./stats.json'));
        const stats = JSON.parse(data);
        const playerStats = stats.find(player => player.playerID === Number(req.params.id));
        //find() returns first element that satisfies the function inside
        if (!playerStats){
            const err = new Error('Player stats not found');
            err.status = 404;
            throw err;
        }
        res.json(playerStats); //send a JSON response
    } catch (e){
        next(e);
    }
    
};
router
    .route('/api/v1/stats/:id')
    .get(getStats);


const statsFilePath = path.join(__dirname, "./stats.json");
//POST method - can create a new entry
const createStats = async (req,res,next) => {
    try{
        const data = fs.readFileSync(statsFilePath);
        const stats = JSON.parse(data);
        const newStats = {
            playerID: req.body.playerID,
            hr: req.body.hr,
            rbi:req.body.rbi,
            obp:req.body.obp,
            ops:req.body.ops
        };
        stats.push(newStats);
        fs.writeFileSync(statsFilePath,JSON.stringify(stats));
        res.status(201).json(newStats);
    }catch(e){
        next(e);
    }
}
router
    .route('/api/v1/stats')
    .post(createStats)

//PUT method = update a player's stats
const updateStats = async (req,res,next) => {
    try{
        const data = fs.readFileSync(statsFilePath);
        const stats = JSON.parse(data);
        const PlayerStats = stats.find(player => player.id === Number(req.params.id));
        if (!playerStats){
            const err = new Error('Player stats not found');
            err.stats = 404;
            throw err;
        }
        const newStatsData = {
            playerID: req.body.playerID,
            hr: req.body.hr,
            rbi:req.body.rbi,
            obp:req.body.obp,
            ops:req.body.ops
        }
        const newStats = stats.map(player => {
            if (player.id === Number(req.params.id)){
                return newStatsData;
            }else{
                return player;
            }
        });
        fs.writeFileSync(statsFilePath,JSON.stringify(newStats));
        res.status(200).json(newStatsData);
    } catch(e){
        next(e);
    }
};

router
    .route('/api/v1/stats/:id')
    .get(getStats)
    .put(updateStats);

//DELETE method - delete an entry

const deleteStats = async (req,res,next) => {
    try{
        const data = fs.readFileSync(statsFilePath);
        const stats = JSON.parse(data);
        const PlayerStats = stats.find(player => player.id === Number(req.params.id));
        if (!playerStats){
            const err = new Error('Player stats not found');
            err.stats = 404;
            throw err;
        }
        const newStats = stats.map(player => {
            if (player.id === Number(req.params.id)){
                return null; //remove this entry
            }else{
                return player;
            }
        })
        .filter(player => player !== null); //filter only entries that aren't null
        fs.writeFileSync(statsFilePath,JSON.stringify(newStats));
        res.status(200).end();
    } catch(e){
        next(e);
    }
};

router
    .route('/api/v1/stats/:id')
    .get(getStats)
    .put(updateStats)
    .delete(deleteStats);

module.exports = router;




