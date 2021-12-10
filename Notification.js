class Notification extends Application {

    constructor(title, text) {
        super();
        this.relX = 0.35;
        this.relY = 0.425;
        this.relW = 0.3;
        this.relH = 0.15;
        this.title = title;
        this.text = text;
        this.isFocused = true;
        this.isDraggable = false;
        this.isHidden = false;
        this.notified = false;
        this.closeButton = new Button(this.relX + this.relW - 0.02375, this.relY + 0.005, 0.02, 0.0233, closeButtonImg, () => { this.buttonsClicked() });
        this.okButton = new Button(this.relX + this.relW / 2 - 0.04, this.relY + this.relH * 0.7, 0.08, 0.0233, "Ok", () => { this.buttonsClicked() });
    }

    display() {
        super.display();
        if (!this.isHidden) {
            textFont(regularFont, height * 0.017);
            textAlign(CENTER, CENTER);
            fill(0);
            text(this.text, (this.relX + this.relW / 2) * width, (this.relY + this.relH * 0.45) * height);
            this.okButton.display();
        }
    }

    pressed() {
        this.closeButton.pressed();
        this.okButton.pressed();
    }
    //call when mouse is dragged
    dragged(dX, dY) {
        return;
    }
    //call when mouse is relesed
    released() {
        this.closeButton.released();
        this.okButton.released();
    }

    buttonsClicked() {
        this.isHidden = true;
        this.notified = true;
    }
}