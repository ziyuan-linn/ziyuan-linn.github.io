//Abstract class for all application pages, should not be instantiated
class Application {
    //instantiate with relative x position, relative y position, relative width, relative height, and title for the page
    //each relative value is between 0 and 1
    constructor(relX, relY, relW, relH, title) {
        this.relX = relX;
        this.relY = relY;
        this.relW = relW;
        this.relH = relH;
        this.title = title;
        this.isFocused = false;
        this.isDraggable = false;
        this.isHidden = false;
        this.closeButton = new Button(this.relX + this.relW - 0.02375, this.relY + 0.005, 0.02, 0.0233, closeButtonImg, () => { this.isHidden = true; this.isFocused = false; });
    }

    //draw the application window on the canvas
    display() {
        if (!this.isHidden) {
            //background
            fill(64);
            rect((this.relX - 0.0025) * width, (this.relY - 0.00333) * height, (this.relW + 0.005) * width, (this.relH + 0.00666) * height);
            fill(212, 208, 200);
            rect((this.relX - 0.0025) * width, (this.relY - 0.00333) * height, (this.relW + 0.00375) * width, (this.relH + 0.005) * height);
            fill(128);
            rect((this.relX - 0.00125) * width, (this.relY - 0.00167) * height, (this.relW + 0.0025) * width, (this.relH + 0.00333) * height);
            fill(255);
            rect((this.relX - 0.00125) * width, (this.relY - 0.00167) * height, (this.relW + 0.00125) * width, (this.relH + 0.00167) * height);
            fill(212, 208, 200);
            rect(this.relX * width, this.relY * height, this.relW * width, this.relH * height);
            //top bar
            if (this.isFocused) {
                fill(13, 39, 109);
            }
            else {
                fill(131);
            }
            rect((this.relX + 0.00125) * width, (this.relY + 0.00167) * height, (this.relW - 0.0025) * width, 0.03 * height);
            //title text
            textFont(boldFont, height * 0.018);
            textAlign(LEFT, CENTER);
            fill(255);
            text(this.title, (this.relX + 0.005) * width, (this.relY + 0.013) * height);
            //display the windowClose button
            this.closeButton.display();
        }
    }
    //move the window by relative amount
    move(relDX, relDY) {
        this.relX += relDX;
        this.relY += relDY;
        this.closeButton.move(relDX, relDY);
    }

    update() {

    }
    //call when mouse is pressed down
    pressed() {
        if (this.isMouseOverTopBar()) {
            this.isDraggable = true;
        }
        this.closeButton.pressed();
    }
    //call when mouse is dragged
    dragged(dX, dY) {
        if (this.isDraggable == true) {
            this.move(dX / width, dY / height);
        }
    }
    //call when mouse is relesed
    released() {
        this.isDraggable = false;
        this.closeButton.released();
    }
    //call when mouse is doubleClicked
    doubleClicked() {

    }

    //return true if the mouse is over window, return false otherwise
    isMouseOver() {
        if (mouseX > this.relX * width && mouseX < (this.relX + this.relW) * width && mouseY > this.relY * height && mouseY < (this.relY + this.relH) * height) {
            return true;
        }
        return false;
    }
    //return true if the mouse is over the bar at the top, return false otherwise
    isMouseOverTopBar() {
        if (mouseX > this.relX * width && mouseX < (this.relX + this.relW) * width && mouseY > this.relY * height && mouseY < (this.relY + 0.03125) * height) {
            return true;
        }
        return false;
    }

    //convert a relative x position on the application window to a relative x position on the canvas
    convertRelX(num) {
        return this.relX + this.relW * num;
    }

    //convert a relative y position on the application window to a relative y position on the canvas
    convertRelY(num) {
        return this.relY + this.relH * num;
    }
    //convert a relative x width on the application window to a relative x width on the canvas
    convertRelW(num) {
        return this.relW * num;
    }
    //convert a relative y height on the application window to a relative y height on the canvas
    convertRelH(num) {
        return this.relH * num;
    }
}