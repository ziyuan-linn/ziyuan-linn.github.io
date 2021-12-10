class EndOfDay {
    constructor() {
        this.notification = new Notification("Message", texts.endOfDayNotification);
        this.bgTransparency = 0;
        this.textTransparency = 0;
    }

    display() {
        background(58, 110, 165);
        this.notification.display();

        if (this.notification.notified && this.bgTransparency < 255) {
            this.bgTransparency += 2;
        }
        if (this.bgTransparency >= 255 && this.textTransparency < 255) {
            this.textTransparency += 2;
        }

        background(5, this.bgTransparency);
        textFont(regularFont, height * 0.037);
        textAlign(CENTER, CENTER);
        fill(255, this.textTransparency);
        text("End of Day " + days + ", click anywhere to continue to the next day...", width * 0.5, height * 0.5);
    }

    pressed() {
        this.notification.pressed();
    }

    released() {
        this.notification.released();
        if (this.textTransparency >= 255 && mouseX > 0 && mouseY > 0 && mouseX < width && mouseY < height) {
              
            for (let i = 0; i < game.apps.length; i++) {
                if (game.apps[i] instanceof WorkApp && (game.apps[i].tasksCompleted == 15 && days >= 1)) {
                    this.add_file_day2();
                }
                if (game.apps[i] instanceof WorkApp && (game.apps[i].tasksCompleted == 15 && days >= 2)) {
                    this.add_file_day3();
                }
                if (game.apps[i] instanceof WorkApp && (game.apps[i].tasksCompleted == 15 && days >= 3)) {
                    this.add_file_day4();
                }
                
            }

            game.resetGame();
            startTime = millis();
            gameState = "game";
        }

    }

    add_file_day2() {
        game.apps.push(new Folder(0.3, 0.3, 0.4, 0.4, "Untitled_Folder_2"));
        game.icons.push(new Icon(0.2, 0.25, folder_01, "Untitled_Folder_2", "Untitled_Folder_2", 255, "folder"));
    }

    add_file_day3() {
        //add file here
    }

    add_file_day4() {
        //add file here
    }
}