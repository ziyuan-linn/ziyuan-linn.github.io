class Folder extends Application {
    //instantiate with relative x position, relative y position, relative width, relative height, and title for the page
    constructor(relX, relY, relW, relH, title) {
        super(relX, relY, relW, relH, title);
        this.icons = [];
        this.field = new Field(relX + 0.0025, relY + 0.03667, relW - 0.005, relH - 0.04);
    }

    display() {
        super.display();
        if (!this.isHidden) {
            this.field.display();
            for (let i = this.icons.length - 1; i >= 0 ; i--) {
                this.icons[i].display();
            }
        }

    }
    move(dX, dY) {
        super.move(dX, dY);
        this.field.move(dX, dY);
        for (let i = 0; i < this.icons.length; i++) {
            this.icons[i].move(dX, dY);
        }
    }
    pressed() {
        super.pressed();
        for (let i = 0; i < this.icons.length; i++) {
            //if an icon is clicked
            if (this.icons[i].isMouseOver()) {
                //move the clicked icon to the front of the icon array
                let tempIcon = this.icons[i];
                this.icons.splice(i, 1);
                this.icons.splice(0, 0, tempIcon);
                break;
            }
        }
        for (let j = 1; j < this.icons.length; j++) {
            this.icons[j].clicked = false;
        }
        //send input to the icons if icon is clicked
        if (this.icons.length > 0) this.icons[0].pressed();
    }

    dragged(dX, dY) {
        super.dragged(dX, dY);
        if (this.icons.length > 0) {
            this.icons[0].dragged(dX, dY);
            //if dragged outside of the folder, move icon to the global icon array
            if (this.icons[0].isDraggable && !this.field.isMouseOver()) {
                this.icons[0].textColor = 255;
                let tempIcon = this.icons[0];
                this.icons.splice(0, 1);
                game.icons.splice(0, 0, tempIcon);
            }
        }
    }
    released() {
        super.released();
        for (let i = 0; i < this.icons.length; i++) {
            this.icons[i].released();
        }
    }
    doubleClicked() {
        super.doubleClicked();
        if (this.icons.length > 0) this.icons[0].doubleClicked();
    }

    contains(fileName) {
        for(let i = 0; i < this.icons.length; i++) {
            if(this.icons[i].name == fileName) {
                return true;
            }
        }
        return false;
    }
}