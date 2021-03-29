import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss'],
})
export class CurrentTrainingComponent implements OnInit {
  @Output() trainingExit = new EventEmitter();
  progress: number = 0;
  timer: number;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.onStartOrResumeTimer();
  }

  onStartOrResumeTimer() {
    this.timer = setInterval(() => {
      this.progress + 26 > 100 ? (this.progress = 100) : (this.progress += 26);
      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  onStop() {
    clearInterval(this.timer);
    this.dialog
      .open(StopTrainingComponent, {
        data: { progress: this.progress },
      })
      .afterClosed()
      .toPromise()
      .then((res) => {
        res ? this.trainingExit.emit() : this.onStartOrResumeTimer();
      });
  }
}
