import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, forwardRef, Input, Output, signal } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

export interface RadioOption {
  value: string | number;
  label: string;
  hint?: string;
  disabled?: boolean;
}

@Component({
  selector: 'ui-radio-group',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './radio-group.component.html',
  styleUrl: './radio-group.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroupComponent),
      multi: true,
    },
  ],
})
export class RadioGroupComponent {
  @Input() label: string = '';
  @Input() hint: string = '';
  @Input() errorMessage: string = '';
  @Input() options: RadioOption[] = [];
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() direction: 'vertical' | 'horizontal' = 'vertical';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  @Output() optionChange = new EventEmitter<string | number>();

  focusedValue = signal<string | number | null>(null);
  selectedValue = signal<string | number | null>(null);

  hasError = computed(() => !!this.errorMessage);

  private onChange: (value: string | number | null) => void = () => { };
  private onTouched: () => void = () => { };

  isSelected(option: RadioOption): boolean {
    return this.selectedValue() === option.value;
  }

  isDisabled(option: RadioOption): boolean {
    return this.disabled || !!option.disabled;
  }

  select(option: RadioOption): void {
    if (this.isDisabled(option)) return;
    this.selectedValue.set(option.value);
    this.onChange(option.value);
    this.onTouched();
    this.optionChange.emit(option.value);
  }

  onFocus(value: string | number): void {
    this.focusedValue.set(value);
  }

  onBlur(): void {
    this.focusedValue.set(null);
    this.onTouched();
  }

  onKeydown(event: KeyboardEvent, option: RadioOption, index: number): void {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.select(option);
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault();
      this.focusNext(index, 1);
    }
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault();
      this.focusNext(index, -1);
    }
  }

  private focusNext(currentIndex: number, direction: 1 | -1): void {
    const enabledOptions = this.options
      .map((o, i) => ({ o, i }))
      .filter(({ o }) => !this.isDisabled(o));

    const currentEnabled = enabledOptions.findIndex(({ i }) => i === currentIndex);
    const nextEnabled = enabledOptions[(currentEnabled + direction + enabledOptions.length) % enabledOptions.length];

    if (nextEnabled) {
      const el = document.querySelector<HTMLElement>(
        `[data-radio-index="${nextEnabled.i}"]`
      );
      el?.focus();
      this.select(nextEnabled.o);
    }
  }

  // ── ControlValueAccessor ──────────────────────────────────────────────────
  writeValue(value: string | number | null): void {
    this.selectedValue.set(value ?? null);
  }

  registerOnChange(fn: (value: string | number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
