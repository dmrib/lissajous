/**
 * CONSTANTS AND DEFINITIONS
 */

// sketch parameters
const CANVAS_SIZE = 900;
const TABLE_SIZE = 880;
const ENTRY_SIZE = 80;
const BACKGROUND_COLOR = [99, 27, 27];
const H_GENERATOR_COLOR = [255, 106, 0];
const H_POINT_COLOR = [235, 196, 91];
const V_GENERATOR_COLOR = [143, 66, 214];
const V_POINT_COLOR = [203, 157, 245];
const POINT_SPEED = 0.01;

// curves
let curves = [];

// curve generators
let hGenerators = [];
let vGenerators = [];

/**
 * p5.js setup function
 */
function setup()
{
    // setup canvas
    createCanvas(CANVAS_SIZE, CANVAS_SIZE);

    // set framerate
    frameRate(60);

    reset();
}


/**
 * p5.js drawing function
 */
function draw()
{
    // paint background
    background(...BACKGROUND_COLOR);

    if(hGenerators[0].angle < -TWO_PI)
    {
        reset();
    }

    // render generators
    for(let i=0; i < hGenerators.length; i++)
    {
        hGenerators[i].render();
        vGenerators[i].render();
    }

    // render curves
    for(let i=0; i < hGenerators.length; i++)
    {
        for(let j=0; j < vGenerators.length; j++)
        {
            curves[i][j].render();
        }
    }

     // update generators
     for(let i=0; i < hGenerators.length; i++)
     {
         hGenerators[i].update();
         vGenerators[i].update();
     }

    // update table state
    updateTable();
}


/**
 * I build a Lissajous table.
 */
function buildTable()
{
    hGenerators = [];
    vGenerators = [];

    // create horizontal and vertical generators
    for(let i = 1; i < TABLE_SIZE / ENTRY_SIZE; i++)
    {
        hGenerators.push(new HGenerator(50 + i * ENTRY_SIZE, ENTRY_SIZE / 2, i));
        vGenerators.push(new VGenerator(ENTRY_SIZE / 2, 50 + i * ENTRY_SIZE, i));
    }
}


/**
 * I create empty Lissajous curves containers.
 */
function createCurves()
{
    // generated curves
    curves = [];

    // create Lissajous curves and add to row
    for(let i=0; i < hGenerators.length; i++)
    {
        
        // create empty row of curves
        let row = [];
    
        // create curve and add to row
        for(let j=0; j < vGenerators.length; j++)
        {
            row.push(new Curve(i, j));
        }

        // integrate row
        curves.push(row);
    }
}


/**
 * I update the curves table.
 */
function updateTable()
{
    // update table state
    for(let i=0; i < hGenerators.length; i++)
    {
        // get curve point y coordinate
        const y = hGenerators[i].toPolar().y;

        for(let j=0; j < vGenerators.length; j++)
        {
            // get curve point x coodinate
            const x = vGenerators[j].toPolar().x;
            
            // create new curve point
            const updated = createVector(x, y);
            
            // add point to curve.
            curves[i][j].addPoint(updated)
        }
    }
}

function reset()
{
    // build Lissajous table
    buildTable();

    // create curves container
    createCurves();

    // setup table
    updateTable();
}