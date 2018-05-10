class Line {
    constructor(strokeColor, lineWidth) {
        this.strokeColor = strokeColor;
        this.lineWidth = lineWidth;
        this.points = [];
        this.extremeIndexes = null;
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

    finish() {
        // const extremes = this.points.reduce((bounds, [x1, y1, x2, y2], i) => {
        //  const lowestX = Math.min(x1, x2),
        //      highestX = Math.max(x1, x2),
        //      lowestY = Math.min(y1, y2),
        //      highestY = Math.max(y1, y2);
        //  if (lowestX < bounds.left.x) {
        //      bounds.left = {x: lowestX, i, subIndex: lowestX === x2};
        //  }
        //  if (highestX > bounds.right.x) {
        //      bounds.right = {x: x2, i, subIndex: highestX === x2};
        //  }
        //  if (lowestX < bounds.top.y) {
        //      bounds.top = {y: y1, i};
        //  }
        //  if (lowestY > bounds.bottom.y) {
        //      bounds.bottom = {y: y1, i};
        //  }
        //  return bounds;
        // }, {top: {}, left: {}, right: {}, bottom: {}});
    }

    toggleSelected(isSelected) {
        this.selected = isSelected;
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
        if (this.selected) {
            ctx.fillStyle = 'black';
            ctx.beginPath();
            ctx.arc(this.points[0][0], this.points[0][1], 3, 0, Math.PI * 2);
            ctx.arc(this.points[this.points.length - 1][0], this.points[this.points.length - 1][1], 3, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}
