function Line2(point1In, point2In)
{
    this.point1 = point1In;
    this.point2 = point2In;
    
    this.Draw = function(ctx)
    {
        ctx.beginPath();
        ctx.moveTo(this.point1.x, this.point1.y);
        ctx.lineTo(this.point2.x, this.point2.y);
        ctx.stroke();
    }
}