import {Component, OnInit, Input, OnChanges} from '@angular/core';

@Component({
    selector: 'circle-progress',
    templateUrl: 'progress-bar.component.html',
})
export class ProgressBarComponent implements OnInit, OnChanges {

    @Input() percent = 0;
    @Input() boxSize = 200;
    @Input() radius = 0.9 * this.boxSize ;
    @Input() time = 0;
    @Input() border = 20;
    @Input() color = 'none';
    @Input() backgroundColor = 'white';

    @Input() lowColor = this.color;
    @Input() middleColor = this.color;
    @Input() interColor = this.color;
    @Input() highColor = this.color;

    @Input() fontColor = 'black';
    @Input() fontSize = 12;
    @Input() fontFamily = 'OpenSans-Semibold';
    @Input() fontX = '50%';
    @Input() fontY = '55%';

    @Input() innerFill = '#ffffff';
    @Input() textAnchor = 'middle';

    @Input() caption = 'your text';


    angle: number;
    radian: number;
    cx: number;
    cy: number;

    x0: number;
    y0: number;
    rx: number;
    ry: number;

    innerRadius: number;
    // circleText '0%';
    circleText = '0';

    x;
    y;

    arcSweep;
    circleM;
    circleL;
    circleA;
    circleEnd;



    canAnimate = true;

    ngOnInit() {
        this.setInputs();
        this.calculateAll();
        this.animate();
    }

    ngOnChanges() {
        this.setInputs();
        this.calculateAll();
        this.animate();
    }

  public setInputs() {

        if (this.percent < 0) {
            this.percent *= -1;
        }

        if (this.time === 0) {
            // this.circleText = this.percent+'%';
            this.circleText = this.percent + '';
            this.setColor(this.percent);
            this.angle = this.percToAngle(this.percent);
        }else {
            this.angle = 0;
        }

        this.radian = this.angleToRad(this.angle);

        this.cx = this.boxSize / 2;
        this.cy = this.boxSize / 2;


        this.x0 = this.cx;
        this.y0 = this.cy - this.radius;

        this.rx = this.ry = this.radius;

        this.innerRadius = this.radius - this.border;

    }

  public calculateAll() {
        this.calculateAngle(this.radius, this.radian);
        this.setArcSet(this.angle);
        this.circleM = this.createArgument('M', this.cx, this.cy);
        this.circleL = this.createArgument('L', this.x0, this.y0);
        this.circleA = this.createArgument('A', this.rx, this.ry);
    }

  public calculateAngle(r, rad) {
        this.x = this.cx + r * Math.sin(rad);
        this.y = this.cy - r * Math.cos(rad);

        if (this.percent === 100) {
            this.x--;
        }

        this.circleEnd = this.createArgument(null, this.x, this.y);
    }

  public setArcSet(angle) {
        if (Math.round(angle) <= 180) {
            this.arcSweep = this.createArgument(null, 0, 1);
        } else if (Math.round(angle) > 180) {
            this.arcSweep = this.createArgument(null, 1, 1);
        }
    }

  public createArgument(prefix: string, val1: number, val2: number) {

        if (prefix != null) {
            return prefix + val1 + ',' + val2 + ' ';
        } else {
            return val1 + ',' + val2 + ' ';
        }

    }

  public percToAngle(perc: number) {
        return perc * 3.6;
    }


  public angleToRad(angle) {
        return (angle * Math.PI) / 180;
    }

    public animate() {
        if (this.canAnimate) {
            this.canAnimate = false;
            let time = this.time * 10 / this.percent;

            this.animationLoop(1, time);

        }else {
            return;
        }

    }


  public animationLoop(i, time) {
        setTimeout(() => {
            this.angle = this.percToAngle(i);
            this.radian = this.angleToRad(this.angle);
            this.setArcSet(this.angle);
            this.setColor(i);
            // this.circleText = i + '%';
            this.circleText = i + '';
            this.calculateAngle(this.radius, this.radian);
            i++;
            if (i <= this.percent) {
                this.animationLoop(i, time);
            }
        }, time);
        if (i >= this.percent) {
            this.canAnimate = true;
        }
    }

    public setColor(percent) {
        if (percent <= 25) {
            this.color = this.lowColor;
        }else if (percent <= 50) {
            this.color = this.middleColor;
        }else if (percent <= 75) {
            this.color = this.interColor;
        }else if (percent > 75) {
            this.color = this.highColor;
        }
    }
}
