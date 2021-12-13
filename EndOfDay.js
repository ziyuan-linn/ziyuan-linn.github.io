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
            let tasks_done = 0;
            let tasks_done_day3 = 0;
            let tasks_done_day4 = 0;
            for (let i = 0; i < game.apps.length; i++) {
                //day 2
                if (game.apps[i] instanceof WorkApp && (days == 1)) {
                    this.add_file_day2();
                }
                //day 3
                //finish 15 tasks
                if (game.apps[i] instanceof WorkApp && (game.apps[i].tasksCompleted > 0) && (days == 2)) {
                    tasks_done = game.apps[i].tasksCompleted;
                    this.add_file_day3();
                }
                if (game.apps[i].title == "Subject 00100(2)" && (tasks_done > 0) && (days == 2)) {
                    game.apps.push(new TextFile(0.25, 0.2, 0.5, 0.6, "Day_3_finish_15_tasks", texts.Day_3_finish_15_tasks));
                    game.apps[i].icons.push(new Icon(0.6, 0.4, frog_file_01, "Day_3_Update", "Day_3_finish_15_tasks", 0, "app"));
                }
                //not finish 15 tasks
                if (game.apps[i].title == "Subject 00100(2)" && (tasks_done == 0) && (days == 2)) {
                    game.apps.push(new TextFile(0.25, 0.2, 0.5, 0.6, "Day_3_finish_no_tasks", texts.Day_3_finish_no_tasks));
                    game.apps[i].icons.push(new Icon(0.6, 0.4, frog_file_01, "Day_3_Update", "Day_3_finish_no_tasks", 0, "app"));
                }
                //find the folder in the application arry and call the contains function
                if (game.apps[i].title == "Subject 00100(2)" && (game.apps[i].contains("Subject_004.txt")
                    && game.apps[i].contains("S.E.U_Intro_001.txt")
                    && game.apps[i].contains("S.E.U_Intro_006.txt")
                    && !game.apps[i].contains("File_S"))) {
                    game.apps.push(new TextFile(0.25, 0.2, 0.5, 0.6, "File_S", texts.secretFile_S));
                    game.apps[i].icons.push(new Icon(0.45, 0.4, text_file_S, "File_S", "File_S", 0, "app"));
                }
                if (game.apps[i].title == "Subject 00100(2)" && (game.apps[i].contains("Subject_008.txt")
                    && game.apps[i].contains("S.E.U_Intro_010.txt")
                    && !game.apps[i].contains("File_E"))) {
                    game.apps.push(new TextFile(0.25, 0.2, 0.5, 0.6, "File_E", texts.secretFile_E));
                    game.apps[i].icons.push(new Icon(0.45, 0.55, text_file_E, "File_E", "File_E", 0, "app"));
                }
                if (game.apps[i].title == "Subject 00100(2)" && (game.apps[i].contains("Subject_015.txt")
                    && game.apps[i].contains("S.E.U_Intro_018.txt")
                    && !game.apps[i].contains("File_U"))) {
                    game.apps.push(new TextFile(0.25, 0.2, 0.5, 0.6, "File_U", texts.secretFile_U));
                    game.apps[i].icons.push(new Icon(0.45, 0.55, text_file_U, "File_U", "File_U", 0, "app"));
                }
                if (game.apps[i].title == "Subject 00100(2)" && (game.apps[i].contains("File_S")
                    && game.apps[i].contains("File_E")
                    && game.apps[i].contains("File_U"))) {
                    game.apps.push(new TextFile(0.25, 0.2, 0.5, 0.6, "Day_5_finish_30_tasks", texts.Day_5_finish_30_tasks));
                    game.apps[i].icons.push(new Icon(0.55, 0.6, frog_file_01, "Day_5_Update", "Day_5_finish_30_tasks", 0, "app"));
                }

                //day 4
                //finish 15 tasks
                if (game.apps[i] instanceof WorkApp && (game.apps[i].tasksCompleted > 0) && (days == 3)) {
                    tasks_done_day3 = game.apps[i].tasksCompleted;
                    this.add_file_day4();
                }
                if (game.apps[i].title == "Subject 00100(2)" && (tasks_done_day3 > 0) && (days == 3)) {
                    game.apps.push(new TextFile(0.25, 0.2, 0.5, 0.6, "Day_4_finish_15_tasks", texts.Day_3_finish_15_tasks));
                    game.apps[i].icons.push(new Icon(0.4, 0.6, frog_file_01, "Day_4_Update", "Day_4_finish_15_tasks", 0, "app"));
                }
                //work to work_adv
                if (game.apps[i] instanceof WorkApp && (days == 3)) {
                    game.apps[i] = new WorkApp_Adv();
                    for (let j = 0; j < game.icons.length; j++) {
                        if (game.icons[j].appTitle == "Work") {
                            game.icons[j] = new Icon(0.1, 0.4, work_adv_1, "Work_Adv.exe", "Work_Adv", 255, "app");
                        }
                    }
                }
                //day 5
                if (game.apps[i] instanceof WorkApp_Adv && (days == 4)) {
                    tasks_done_day4 = game.apps[i].tasksCompleted;
                    this.add_file_day5();
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

        game.apps.push(new TextFile(0.25, 0.2, 0.5, 0.6, "Message_Day_2", texts.Day_2_Message));
        game.icons.push(new Icon(0.85, 0.1, message_01, "Message_Day_2", "Message_Day_2", 255, "app"));

        game.apps.push(new TextFile(0.25, 0.2, 0.5, 0.6, "Listen to me", texts.Frog_intro));

        game.apps.push(new Folder(0.3, 0.3, 0.4, 0.4, "Subject 00100(2)"));
        game.icons.push(new Icon(0.85, 0.85, frog_01, "LOOK AT ME!!!", "Subject 00100(2)", 255, "folder"));

        game.apps[game.apps.length - 1].icons.push(new Icon(0.35, 0.4, frog_file_01, "Listen_to_me", "Listen to me", 0, "app"));
    }

    add_file_day3() {
        game.apps.push(new TextFile(0.25, 0.2, 0.5, 0.6, "Subject 007", texts.no_access));
        game.apps.push(new TextFile(0.25, 0.2, 0.5, 0.6, "Subject 008", texts.subject_008));
        game.apps.push(new TextFile(0.25, 0.2, 0.5, 0.6, "Subject 009", texts.no_access));
        game.apps.push(new TextFile(0.25, 0.2, 0.5, 0.6, "Subject 010", texts.no_access));
        game.apps.push(new TextFile(0.25, 0.2, 0.5, 0.6, "Subject 011", texts.no_access));
        game.apps.push(new TextFile(0.25, 0.2, 0.5, 0.6, "Subject 012", texts.no_access));
        game.apps.push(new TextFile(0.25, 0.2, 0.5, 0.6, "S.E.U Intro 007", texts.no_access));
        game.apps.push(new TextFile(0.25, 0.2, 0.5, 0.6, "S.E.U Intro 008", texts.no_access));
        game.apps.push(new TextFile(0.25, 0.2, 0.5, 0.6, "S.E.U Intro 009", texts.no_access));
        game.apps.push(new TextFile(0.25, 0.2, 0.5, 0.6, "S.E.U Intro 010", texts.SEU_intro_010));
        game.apps.push(new TextFile(0.25, 0.2, 0.5, 0.6, "S.E.U Intro 011", texts.no_access));
        game.apps.push(new TextFile(0.25, 0.2, 0.5, 0.6, "S.E.U Intro 012", texts.no_access));

        game.icons.push(new Icon(0.4, 0.7, text_file_01, "Subject_007.txt", "Subject 007", 255, "app"));
        game.icons.push(new Icon(0.5, 0.25, text_file_01, "Subject_008.txt", "Subject 008", 255, "app"));
        game.icons.push(new Icon(0.5, 0.4, text_file_01, "Subject_009.txt", "Subject 009", 255, "app"));
        game.icons.push(new Icon(0.2, 0.85, text_file_01, "Subject_010.txt", "Subject 010", 255, "app"));
        game.icons.push(new Icon(0.6, 0.1, text_file_01, "Subject_011.txt", "Subject 011", 255, "app"));
        game.icons.push(new Icon(0.45, 0.55, text_file_01, "Subject_012.txt", "Subject 012", 255, "app"));
        game.icons.push(new Icon(0.45, 0.85, text_file_01, "S.E.U_Intro_007.txt", "S.E.U Intro 007", 255, "app"));
        game.icons.push(new Icon(0.6, 0.7, text_file_01, "S.E.U_Intro_008.txt", "S.E.U Intro 008", 255, "app"));
        game.icons.push(new Icon(0.3, 0.25, text_file_01, "S.E.U_Intro_009.txt", "S.E.U Intro 009", 255, "app"));
        game.icons.push(new Icon(0.2, 0.4, text_file_01, "S.E.U_Intro_010.txt", "S.E.U Intro 010", 255, "app"));
        game.icons.push(new Icon(0.25, 0.55, text_file_01, "S.E.U_Intro_011.txt", "S.E.U Intro 011", 255, "app"));
        game.icons.push(new Icon(0.35, 0.1, text_file_01, "S.E.U_Intro_012.txt", "S.E.U Intro 012", 255, "app"));

        game.apps.push(new TextFile(0.25, 0.2, 0.5, 0.6, "Message_Day_3", texts.Day_3_Message));
        game.icons.push(new Icon(0.7, 0.1, message_01, "Message_Day_3", "Message_Day_3", 255, "app"));
    }

    add_file_day4() {
        game.apps.push(new TextFile(0.25, 0.2, 0.5, 0.6, "Subject 013", texts.no_access));
        game.apps.push(new TextFile(0.25, 0.2, 0.5, 0.6, "Subject 014", texts.no_access));
        game.apps.push(new TextFile(0.25, 0.2, 0.5, 0.6, "Subject 015", texts.subject_015));
        game.apps.push(new TextFile(0.25, 0.2, 0.5, 0.6, "Subject 016", texts.no_access));
        game.apps.push(new TextFile(0.25, 0.2, 0.5, 0.6, "Subject 017", texts.no_access));
        game.apps.push(new TextFile(0.25, 0.2, 0.5, 0.6, "Subject 018", texts.no_access));
        game.apps.push(new TextFile(0.25, 0.2, 0.5, 0.6, "S.E.U Intro 013", texts.no_access));
        game.apps.push(new TextFile(0.25, 0.2, 0.5, 0.6, "S.E.U Intro 014", texts.no_access));
        game.apps.push(new TextFile(0.25, 0.2, 0.5, 0.6, "S.E.U Intro 015", texts.no_access));
        game.apps.push(new TextFile(0.25, 0.2, 0.5, 0.6, "S.E.U Intro 016", texts.no_access));
        game.apps.push(new TextFile(0.25, 0.2, 0.5, 0.6, "S.E.U Intro 017", texts.no_access));
        game.apps.push(new TextFile(0.25, 0.2, 0.5, 0.6, "S.E.U Intro 018", texts.projectEden));

        game.icons.push(new Icon(0.5, 0.7, text_file_01, "Subject_013.txt", "Subject 013", 255, "app"));
        game.icons.push(new Icon(0.35, 0.25, text_file_01, "Subject_014.txt", "Subject 014", 255, "app"));
        game.icons.push(new Icon(0.2, 0.4, text_file_01, "Subject_015.txt", "Subject 015", 255, "app"));
        game.icons.push(new Icon(0.6, 0.85, text_file_01, "Subject_016.txt", "Subject 016", 255, "app"));
        game.icons.push(new Icon(0.6, 0.1, text_file_01, "Subject_017.txt", "Subject 017", 255, "app"));
        game.icons.push(new Icon(0.45, 0.55, text_file_01, "Subject_018.txt", "Subject 018", 255, "app"));
        game.icons.push(new Icon(0.25, 0.85, text_file_01, "S.E.U_Intro_013.txt", "S.E.U Intro 013", 255, "app"));
        game.icons.push(new Icon(0.25, 0.7, text_file_01, "S.E.U_Intro_014.txt", "S.E.U Intro 014", 255, "app"));
        game.icons.push(new Icon(0.6, 0.25, text_file_01, "S.E.U_Intro_015.txt", "S.E.U Intro 015", 255, "app"));
        game.icons.push(new Icon(0.4, 0.4, text_file_01, "S.E.U_Intro_016.txt", "S.E.U Intro 016", 255, "app"));
        game.icons.push(new Icon(0.25, 0.55, text_file_01, "S.E.U_Intro_017.txt", "S.E.U Intro 017", 255, "app"));
        game.icons.push(new Icon(0.35, 0.1, text_file_01, "S.E.U_Intro_018.txt", "S.E.U Intro 018", 255, "app"));

        game.apps.push(new TextFile(0.25, 0.2, 0.5, 0.6, "Message_Day_4", texts.Day_3_Message));
        game.icons.push(new Icon(0.7, 0.25, message_01, "Message_Day_4", "Message_Day_4", 255, "app"));
    }

    add_file_day5() {
        game.apps.push(new TextFile(0.25, 0.2, 0.5, 0.6, "Subject 000", texts.subject_000));
        game.icons.push(new Icon(0.6, 0.5, text_file_01, "Subject_000.txt", "Subject 000", 255, "app"));

        game.apps.push(new TextFile(0.25, 0.2, 0.5, 0.6, "Message_Day_5", texts.Day_5_Message));
        game.icons.push(new Icon(0.7, 0.4, message_01, "Message_Day_5", "Message_Day_5", 255, "app"));
    }
}