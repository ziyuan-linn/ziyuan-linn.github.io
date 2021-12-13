class StartScreen {
    constructor(bg, title, start_game) {
        this.button = new Button(0.77, 0.83, 0.16, 0.05, "START", () => { this.start() });
        this.bg = bg;
        this.title = title;
        this.start_game = start_game;
    }

    display() {
        background(0);
        image(this.bg, 0, 0, width, height);
        image(this.title, 0.15 * width, 0.24 * height, 0.65 * width, 0.26 * height);
        image(this.start_game, 0.77 * width, 0.8 * height, 0.15 * width, 0.09 * height);
    }

    start() {
        gameState = "game";
        startTime = millis();
    }

    pressed() {
        this.button.pressed();
    }

    released() {
        this.button.released();
    }
}