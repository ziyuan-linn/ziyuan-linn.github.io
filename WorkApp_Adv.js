class WorkApp_Adv extends Application {
    constructor() {
        super(0.15, 0.15, 0.7, 0.7, "Work_Adv");
        this.instructionText = texts.workInstruction;
        this.instruction = new ContentField(this.relX + 0.0025, this.relY + 0.03667, 0.1625, this.relH - 0.04, 255, this.instructionText, "string");
        this.imageGenerator = new ImageGenerator1();
        this.task = new ContentField(this.relX + 0.1675, this.relY + 0.03667, this.relW - 0.17, this.relH - 0.16, 255, this.imageGenerator.generate(), "image");
        this.buttons = [];
        this.selection = -1;
        for (let i = 0; i < 5; i++) {
            this.buttons[i] = new Button(this.relX + 0.1675 + 0.106 * i, this.relY + this.relH - 0.09, 0.106, 0.0233, (i).toString(), () => { });
        }
        for (let i = 5; i < 10; i++) {
            this.buttons[i] = new Button(this.relX + 0.1675 + 0.106 * (i - 5), this.relY + this.relH - 0.0667, 0.106, 0.0233, (i).toString(), () => { });
        }
        this.submitButton = new Button(this.relX + 0.1675 + 0.424, this.relY + this.relH - 0.03, 0.106, 0.0233, "Submit", () => { this.nextTask() });
        this.complete = false;
        this.tasksCompleted = 0;
    }

    display() {
        super.display();
        if (!this.isHidden) {
            this.instruction.display();
            this.task.display();
            for (let i = 0; i < this.buttons.length; i++) {
                this.buttons[i].display();
            }
            this.submitButton.display();
            textFont(regularFont, height * 0.015);
            textAlign(LEFT, CENTER);
            fill(0);
            text("Tasks Completed: " + this.tasksCompleted + "/30", (this.relX + 0.1695) * width, (this.relY + 0.685) * height);
        }

    }

    move(dX, dY) {
        super.move(dX, dY);
        this.instruction.move(dX, dY);
        this.task.move(dX, dY);
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].move(dX, dY);
        }
        this.submitButton.move(dX, dY);
    }

    nextTask() {
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].released();
        }
        //if the anwser is correct
        if (this.selection == this.imageGenerator.mean) {
            this.tasksCompleted++;
            this.instruction.content = texts.workInstruction;
            this.task.content = this.imageGenerator.generate();
        }
        else {
            this.instruction.content = texts.workError + "\n\n" + texts.workInstruction;
        }
        if (this.tasksCompleted >= 30) {
            this.tasksCompleted = 30;
            this.instruction.content = texts.workCompleted;
            this.task.contentType = "string";
            this.task.content = " ";
        }
    }
    //reset the tasks completed when a day ends
    resetTask() {
        this.tasksCompleted = 0;
        this.instruction.content = texts.workInstruction;
        this.task.contentType = "image";
        this.task.content = this.imageGenerator.generate();
    }

    pressed() {
        super.pressed();
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].pressed();
            //only one button can be pressed down each time
            if (this.buttons[i].isPressed) {
                for (let j = 0; j < this.buttons.length; j++) {
                    if (this.buttons[j].isPressed && j != i) {
                        this.buttons[j].isPressed = false;
                    }
                }
                this.selection = i;
            }
        }
        this.submitButton.pressed();
    }

    released() {
        super.released();
        this.submitButton.released();
    }



}