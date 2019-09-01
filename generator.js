/**
 * Lissajous curve generator.
 */
class Generator
{
    /**
     * Constructor.
     * 
     * Args:
     *  x(number): generator center x coordinate
     *  y(number): generator center y coordinate
     * 
     * Returns:
     *  undefined.
     */
    constructor(x, y, offset)
    {
        // store components
        this.center = createVector(x, y);
        this.angle = - HALF_PI;
        this.radius = (ENTRY_SIZE - 10) / 2;
        this.speed = POINT_SPEED * offset;
    }

    /**
     * I update my generator angle.
     * 
     * Returns:
     *  undefined.
     */
    update()
    {
        this.angle += this.speed;
    }

    /**
     * I convert my cartesian center coordinates to polar.
     * 
     * Returns:
     *  (p5.Vector): converted coordinates
     */
    toPolar()
    {
        return createVector(this.center.x + this.radius * cos(this.angle), 
                            this.center.y + this.radius * sin(this.angle));
    }
}

/**
 * Horizontal generator specialization
 */
class HGenerator extends Generator
{
    /**
     * I render myself.
     * 
     * Returns:
     *  undefined.
     */
    render()
    {
        // render circle
        noFill();
        strokeWeight(3);
        stroke(...H_GENERATOR_COLOR);
        ellipse(this.center.x, this.center.y, ENTRY_SIZE - 10, ENTRY_SIZE - 10);

        // render generator point
        fill(...H_POINT_COLOR);
        strokeWeight(1);
        stroke(...H_POINT_COLOR);
        const polar = this.toPolar();
        ellipse(polar.x, polar.y, 10, 10);

        // render table lines
        drawingContext.setLineDash([5, 5]);
        line(polar.x, polar.y, polar.x, CANVAS_SIZE);
        drawingContext.setLineDash([]);
    }
}


/**
 * Vertical generator specialization
 */
class VGenerator extends Generator
{
    /**
     * I render myself.
     * 
     * Returns:
     *  undefined.
     */
    render()
    {
        // render circle
        noFill();
        strokeWeight(3);
        stroke(...V_GENERATOR_COLOR);
        ellipse(this.center.x, this.center.y, ENTRY_SIZE - 10, ENTRY_SIZE - 10);

        // render generator point
        fill(...V_POINT_COLOR);
        strokeWeight(1);
        stroke(...V_POINT_COLOR);
        const polar = this.toPolar();
        ellipse(polar.x, polar.y, 10, 10);

        // render table lines
        drawingContext.setLineDash([5, 5]);
        line(polar.x, polar.y, CANVAS_SIZE, polar.y);
        drawingContext.setLineDash([]);
    }
}