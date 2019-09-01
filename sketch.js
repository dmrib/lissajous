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

    // build Lissajous table
    buildTable();
}


/**
 * p5.js drawing function
 */
function draw()
{
    // paint background
    background(...BACKGROUND_COLOR);

    // update and render generators
    for(let i=0; i < hGenerators.length; i++)
    {
        hGenerators[i].update();
        vGenerators[i].update();
        hGenerators[i].render()
        vGenerators[i].render();
    }
}


/**
 * I build a Lissajous table.
 */
function buildTable()
{
    // create horizontal and vertical generators
    for(let i = 1; i < TABLE_SIZE / ENTRY_SIZE; i++)
    {
        hGenerators.push(new HGenerator(50 + i * ENTRY_SIZE, ENTRY_SIZE / 2, i));
        vGenerators.push(new VGenerator(ENTRY_SIZE / 2, 50 + i * ENTRY_SIZE, i));
    }
}