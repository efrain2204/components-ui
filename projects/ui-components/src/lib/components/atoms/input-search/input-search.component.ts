import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, forwardRef, Input, OnDestroy, Output, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ui-input-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './input-search.component.html',
  styleUrl: './input-search.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputSearchComponent),
      multi: true,
    },
  ],
})
export class InputSearchComponent implements ControlValueAccessor, OnDestroy {
  @Input() label: string = '';
  @Input() placeholder: string = 'Buscar...';
  @Input() hint: string = '';
  @Input() errorMessage: string = '';
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  /** Milisegundos de espera tras el último keystroke antes de emitir */
  @Input() debounceTime: number = 400;

  @Output() search = new EventEmitter<string>(); // emite tras debounce
  @Output() valueChange = new EventEmitter<string>(); // emite en cada keystroke

  isFocused = signal(false);
  isLoading = signal(false);
  internalValue = signal('');

  hasError = computed(() => !!this.errorMessage);
  hasValue = computed(() => !!this.internalValue());

  private debounceTimer: ReturnType<typeof setTimeout> | null = null;
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
    this.valueChange.emit(value);

    // Inicia loading y reinicia el timer
    this.isLoading.set(true);
    this.clearTimer();

    this.debounceTimer = setTimeout(() => {
      this.isLoading.set(false);
      this.search.emit(value);
    }, this.debounceTime);
  }

  clear(): void {
    this.internalValue.set('');
    this.onChange('');
    this.valueChange.emit('');
    this.search.emit('');
    this.isLoading.set(false);
    this.clearTimer();
  }

  private clearTimer(): void {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = null;
    }
  }

  // ── ControlValueAccessor ──────────────────────────────────────────────────
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

  ngOnDestroy(): void {
    this.clearTimer();
  }
}
