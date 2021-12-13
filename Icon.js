class Icon {
    //instantiate with relative x positio, relative y position, name for the icon, the title of the app page it is linked to, and the text color of the icon name
    constructor(relX, relY, iconImage, name, appTitle, textColor, type) {
        this.relX = relX;
        this.relY = relY;
        this.iconImage = iconImage;
        this.name = name;
        this.appTitle = appTitle;
        this.hover = false;
        this.clicked = false;
        this.textColor = textColor;
        //type means which type of app this icon is 
        this.type = type;
    }
    //draw the icon on the screen
    display() {
        this.hover = this.isMouseOver();
        if (this.hover) {
            noStroke();
            fill(10, 36, 106, 50);
            rect((this.relX - 0.04) * width, (this.relY - 0.045) * height, 0.08 * width, 0.1067 * height);
        }
        if (this.clicked) {
            noStroke();
            fill(10, 36, 106, 100);
            rect((this.relX - 0.04) * width, (this.relY - 0.045) * height, 0.08 * width, 0.1067 * height);
        }
        imageMode(CENTER);
        image(this.iconImage, this.relX * width, this.relY * height, 0.04 * width, 0.0533 * height);
        textFont(regularFont, height * 0.017);
        textAlign(CENTER, BASELINE);
        fill(this.textColor);
        text(this.name, this.relX * width, (this.relY + 0.0533) * height);
    }
    //return true if the mouse is over the icon
    isMouseOver() {
        if (mouseX > (this.relX - 0.04) * width && mouseX < (this.relX + 0.04) * width && mouseY > (this.relY - 0.045) * height && mouseY < (this.relY + 0.0617) * height) {
            return true;
        }
        return false;
    }
    //call when mouse is down
    pressed() {
        if (this.isMouseOver()) {
            this.clicked = true;
        }
        else {
            this.clicked = false;
        }
        if (this.isMouseOver()) {
            this.isDraggable = true;
        }
    }

    //call when mouse is dragged
    dragged(dX, dY) {
        if (this.isDraggable == true) {
            this.move(dX / width, dY / height);
        }
    }
    //call when mouse id released
    released() {
        this.isDraggable = false;

        /* this feature is currently not working within a folder, temporarily disabled
        this.relX = round(this.relX, 1);
        this.relY = round(this.relY, 1);
        */
    }
    doubleClicked() {

        if (this.isMouseOver() && this.clicked) {

            for (let i = 0; i < game.apps.length; i++) {
                if (this.appTitle == game.apps[i].title) {
                    game.apps[i].isHidden = false;
                    let tempApp = game.apps[i];
                    game.apps.splice(i, 1);
                    game.apps.splice(0, 0, tempApp);

                }
            }
        }
    }

    //move the icon by relative amount
    move(relDX, relDY) {
        this.relX += relDX;
        this.relY += relDY;
    }

    //rectangle selection
    // rect_select(tx1, ty1, tx2, ty2) {
    //     if (((this.relX * width > tx1) && (this.relX * width < tx2) && (this.relY * height > ty1) && (this.relY * height < ty2))
    //         || ((this.relX * width < tx1) && (this.relX * width > tx2) && (this.relY * height < ty1) && (this.relY * height > ty2))
    //         || ((this.relX * width > tx1) && (this.relX * width < tx2) && (this.relY * height < ty1) && (this.relY * height > ty2))
    //         || ((this.relX * width < tx1) && (this.relX * width > tx2) && (this.relY * height > ty1) && (this.relY * height < ty2))) {
    //         this.clicked = true;
    //     }
    //     fill(255, 70);
    //     stroke(255, 100);
    //     rect(tx1, ty1, tx2 - tx1, ty2 - ty1);
    //     noStroke();
    // }
}