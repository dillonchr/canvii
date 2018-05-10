class Line {
	constructor(strokeColor, lineWidth) {
		this.strokeColor = strokeColor;
		this.lineWidth = lineWidth;
		this.points = [];
	}

	addSegment(lineSegmentCoords) {
		this.points.push(lineSegmentCoords);
	}

	getDistanceSqrd(x1, y1, x2, y2) {
		return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
	}

	getDistance(x, y, coords) {
		const distanceSqrd = this.getDistanceSqrd(...coords);
		if (distanceSqrd === 0) {
			return this.getDistanceSqrd(x, y, coords[0], coords[1]);
		}

		const [x1, y1, x2, y2] = coords;
		const t = Math.max(0, Math.min(1, ((x - x1) * (x2 - x1) + (y - y1) * (y2 - y1)) / distanceSqrd));
		return this.getDistanceSqrd(x, y, x1 + t * (x2 - x1), y1 + t * (y2 - y1));
	}

	distanceFromPoint(x, y) {
		const distanceSqrd = this.points.reduce((min, coords, i) => {
			const distance = this.getDistance(x, y, coords);
			if (distance < min) {
				return distance;
			}
			return min;
		}, Infinity);
		return Math.sqrt(distanceSqrd);
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
