class CanviiApp {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.lastMouseCoord = null;
        this.lines = [];
        this.currentLine = 0;
        this.strokeColor = 'magenta';
        this.lineWidth = 1;
        this.drawMode = true;
        this.adjustCanvasSize();
        window.addEventListener('resize', this.adjustCanvasSize.bind(this));
        this.addMouseHandlers();
        this.addKeyHandlers();
        window.setStrokeColor = color => this.strokeColor = color;
        window.setLineWidth = lineWidth => this.lineWidth = lineWidth;
    }

    adjustCanvasSize() {
        const canvasWidth = window.innerWidth;
        const canvasHeight = window.innerHeight;
        this.canvas.width = canvasWidth;
        this.canvasWidth = canvasWidth;
        this.canvas.height = canvasHeight;
        this.canvasHeight = canvasHeight;
    }

    addMouseHandlers() {
        this.canvas.addEventListener('mousedown', ({offsetX, offsetY}) => {
            if (this.drawMode) {
                this.lastMouseCoord = [offsetX, offsetY];
                this.lines.push(new Line(this.strokeColor, this.lineWidth));
            }
        });
        this.canvas.addEventListener('mousemove', ({offsetX, offsetY}) => {
            if (this.drawMode && this.lastMouseCoord) {
                const coords = [offsetX, offsetY];
                this.lines[this.currentLine].addSegment(this.lastMouseCoord.concat(coords));
                this.lastMouseCoord = coords;
                this.draw();
            }
        });
        this.canvas.addEventListener('mouseup', ({offsetX, offsetY}) => {
            if (this.drawMode && this.lastMouseCoord) {
                this.lines[this.currentLine].addSegment(this.lastMouseCoord.concat([offsetX, offsetY]));
                this.lastMouseCoord = null;
                this.currentLine++;
                this.draw();
            } 
        });
        const selectTool = document.querySelector('.js-select-tool');
        selectTool.addEventListener('click', () => {
            this.drawMode = !this.drawMode;
            selectTool.textContent = !this.drawMode ? 'draw' : 'select';
        });
    }

    addKeyHandlers() {
        document.addEventListener('keypress', ({charCode, ctrlKey}) => {
            if (ctrlKey && charCode === 26 && this.lines.length) {
                this.lines.pop();
                this.currentLine--;
                this.draw();
            }
        });
        const lineWidthIn = document.querySelector('.js-line-width input');
        lineWidthIn.addEventListener('input', ({currentTarget}) => {
            this.lineWidth = parseInt(currentTarget.value);
        });
        lineWidthIn.value = this.lineWidth;
        const colorIn = document.querySelector('.js-color input');
        colorIn.addEventListener('input', ({currentTarget}) => {
            this.strokeColor = currentTarget.value;
        });
        colorIn.value = this.strokeColor;
    }

    draw() {
        window.requestAnimationFrame(this.render.bind(this));
    }

    render() {
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.lines.forEach(line => { line.draw(this.context); });
    }
}

new CanviiApp(document.querySelector('.canvii-app__canvas'));
