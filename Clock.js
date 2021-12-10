class Clock extends Application {
    constructor() {
        super(0.425, 0.45, 0.15, 0.1, "Clock");
        this.inGameSeconds;
        this.second = 0;
        this.minute = 0;
        this.hour = 9;
        this.timeString = "";
        this.timeField = new ContentField(this.relX + 0.04, this.relY + 0.03667, 0.09, 0.03, 255, this.instructionText, "string")
    }

    display() {
        //compute time
        super.display();
        //100 times real world time
        this.inGameSeconds = time / 10;
        this.hour = 9 + floor(this.inGameSeconds / 3600);
        this.minute = floor(this.inGameSeconds % 3600 / 60);
        this.second = floor(this.inGameSeconds % 3600 % 60 );

        this.timeString = this.addZero(this.convertHour(this.hour)) + ":" + this.addZero(this.minute) + ":" + this.addZero(this.second) + " " + this.amOrPm(this.hour);
        this.timeField.content = this.timeString;
        //display time
        if(!this.isHidden) {
            textFont(regularFont, height * 0.017);
            textAlign(LEFT, TOP);
            fill(0);
            text("Time:", (this.relX + 0.00375)* width, (this.relY + 0.04) * height);
            this.timeField.display();
        }
    }

    move(dX, dY) {
        super.move(dX, dY);
        this.timeField.move(dX,dY);
    }
    //add zero in front of a number is it is single digit
    addZero(num) {
        if(int(num) < 10) {
          return "0" + num;
        }
        return num;
    }
    //return AM or PM based on the hour
    amOrPm(hour) {
        if(hour < 12) {
            return "AM";
        }
        return "PM";
    }
    //convert 24 hours to 12 hours
    convertHour(hour) {
        if (hour == 12) {
            return hour;
        }
        return hour % 12; 
    }
}