const TILE_SIZE = 32;
const MAP_NUM_ROWS = 11;
const MAP_NUM_COLS = 15;

const WINDOW_HEIGHT = MAP_NUM_ROWS * TILE_SIZE;
const WINDOW_WIDTH = MAP_NUM_COLS * TILE_SIZE;

const FOV_ANGLE = 60 * (Math.PI / 180); // 60° degrees in radians

const WALL_STRIP_WIDTH = 1; // in pixels
const NUM_RAYS = WINDOW_WIDTH / WALL_STRIP_WIDTH;

class Map
{
	constructor()
	{
		this.grid = [
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1],
			[1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1],
			[1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
			[1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1],
			[1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
		];
	}

	render()
	{
		for (var i = 0; i < MAP_NUM_ROWS; i++)
		{
			for (var j = 0; j < MAP_NUM_COLS; j++)
			{
				var tileX = j * TILE_SIZE;
				var tileY = i * TILE_SIZE;
				var tileColor = this.grid[i][j] == 1 ? "#111" : "#222";
				stroke("#111");
				fill(tileColor);
				rect(tileX, tileY, TILE_SIZE, TILE_SIZE);
			}
		}
	}

	isWall(x, y)
	{
		x = Math.floor(x / TILE_SIZE);
		y = Math.floor(y / TILE_SIZE);
		if (x <= 0 || x >= MAP_NUM_COLS)
			return (true);
		if (y <= 0 || y >= MAP_NUM_ROWS)
			return (true);
		if (this.grid[y][x] == 1)
			return (true);
		return (false);
	}
}

class Player
{
	constructor()
	{
		this.x = (WINDOW_WIDTH / 2) + 32;
		this.y = (WINDOW_HEIGHT / 2) + 32;
		this.radius = 5;
		this.turnDirection = 0;
		this.walkDirection = 0;
		this.rotationAngle = Math.PI / 2; // 90 degrees
		this.moveSpeed = 2.0; // 2 in 32
		this.rotationSpeed = 2 * (Math.PI / 180); // 2 degrees
	}

	render ()
	{
		noStroke();
		fill("green");
		circle(this.x, this.y, this.radius);
		stroke("black");
		line(
			this.x,
			this.y,
			this.x + Math.cos(this.rotationAngle) * 10,
			this.y + Math.sin(this.rotationAngle) * 10
		);
	}

	update()
	{
		this.rotationAngle += this.turnDirection * this.rotationSpeed;
		var moveStep = this.walkDirection * this.moveSpeed;

		var newPlayerX = this.x + Math.cos(this.rotationAngle) * moveStep;
		var newPlayerY = this.y + Math.sin(this.rotationAngle) * moveStep;
		if (grid.isWall(newPlayerX, newPlayerY))
			return;
		this.x = newPlayerX;
		this.y = newPlayerY;
	}
}

class Ray
{
	constructor(rayAngle)
	{
		this.rayAngle = normalizeAngle(rayAngle);
		this.wallHitX = 0;
		this.wallHitY = 0;
		this.distance = 0;
		this.wasHitVertical = false;

		// facing Down (0 - 180°) degrees
		this.isRayFacingDown = (this.rayAngle > 0 && this.rayAngle < Math.PI);
		// facing Down (180 - 360°) degrees
		this.isRayFacingUp = !this.isRayFacingDown;

		// facing Left (90° - 270°) degrees
		this.isRayFacingLeft = (this.rayAngle > 0.5 * Math.PI && this.rayAngle < 1.5 * Math.PI);
		this.isRayFacingRight = !this.isRayFacingLeft;
	}

