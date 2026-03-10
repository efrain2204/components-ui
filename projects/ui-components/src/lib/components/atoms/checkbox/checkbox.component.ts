import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, forwardRef, Input, Output, signal } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ui-checkbox',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent {
  @Input() label: string = '';
  @Input() hint: string = '';
  @Input() errorMessage: string = '';
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() indeterminate: boolean = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  @Output() checkedChange = new EventEmitter<boolean>();

  isFocused = signal(false);
  isChecked = signal(false);

  hasError = computed(() => !!this.errorMessage);

  private onChange: (value: boolean) => void = () => { };
  private onTouched: () => void = () => { };

  onFocus(): void { this.isFocused.set(true); }

  onBlur(): void {
    this.isFocused.set(false);
    this.onTouched();
  }

  toggle(): void {
    if (this.disabled) return;
    const next = !this.isChecked();
    this.isChecked.set(next);
    this.indeterminate = false;
    this.onChange(next);
    this.checkedChange.emit(next);
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.toggle();
    }
  }

  // ── ControlValueAccessor ──────────────────────────────────────────────────
  writeValue(value: boolean): void {
    this.isChecked.set(!!value);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
