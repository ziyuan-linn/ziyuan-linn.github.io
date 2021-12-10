class TextFile extends Application {
    constructor(relX, relY, relW, relH, title, text) {
        super(relX, relY, relW, relH, title);
        this.text = text;
        this.textField = new ContentField(relX + 0.0025, relY + 0.03667, relW - 0.005, relH - 0.04, 255, this.text, "string");
    }

    display() {
        super.display();
        if (!this.isHidden) {
            this.textField.display();
        }

    }

    move(dX, dY) {
        super.move(dX, dY);
        this.textField.move(dX, dY);
    }






}