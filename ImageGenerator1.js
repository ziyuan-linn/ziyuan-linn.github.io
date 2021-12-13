class ImageGenerator1 {
    //generates a graph using normal distribution
    constructor() {
        this.mean = 0;
    }

    generate() {
        let generatedImage;
        let meanVal = 0;
        let sketch = function(p) {
            p.setup = function() {
                let canvas = p.createCanvas(800, 800);
                canvas.hide();
                p.background(154, 239, 255);
                p.strokeWeight(0.3);
                p.textSize(28);
                p.textAlign(CENTER, CENTER);
                for(let i = 0; i < 10; i++) {
                    p.text(i, 40 + 80 * i, p.height * 0.95);
                }
                for(let i = 1; i < 10; i++) {
                    p.line(i * 80, 0, i * 80, p.height);
                }
                p.strokeWeight(2);
                meanVal = p.int(p.random(0, 10));
                let center = meanVal * 80 + 40;
                for(let i = 0; i < 2000; i++) {
                    let x = p.randomGaussian(center, 80);
                    let y = p.randomGaussian(400, 140);
                    p.point(x, y);
                }
                generatedImage = p.get();
            }
        }
        
        let generator = new p5(sketch);
        this.mean = meanVal;
        return generatedImage;
    }
}