class ContentField extends Field {
    constructor(relX, relY, relW, relH, col, content, contentType) {
        super(relX, relY, relW, relH, col);
        this.content = content;
        this.contentType = contentType;
    }

    display() {
        super.display();
        if (this.contentType == "string") {
            textFont(regularFont, height * 0.017);
            textAlign(LEFT, TOP);
            fill(0);
            text(this.content, (this.relX + 0.00375) * width, (this.relY + 0.00333) * height, (this.relW - 0.0075) * width, (this.relH - 0.00666) * height);
        }
        else if (this.contentType == "image") {
            imageMode(CENTER);
            let windowRatio = this.relH * height / (this.relW * width);
            let imageRatio = this.content.height / this.content.width;
            if (windowRatio < imageRatio) {
                image(this.content, (this.relX + this.relW / 2) * width, (this.relY + this.relH / 2) * height, (this.relH - 0.00666) * height / imageRatio, (this.relH - 0.00666) * height);
            }
            else {
                image(this.content, (this.relX + this.relW / 2) * width, (this.relY + this.relH / 2) * height, (this.relW - 0.005) * width, (this.relW - 0.005) * width * imageRatio);
            }
        }
    }
}