	cast(columnId)
	{
		///////////////////////////////////////////
		// HORIZONTAL RAY-GRID INTERSECTION CODE //
		///////////////////////////////////////////
		var foundHorzWallHit = false;
		var wallHorzHitX, wallHorzHitY;
		var xintercept, yintercept;
		var xstep, ystep;


		// Find x and y coordinates of the closest grid intersection
		yintercept = Math.floor(player.y / TILE_SIZE) * TILE_SIZE;
		// if the Ray is facing down the closest grid intersection is +32 in y
		yintercept += this.isRayFacingDown ? TILE_SIZE : 0;

		xintercept = player.x + (yintercept - player.y) / Math.tan(this.rayAngle);

		ystep = TILE_SIZE;
		ystep *= this.isRayFacingUp ? -1 : 1;

		xstep = TILE_SIZE / Math.tan(this.rayAngle);
		xstep *= (this.isRayFacingLeft && xstep > 0) ? -1 : 1;
		xstep *= (this.isRayFacingRight && xstep < 0) ? -1 : 1;

		var nextHorzTouchX = xintercept;
		var nextHorzTouchY = yintercept;

		while ((nextHorzTouchX >= 0 && nextHorzTouchX <= WINDOW_WIDTH) &&
		(nextHorzTouchY >= 0 && nextHorzTouchY <= WINDOW_HEIGHT))
		{
			if (grid.isWall(nextHorzTouchX, nextHorzTouchY - this.isRayFacingUp ? 1 : 0))
			{
				foundHorzWallHit = true;
				wallHorzHitX = nextHorzTouchX;
				wallHorzHitY = nextHorzTouchY;
				break;
			}
			else
			{
				nextHorzTouchX += xstep;
				nextHorzTouchY += ystep;
			}
		}

		///////////////////////////////////////////
		/// VETICAL RAY-GRID INTERSECTION CODE ////
		///////////////////////////////////////////
		var foundVertWallHit = false;
		var wallVertHitX, wallVertHitY;

		// Find x and y coordinates of the closest grid intersection
		xintercept = Math.floor(player.x / TILE_SIZE) * TILE_SIZE;
		// if the Ray is facing down the closest grid intersection is +32 in X
		xintercept += this.isRayFacingRight ? TILE_SIZE : 0;

		yintercept = player.y + (xintercept - player.x) * Math.tan(this.rayAngle);

		xstep = TILE_SIZE;
		xstep *= this.isRayFacingLeft ? -1 : 1;

		ystep = TILE_SIZE * Math.tan(this.rayAngle);
		ystep *= (this.isRayFacingUp && ystep > 0) ? -1 : 1;
		ystep *= (this.isRayFacingDown && ystep < 0) ? -1 : 1;

		var nextVertTouchX = xintercept;
		var nextVertTouchY = yintercept;

		while ((nextVertTouchX >= 0 && nextVertTouchX <= WINDOW_WIDTH) &&
		(nextVertTouchY >= 0 && nextVertTouchY <= WINDOW_HEIGHT))
		{
			if (grid.isWall(nextVertTouchX - this.isRayFacingLeft ? -1 : 0, nextVertTouchY))
			{
				foundVertWallHit = true;
				wallVertHitX = nextVertTouchX;
				wallVertHitY = nextVertTouchY;
				break;
			}
			else
			{
				nextVertTouchX += xstep;
				nextVertTouchY += ystep;
			}
		}

		// COMPARE HORIZONTAL AND VERTICAL
		var distanceHorzHit;
		var distanceVertHit;

		distanceHorzHit = (foundHorzWallHit)
		? distanceBetweenPoints(player.x, player.y, wallHorzHitX, wallHorzHitY) : Number.MAX_VALUE;

		distanceVertHit = (foundVertWallHit)
		? distanceBetweenPoints(player.x, player.y, wallVertHitX, wallVertHitY) : Number.MAX_VALUE;

		this.wallHitX = (distanceHorzHit < distanceVertHit)
		? wallHorzHitX : wallVertHitX;

		this.wallHitY = (distanceHorzHit < distanceVertHit)
		? wallHorzHitY : wallVertHitY;

		this.distance = (distanceHorzHit < distanceVertHit)
		? distanceHorzHit : distanceVertHit;

		this.wasHitVertical = (distanceVertHit < distanceHorzHit)
	}

	render()
	{
		stroke("rgba(255,255,0,0.3)");
		line(
			player.x,
			player.y,
			this.wallHitX,
			this.wallHitY
		);
	}
}

var grid = new Map();
var player = new Player();
var rays = [];

function keyPressed()
{
	if (keyCode == UP_ARROW)
		player.walkDirection = 1;
	else if (keyCode == DOWN_ARROW)
		player.walkDirection = -1;
	else if (keyCode == RIGHT_ARROW)
		player.turnDirection = 1;
	else if (keyCode == LEFT_ARROW)
		player.turnDirection = -1;
}

function keyReleased()
{
	if (keyCode == UP_ARROW)
		player.walkDirection = 0;
	else if (keyCode == DOWN_ARROW)
		player.walkDirection = 0;
	else if (keyCode == RIGHT_ARROW)
		player.turnDirection = 0;
	else if (keyCode == LEFT_ARROW)
		player.turnDirection = 0;
}

function castAllRays()
{
	var columnId = 0;
	var rayAngle = player.rotationAngle - (FOV_ANGLE / 2);

	rays = [];

	for (var i = 0; i < NUM_RAYS; i++)
	{
		var ray = new Ray(rayAngle);
		rays.push(ray);
		ray.cast(columnId);
		rayAngle += FOV_ANGLE / NUM_RAYS;

		columnId++;
	}
}

function normalizeAngle( angle )
{
	angle = angle % (2 * Math.PI);
	if (angle < 0)
		angle = (2 * Math.PI) * angle;
	return (angle);
}

function distanceBetweenPoints(x1, y1, x2, y2)
{
	return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}

function setup()
{
	createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
}

function update()
{
	player.update();
	castAllRays();
}

function draw()
{
	update();

	grid.render();
	for (ray of rays)
	{
		ray.render();
	}
	player.render();
}

// Distance between each ray = FOV_ANGLE / NUM_RAYS
// 60° for 320 rays

