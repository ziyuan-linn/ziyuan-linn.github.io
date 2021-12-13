//main game object
class Game {
    constructor() {
        this.apps = [];
        this.icons = [];
        //keep track of how far the mouse is dragged each frame
        this.mouseDragX = 0;
        this.mouseDragY = 0;
        //mouse start and eng points when dragging
        //this.tx1 = this.tx2 = this.ty1 = this.ty2 = 0.0;
        //if it is the right area to rectangle selection
        //this.rect_select_flag = true;
        //instantiate all the apps 
        this.apps.push(new Folder(0.3, 0.3, 0.4, 0.4, "Recycle Bin"));
        this.apps[this.apps.length - 1].icons.push(new Icon(0.5, 0.5, text_file_01, "00283.txt", "Text - 00283", 0, "app"));
        this.apps.push(new Folder(0.3, 0.3, 0.4, 0.4, "Untitled_Folder"));
        this.apps.push(new WorkApp());
        this.apps.push(new Clock());
        this.apps.push(new TextFile(0.25, 0.2, 0.5, 0.6, "Text - 00283", texts.corruption));
        this.apps.push(new TextFile(0.25, 0.2, 0.5, 0.6, "Text - Rules", texts.rules));


        for (let i = 0; i < this.apps.length; i++) {
            this.apps[i].isHidden = true;
        }

        this.apps.push(new TextFile(0.25, 0.2, 0.5, 0.6, "Text - Introduction", texts.introduction));
        //instantiate all the desktop icons
        this.icons.push(new Icon(0.1, 0.1, recycle_bin_01, "Recycle Bin", "Recycle Bin", 255, "folder"));
        this.icons.push(new Icon(0.1, 0.25, folder_01, "Untitled_Folder", "Untitled_Folder", 255, "folder"));
        this.icons.push(new Icon(0.1, 0.4, work_01, "Work.exe", "Work", 255, "app"));
        this.icons.push(new Icon(0.1, 0.55, text_file_01, "Introduction.txt", "Text - Introduction", 255, "app"));
        this.icons.push(new Icon(0.1, 0.7, text_file_01, "Rules.txt", "Text - Rules", 255, "app"));
        this.icons.push(new Icon(0.1, 0.85, clock_01, "Clock", "Clock", 255, "app"));
    }

    display() {
        background(58, 110, 165);
        //backward for loops to display the first items at the top layer
        for (let i = this.icons.length - 1; i >= 0; i--) {
            this.icons[i].display();
        }

        //call the rectangle selection for the icon
        // for (let i = this.icons.length - 1; i >= 0; i--) {
        //     if (this.rect_select_flag) {
        //         this.icons[i].rect_select(this.tx1, this.ty1, this.tx2, this.ty2);
        //     }
        // }

        for (let i = this.apps.length - 1; i >= 0; i--) {
            this.apps[i].display();
            
        }

    }
    
