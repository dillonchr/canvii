class Line {
	constructor(strokeColor, lineWidth) {
		this.strokeColor = strokeColor;
		this.lineWidth = lineWidth;
		this.points = [];
	}

	addSegment(lineSegmentCoords) {
		this.points.push(lineSegmentCoords);
	}

	draw(ctx) {
		ctx.strokeStyle = this.strokeColor;
        ctx.lineWidth = this.lineWidth;
        ctx.beginPath();
        this.points.forEach(([x1, y1, x2, y2]) => {
        	ctx.moveTo(x1, y1);
        	ctx.lineTo(x2, y2);
        });
        ctx.stroke();
	}
}
