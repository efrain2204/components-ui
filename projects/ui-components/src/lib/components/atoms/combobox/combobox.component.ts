import { NgForOf, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

export interface ComboOption<T = string | number> {
  id: T;
  value: string;
}

@Component({
  selector: 'combobox',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgForOf],
  templateUrl: './combobox.component.html',
  styleUrl: './combobox.component.scss'
})
export class ComboboxComponent<T = string | number> {
  @Input({ required: true }) control!: FormControl<ComboOption<T> | null>;
  @Input({ required: true }) options: ComboOption<T>[] = [];
  @Input() label?: string;
  @Input() placeholder = 'Choose an option';
  @Input() disabled = false;

  compareFn = (a: ComboOption<T>, b: ComboOption<T>) =>
    a && b ? a.id === b.id : a === b;
}
