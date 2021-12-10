class Field {
    //instantiate with relative x position, relative y position, relative width, relative height
    constructor(relX, relY, relW, relH, col) {
        this.relX = relX;
        this.relY = relY;
        this.relW = relW;
        this.relH = relH;
        this.col = col
    }
    //draw the field on the screen
    display() {
        fill(255);
        rect(this.relX * width, this.relY * height, this.relW * width, this.relH * height);
        fill(128);
        rect(this.relX * width, this.relY * height, (this.relW - 0.00125) * width, (this.relH - 0.00167) * height);
        fill(212, 208, 200);
        rect((this.relX + 0.00125) * width, (this.relY + 0.00167) * height, (this.relW - 0.0025) * width, (this.relH - 0.00333) * height);
        fill(64);
        rect((this.relX + 0.00125) * width, (this.relY + 0.00167) * height, (this.relW - 0.00375) * width, (this.relH - 0.005) * height);
        fill(255);
        rect((this.relX + 0.0025) * width, (this.relY + 0.00333) * height, (this.relW - 0.005) * width, (this.relH - 0.00667) * height);
        
        
    }
    //move the window by relative amount
    move(relDX, relDY) {
        this.relX += relDX;
        this.relY += relDY;
    }
    
    //return true if the mouse is over the field, return false otherwise
    isMouseOver() {
        if(mouseX > this.relX * width && mouseX < (this.relX + this.relW) * width && mouseY > this.relY * height && mouseY < (this.relY + this.relH) * height) {
            return true;
        }
        return false;
    }

    update() {

    }


}