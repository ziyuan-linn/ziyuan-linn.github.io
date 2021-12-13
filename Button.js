class Button {
    //instanciate with relative x position, relative y position, relative width, relative height, content on the button(text or image), and a callback function
    //each relative value is between 0 and 1

    constructor(relX, relY, relW, relH, content, callback) {
        this.relX = relX;
        this.relY = relY;
        this.relW = relW;
        this.relH = relH;
        this.content = content;
        this.isPressed = false;
        this.callback = callback;
    }

    display() {
        //button background
        if (this.isPressed) {
            fill(255);
            rect(this.relX * width, this.relY * height, this.relW * width, this.relH * height);
            fill(64);
            rect(this.relX * width, this.relY * height, (this.relW - 0.00125) * width, (this.relH - 0.00167) * height);
            fill(212, 208, 200);
            rect((this.relX + 0.00125) * width, (this.relY + 0.00167) * height, (this.relW - 0.0025) * width, (this.relH - 0.00333) * height);
            fill(128);
            rect((this.relX + 0.00125) * width, (this.relY + 0.00167) * height, (this.relW - 0.00375) * width, (this.relH - 0.005) * height);
            fill(233, 232, 227);
            rect((this.relX + 0.0025) * width, (this.relY + 0.00333) * height, (this.relW - 0.005) * width, (this.relH - 0.00667) * height);
        }
        //pressed button background
        else {
            fill(64);
            rect(this.relX * width, this.relY * height, this.relW * width, this.relH * height);
            fill(255);
            rect(this.relX * width, this.relY * height, (this.relW - 0.00125) * width, (this.relH - 0.00167) * height);
            fill(128);
            rect((this.relX + 0.00125) * width, (this.relY + 0.00167) * height, (this.relW - 0.0025) * width, (this.relH - 0.00333) * height);
            fill(212, 208, 200);
            rect((this.relX + 0.00125) * width, (this.relY + 0.00167) * height, (this.relW - 0.00375) * width, (this.relH - 0.005) * height);
        }
        //content
        if (typeof (this.content) == "string") {
            textFont(regularFont, height * 0.015);
            textAlign(CENTER, CENTER);
            fill(0);
            text(this.content, (this.relX + this.relW / 2) * width, (this.relY + this.relH / 2 - 0.002) * height);
        }
        else {
            imageMode(CORNER);
            image(this.content, (this.relX + 0.00125) * width, (this.relY + 0.00167) * height, this.content.width / 800 * width, this.content.height / 600 * height);
        }

    }
    //move the window by relative amount
    move(relDX, relDY) {
        this.relX += relDX;
        this.relY += relDY;
    }

    update() {

    }

    //call this function when the mouse is pressed down
    pressed() {
        if (mouseX > this.relX * width && mouseX < (this.relX + this.relW) * width && mouseY > this.relY * height && mouseY < (this.relY + this.relH) * height) {
            this.isPressed = true;
        }
    }
    //call this function when mouse is released
    released() {

        if (this.isPressed && mouseX > this.relX * width && mouseX < (this.relX + this.relW) * width && mouseY > this.relY * height && mouseY < (this.relY + this.relH) * height) {
            this.callback();
        }
        this.isPressed = false;
    }
}