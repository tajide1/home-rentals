import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home-type-filter',
  templateUrl: './home-type-filter.component.html'
})
export class HomeTypeFilterComponent implements OnInit {


  @Input() defaultFilters:string[] = []
  @Output() applied = new EventEmitter();
  form!: FormGroup;
  constructor(private fb: FormBuilder) { }


  ngOnInit(): void {
    this.form = this.fb.group({
      Apartment: [this.defaultFilters.includes('Apartment')],
      Room: [this.defaultFilters.includes('Room')],
      House: [this.defaultFilters.includes('House')]
    })
  }


  submit(formValue:any) {
    console.log(formValue);
    const homeTypes = Object.keys(formValue).filter(item =>
      formValue[item]
    )
    this.applied.emit(homeTypes);
  }
}
