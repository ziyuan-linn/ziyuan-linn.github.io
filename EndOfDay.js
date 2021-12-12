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
                if (game.apps[i] instanceof WorkApp && (days == 1)) {
                    this.add_file_day2();
                }
                if (game.apps[i] instanceof WorkApp && (days == 2)) {
                    let task_cnt = game.apps[i].tasksCompleted;
                    this.add_file_day3(task_cnt);
                }
                //find the folder in the application arry and call the contains function
                if(game.apps[i].title == "Untitled_Folder" && game.apps[i].contains("Work.exe")) {
                    console.log("Work.exe is in Untitled_Folder");
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
        game.apps.push(new TextFile(0.25, 0.2, 0.5, 0.6, "Subject 001", texts.no_access));
        game.apps.push(new TextFile(0.25, 0.2, 0.5, 0.6, "Subject 002", texts.no_access));
        game.apps.push(new TextFile(0.25, 0.2, 0.5, 0.6, "Subject 003", texts.no_access));
        game.apps.push(new TextFile(0.25, 0.2, 0.5, 0.6, "Subject 004", texts.subject_004));
        game.apps.push(new TextFile(0.25, 0.2, 0.5, 0.6, "Subject 005", texts.missing_data));
        game.apps.push(new TextFile(0.25, 0.2, 0.5, 0.6, "Subject 006", texts.missing_data));
        game.apps.push(new TextFile(0.25, 0.2, 0.5, 0.6, "S.E.U Intro 001", texts.SEU_intro_001));
        game.apps.push(new TextFile(0.25, 0.2, 0.5, 0.6, "S.E.U Intro 002", texts.no_access));
        game.apps.push(new TextFile(0.25, 0.2, 0.5, 0.6, "S.E.U Intro 003", texts.no_access));
        game.apps.push(new TextFile(0.25, 0.2, 0.5, 0.6, "S.E.U Intro 004", texts.no_access));
        game.apps.push(new TextFile(0.25, 0.2, 0.5, 0.6, "S.E.U Intro 005", texts.no_access));
        game.apps.push(new TextFile(0.25, 0.2, 0.5, 0.6, "S.E.U Intro 006", texts.SEU_intro_006));


        game.icons.push(new Icon(0.5, 0.7, text_file_01, "Subject_001.txt", "Subject 001", 255, "app"));
        game.icons.push(new Icon(0.45, 0.25, text_file_01, "Subject_002.txt", "Subject 002", 255, "app"));
        game.icons.push(new Icon(0.2, 0.4, text_file_01, "Subject_003.txt", "Subject 003", 255, "app"));
        game.icons.push(new Icon(0.45, 0.85, text_file_01, "Subject_004.txt", "Subject 004", 255, "app"));
        game.icons.push(new Icon(0.55, 0.1, text_file_01, "Subject_005.txt", "Subject 005", 255, "app"));
        game.icons.push(new Icon(0.45, 0.55, text_file_01, "Subject_006.txt", "Subject 006", 255, "app"));
        game.icons.push(new Icon(0.3, 0.85, text_file_01, "S.E.U_Intro_001.txt", "S.E.U Intro 001", 255, "app"));
        game.icons.push(new Icon(0.4, 0.7, text_file_01, "S.E.U_Intro_002.txt", "S.E.U Intro 002", 255, "app"));
        game.icons.push(new Icon(0.25, 0.25, text_file_01, "S.E.U_Intro_003.txt", "S.E.U Intro 003", 255, "app"));
        game.icons.push(new Icon(0.45, 0.4, text_file_01, "S.E.U_Intro_004.txt", "S.E.U Intro 004", 255, "app"));
        game.icons.push(new Icon(0.25, 0.55, text_file_01, "S.E.U_Intro_005.txt", "S.E.U Intro 005", 255, "app"));
        game.icons.push(new Icon(0.2, 0.1, text_file_01, "S.E.U_Intro_006.txt", "S.E.U Intro 006", 255, "app"));

        game.apps.push(new Folder(0.3, 0.3, 0.4, 0.4, "Subject"));
        game.apps.push(new Folder(0.3, 0.3, 0.4, 0.4, "S.E.U Intro"));
        game.icons.push(new Icon(0.85, 0.25, folder_01, "Subject", "Subject", 255, "folder"));
        game.icons.push(new Icon(0.85, 0.4, folder_01, "S.E.U Intro", "S.E.U Intro", 255, "folder"));

        game.apps.push(new TextFile(0.25, 0.2, 0.5, 0.6, "Message", texts.Day_2_Message));
        game.icons.push(new Icon(0.85, 0.1, message_01, "Message", "Message", 255, "app"));

        game.apps.push(new TextFile(0.25, 0.2, 0.5, 0.6, "Listen to me", texts.Frog_intro));

        game.apps.push(new Folder(0.3, 0.3, 0.4, 0.4, "Subject 00100(2)"));
        game.icons.push(new Icon(0.85, 0.85, frog_01, "LOOK AT ME!!!", "Subject 00100(2)", 255, "folder"));

        game.apps[game.apps.length - 1].icons.push(new Icon(0.35, 0.4, frog_file_01, "Listen_to_me", "Listen to me", 0, "app"));
    }

    add_file_day3() {

        //add file here
    }

    add_file_day4() {
        //add file here
    }
}