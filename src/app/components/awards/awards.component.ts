import {Component, Input} from '@angular/core';
import {Award} from '../../models/AwardInterface';
import {TranslatePipe} from '../../../services/translate_pipe';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.css'],
  imports: [
    TranslatePipe,
    NgForOf
  ]
})
export class AwardsComponent {
  @Input() awards: Award[] = [];
}
