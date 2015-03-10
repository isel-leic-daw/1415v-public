(function(location, doc) {

    var mazeEnterMazeUrl    = doc.getElementById("maze-enter-maze-url");
    var mazeEnterMazeButton = doc.getElementById("maze-enter-maze-btn");

    var mazeArea           = doc.getElementById("maze-area");
    var mazeCurrentRoom    = doc.getElementById("maze-current-room");
    var mazeLog            = doc.getElementById("maze-log");

    var directions = {
        "start" : doc.getElementById("maze-direction-start"),
        "exit"  : doc.getElementById("maze-direction-exit"),

        "north" : doc.getElementById("maze-direction-north"),
        "west"  : doc.getElementById("maze-direction-west"),
        "south" : doc.getElementById("maze-direction-south"),
        "east"  : doc.getElementById("maze-direction-east")
    }

    var currMaze = null;
    var currRoom = null;

    mazeEnterMazeButton.onclick = function()
    {
        mazeArea.classList.toggle("hidden");
        mazeEnterMazeUrl.disabled = mazeEnterMazeButton.disabled = true;
        enterMaze(mazeEnterMazeUrl.value);
    }

    function enterMaze(billboard)
    {
        doGet(billboard, function(err, maze)
        {
            if(err) return showError(err);

            currMaze = maze;
            addToLog("Entered in maze [" + currMaze.title + "]");

            maze.links.forEach(function(link)
            {
                directions[link.rel].classList.add("btn-primary");
                directions[link.rel].onclick = enterRoom.bind(null, link.rel, link.href);
            });

        });
    }

    function enterRoom(rel, roomUrl)
    {
        addToLog("Entering the room " + roomUrl);

        doGet(roomUrl, function(err, room)
        {
            if(err) return showError("Cannot find the room");

            // Close all doors
            Object.keys(directions).forEach(function(direction)
            {
                directions[direction].onclick = null;
                directions[direction].classList.remove("btn-primary");
            });

            if(rel === "exit") {
                addToLog("SUCCESS. " + room.message);
                addToLog("Refresh the page to start over.")
                return;
            }

            mazeCurrentRoom.innerText = room.title;
            addToLog("Inside room " + room.title);
            addToLog("There are " + room.links.length + " available direction(s) to go.");

            room.links.forEach(function(link)
            {
                if(!directions[link.rel]) return;
                directions[link.rel].classList.add("btn-primary");
                directions[link.rel].onclick = enterRoom.bind(null, link.rel, link.href);
            });
        });
    }

    function showError(err)
    {
        // TODO: Provide a better UI (and reset)
        alert("ERROR: " + err);
        location.reload();
    }

    function addToLog(message)
    {
        mazeLog.value = new Date().toLocaleTimeString() + " - " + message + "\n" + mazeLog.value;
    }

    function doGet(url, done) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.send(null);
        xhr.onreadystatechange = function() {
            if(this.readyState === 4 /* DONE */) {
                if(this.status === 200) done(null, JSON.parse(this.responseText));
                else                    done("Invalid response: HTTP Status = " + this.status);
            }
        }
    }


})(window.location, document);