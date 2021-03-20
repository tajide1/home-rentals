import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-home-search',
  templateUrl: './home-search.component.html',
})
export class HomeSearchComponent implements OnInit {

  @Output() applied = new EventEmitter();
  @Input() defaultSearch !: string;
  form!: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      search:[this.defaultSearch]
    })

      this.form.get('search')?.valueChanges.pipe(
        debounceTime(500)
      ).subscribe(value => {
        this.applied.emit(value);
    })


  }

}
