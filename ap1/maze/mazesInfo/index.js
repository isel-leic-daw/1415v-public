var mazes = {
  "simple": {
    "_id" : "simple",
    "title" : "A Beginner's Maze",
    "rooms" : {
        "room0":{"title":"Entrance Hallway", "doors":[1,1,1,0]},
        "room1":{"title":"Hall of Knives", "doors":[1,1,1,0]},
        "room2":{"title":"Library", "doors":[1,1,0,0]},
        "room3":{"title":"Trophy Room", "doors":[0,1,0,1]},
        "room4":{"title":"Pantry", "doors":[0,1,1,0]},
        "room5":{"title":"Kitchen", "doors":[1,0,1,0]},
        "room6":{"title":"Cloak Room", "doors":[1,0,0,1]},
        "room7":{"title":"Master Bedroom", "doors":[0,0,1,0]},
        "room8":{"title":"Fruit Closet", "doors":[1,1,0,0]},
        "room9":{"title":"Den of Forks", "doors":[0,0,1,1]},
        "room10":{"title":"Nursery", "doors":[1,0,0,1]},
        "room11":{"title":"Laundry Room", "doors":[0,1,1,0]},
        "room12":{"title":"Smoking Room", "doors":[1,0,1,1]},
        "room13":{"title":"Dining Room", "doors":[1,0,0,1]},
        "room14":{"title":"Sitting Room", "doors":[0,1,1,0]},
        "room15":{"title":"Standing Room", "doors":[1,1,1,0]},
        "room16":{"title":"Hobby Room", "doors":[1,0,1,0]},
        "room17":{"title":"Observatory", "doors":[1,1,0,0]},
        "room18":{"title":"Hot House", "doors":[0,1,0,1]},
        "room19":{"title":"Guest Room", "doors":[0,0,1,0]},
        "room20":{"title":"Servant's Quarters", "doors":[1,0,0,1]},
        "room21":{"title":"Garage", "doors":[0,0,0,1]},
        "room22":{"title":"Tool Room", "doors":[0,0,1,1]},
        "room23":{"title":"Banquet Hall", "doors":[1,1,0,1]},
        "room24":{"title":"Spoon Storage", "doors":[0,0,1,1]}
      }
  }
};

var maze = mazes['simple'];
maze.totalRooms = Object.keys(maze.rooms).length;
for (var i = 0; i < maze.totalRooms; ++i)
{
  var roomId = 'room'+i;
  var room = maze.rooms[roomId];
  room.roomId = roomId;
  room.roomIdx = i;

};
// Assumptions regarding entry/exit
maze.rooms[Object.keys(maze.rooms)[0]].isEntry = true;
maze.rooms[Object.keys(maze.rooms)[maze.totalRooms-1]].isExit = true;



/*
      0 5 10 15 20           N (0)
      1 6 11 16 21            |
      2 7 12 17 22    W (1) -- -- E (3)
      3 8 13 18 23            |
      4 9 14 19 24           S (2)

  NOTE: With this implementation, only works with 5x5 mazes
 */
function getAdjacentRoomId(roomId, direction) {
  var displacement = [
    function north(id) { return id-1 },
    function  west(id) { return id-5 },
    function south(id) { return id+1 },
    function  east(id) { return id+5 },
  ]
  return displacement[direction](roomId);
}

module.exports.getAdjacentRoomId = getAdjacentRoomId;
module.exports.getMazeByName = function(mazeName)
{
  return mazes[mazeName];
};
