import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {
  @Input() rating: number;
  @Output() ratingChange: EventEmitter<number> = new EventEmitter();

  constructor() { }
  rate(index: number) {
    this.rating = index;
    this.ratingChange.emit(this.rating);
  }


getColor(index: number) {
  if(this.isAboveRating(index)){
    return  '#E0E0E0';
  }
  switch(this.rating){
    case 1:
      return '#FFCA28';
    case 2:
      return '#FFCA28';
    case 3:
      return  '#FFCA28';
    case 4:
      return '#FFCA28';
    case 5:
      return '#FFCA28';
    default:
      return '#E0E0E0';
  }
}

isAboveRating(index: number): boolean {
  return index > this.rating;
}

ngOnInit() { }

}
