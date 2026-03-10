import { CommonModule, NgIf } from '@angular/common';
import { Component, computed, EventEmitter, forwardRef, Input, Output, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ui-input-date',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIf, FormsModule],
  templateUrl: './input-date.component.html',
  styleUrl: './input-date.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDateComponent),
      multi: true,
    },
  ],
})
export class InputDateComponent implements ControlValueAccessor {
  @Input() label: string = 'Fecha';
  @Input() placeholder: string = 'dd/mm/aaaa';
  @Input() hint: string = '';
  @Input() errorMessage: string = '';
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() minDate: string = '';
  @Input() maxDate: string = '';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  @Output() dateChange = new EventEmitter<string>();

  isFocused = signal(false);
  internalValue = signal('');

  hasError = computed(() => !!this.errorMessage);
  hasValue = computed(() => !!this.internalValue());

  private onChange: (value: string) => void = () => { };
  private onTouched: () => void = () => { };

  onFocus(): void {
    this.isFocused.set(true);
  }

  onBlur(): void {
    this.isFocused.set(false);
    this.onTouched();
  }

  onInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.internalValue.set(value);
    this.onChange(value);
    this.dateChange.emit(value);
  }

  writeValue(value: string): void {
    this.internalValue.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