    //call when mouse is pressed
    pressed() {
        //set the values to calculate how far the mouse moves during drag
        this.mouseDragX = mouseX;
        this.mouseDragY = mouseY;
        let focused = false; //keep track if any of the apps is clicked
        //chang layering of the pages
        for (let i = 0; i < this.apps.length; i++) {
            //if an app is clicked
            if (this.apps[i].isMouseOver() && !this.apps[i].isHidden) {
                focused = true;
                //set the app to being focused
                this.apps[i].isFocused = true;
                //move the focused app to the front of the apps array
                let tempApp = this.apps[i];
                this.apps.splice(i, 1);
                this.apps.splice(0, 0, tempApp);
                //set all other apps' focus status to false
                for (let j = 1; j < this.apps.length; j++) {
                    this.apps[j].isFocused = false;
                }
                break;
            }
        }
        //if no app is clicked
        if (!focused) {
            for (let i = 0; i < this.apps.length; i++) {
                this.apps[i].isFocused = false;
            }
            //change the layering of icons
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
            //send input to the icons if no apps is clicked and icon is clicked
            this.icons[0].pressed();
        }
        //send input to the focused app
        if (!this.apps[0].isHidden) this.apps[0].pressed();

        //decide if it is the area to rectangle selection
        // for (let i = 0; i < this.apps.length; i++) {
        //     if (this.apps[i].isMouseOver(mouseX, mouseY)) {
        //         this.rect_select_flag = false;
        //     }
        // }
        // for (let i = 0; i < this.icons.length; i++) {
        //     if (this.icons[i].isMouseOver(mouseX, mouseY)) {
        //         this.rect_select_flag = false;
        //     }
        // }
    }
    //call when mouse is dragged
    dragged() {
        if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
            //calculate the change in mouse position each frame
            let dX = mouseX - this.mouseDragX;
            let dY = mouseY - this.mouseDragY;

            //send input to the icons
            if (this.icons.length > 0 && this.icons[0].isDraggable) {
                //check if an app is dragged into a folder
                let inFolder = false;
                for (let i = 0; i < this.apps.length; i++) {
                    if (!this.apps[i].isHidden && this.apps[i] instanceof Folder && this.apps[i].field.isMouseOver() && (this.apps[i].title == "Recycle Bin" && this.icons[0].name != "Recycle Bin" || this.icons[0].type != "folder")) {
                        inFolder = true;
                        this.icons[0].textColor = 0;
                        let tempIcon = this.icons[0];
                        this.icons.splice(0, 1);
                        this.apps[i].icons.splice(0, 0, tempIcon);
                        //move the folder to the top of apps array
                        let tempApp = this.apps[i];
                        this.apps.splice(i, 1);
                        this.apps.splice(0, 0, tempApp);
                        this.apps[0].isFocused = true;
                        break;
                    }
                }
                //if the app is not being dragged in a folder, call the normal dragged function
                if (!inFolder) {
                    this.icons[0].dragged(dX, dY);
                }
            }

            //send input to the focused app
            if (!this.apps[0].isHidden) this.apps[0].dragged(dX, dY);
            //update the mouse position for next frame
            this.mouseDragX = mouseX;
            this.mouseDragY = mouseY;
        }
        //update rectangle selection value after dragging the mouse
        // if (this.tx1 == 0.0 && this.ty1 == 0.0) {
        //     this.tx1 = mouseX;
        //     this.ty1 = mouseY;
        // }
        // this.tx2 = mouseX;
        // this.ty2 = mouseY;
    }

    released() {
        //send input to the focused app
        if (!this.apps[0].isHidden) this.apps[0].released();
        //send input to the icons

        for (let i = 1; i < this.icons.length; i++) {
            if (this.icons[i].isMouseOver() && this.icons[i].type == "folder" && (this.icons[i].name == "Recycle Bin" || this.icons[0].type != "folder")) {
                //move the icon into the folder's icons array
                for (let j = 0; j < this.apps.length; j++) {
                    if (this.apps[j].title == this.icons[i].appTitle) {
                        this.icons[0].textColor = 0;
                        let tempIcon = this.icons[0];
                        tempIcon.relX = this.apps[j].relX + 0.1;
                        tempIcon.relY = this.apps[j].relY + 0.1;
                        tempIcon.released();
                        this.icons.splice(0, 1);
                        this.apps[j].icons.splice(0, 0, tempIcon);


                        break;
                    }
                }
                break;
            }
        }
        this.icons[0].released();
        //set rectangle selection back to 0
        //this.tx1 = this.tx2 = this.ty1 = this.ty2 = 0.0;
        //enable rectangle selection when the mouse is released 
        //this.rect_select_flag = true;
    }

    doubleClicked() {
        //send input to the focused app
        if (!this.apps[0].isHidden) this.apps[0].doubleClicked();
        //show the corresponding app when the icon is clicked 
        this.icons[0].doubleClicked();
    }
    //reset the game for the next day
    resetGame() {
        for (let i = 0; i < this.apps.length; i++) {
            this.apps[i].isHidden = true;
            if (this.apps[i] instanceof WorkApp) {

                this.apps[i].resetTask();
            }
        }
        for (let i = 0; i < this.icons.length; i++) {
            this.icons[i].clicked = false;
        }
    }

    //check how many folder icons left on desktop
    // folder_movable() {
    //     let cnt = 0;
    //     for (let i = 0; i < this.icons.length; i++) {
    //         if (this.icons[i].type == "folder") {
    //             cnt++;
    //         }
    //     }
    //     if (cnt > 1) {
    //         return true;
    //     }
    //     return false;
    // }
}