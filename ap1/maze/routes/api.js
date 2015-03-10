var express = require('express');
var router = express.Router();

var mazesInfo = require('./../mazesInfo');


router.get('/mazes/:id', loadMaze, function(req, res, next)
{
    var response = {
        id: req.maze._id,
        title: req.maze.title,
        links: [ linkFor('start', req.maze, 0) ],
    };
    return res.json(response);
});


router.get('/mazes/:id/rooms/:roomId', loadMaze, function(req, res, next) {

    var room = req.maze.rooms[req.params.roomId];
    if(!room) return res.status(404).end("Room not found.");

    var links = ['north', 'west', 'south', 'east']
                    .map(function(direction, i) { return linkFor(direction, req.maze, mazesInfo.getAdjacentRoomId(room.roomIdx, i) ); })
                    .filter(function(_, i) { return room.doors[i] == 0 })
    ;
    links.push(linkFor("self", req.maze, room.roomIdx));

    if(room.isExit) {
      links.push(linkToExit('exit', req.maze));
    }

    var response = {
        title: room.title,
        links: links,
    };
    return res.json(response);
});


router.get('/mazes/:id/exit', loadMaze, function(req, res, next)
{
  res.json({ message: 'Congratulations! You have exited the maze.' });
});

module.exports = router;


// ////////////////////////////////////////////////////////////////////////
// -- Auxiliar functions

function loadMaze(req, res, next) {
  var maze = mazesInfo.getMazeByName(req.params.id);
  if(!maze) return res.status(404).end("Maze not found.");
  req.maze = maze;
  next();
}

function linkFor(rel, maze, roomId) {
    return { rel: rel, href: '/api/mazes/'+maze._id+'/rooms/room' + roomId };
}
function linkToExit(rel, maze) {
    return { rel: rel, href: '/api/mazes/'+maze._id+'/exit' };
}
