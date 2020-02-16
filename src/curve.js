/**
 * Lissajous curve representation.
 */
class Curve
{
    /**
     * Constructor.
     * 
     * Args:
     *  row(number): curve row
     *  column(number): curve column
     * 
     * Returns:
     *  undefined.
     */
    constructor(row, column)
    {
        // create components
        this.center = createVector(100 + column * ENTRY_SIZE, 100 + row * ENTRY_SIZE);
        this.points = [];
        this.color = [int(random(0, 255)), int(random(0, 255)), int(random(0, 255))]
    }

    /**
     * I render myself.
     * 
     * Returns:
     *  undefined.
     */
    render()
    {
        // push matrix
        push()

        // translate to entry corner
        translate(this.center.x - 10, this.center.y - 10)
        
        // draw curve
        noFill();
        stroke(...this.color);
        strokeWeight(2);
        beginShape();
        for(let element of this.points)
        {
            vertex(element.x, element.y);
        }
        endShape();

        // draw latest curve point
        fill(...this.color);
        ellipse(this.points[this.points.length - 1].x, this.points[this.points.length - 1].y, 8, 8);

        // pop matrix
        pop();
    }

    /**
     * I add a point to myself.
     * 
     * Args:
     *  point(p5.Vector): next curve point
     * 
     * Returns:
     *  undefined.
     */
    addPoint(point)
    {
        this.points.push(point);
    }
}