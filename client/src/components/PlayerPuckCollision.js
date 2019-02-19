// I have no idea where this info should be.
// The issue is that this function needs to know both the
// position of PlayerOne / PlayerTwo && Puck.
// This is just the mathematical logic to detect collisions
// and execute a new direction based on it.


// This function is executed when there is collision
function rotate(x, y, sin, cos, reverse) {
    return {
        x: (reverse) ? (x * cos + y * sin) : (x * cos - y * sin),
        y: (reverse) ? (y * cos - x * sin) : (y * cos + x * sin)
    };
}

//
function checkCollision(Player, Puck) {
    let distanceX = Puck.positionX - Player.positionX,
        distanceY  = Puck.positionY - Player.positionY,
        // distance between puck and player
        distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        // both puck sizes added together
        addedRadius = Puck.puckSize + Player.puckSize

        //if the distance between the two entities exceeds
        // their combined radius, they have collided!
        if (distance < addedRadius){
            console.log('We have collided!')
        }
    }