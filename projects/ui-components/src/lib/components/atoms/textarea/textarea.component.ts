import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, forwardRef, Input, Output, signal } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ui-textarea',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true,
    },
  ],
})
export class TextareaComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() hint: string = '';
  @Input() errorMessage: string = '';
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  /** Número de filas visible inicialmente */
  @Input() rows: number = 4;

  /** Máximo de caracteres (0 = sin límite) */
  @Input() maxLength: number = 0;

  /** Permite al usuario redimensionar */
  @Input() resize: 'none' | 'vertical' | 'both' = 'vertical';

  /** Crece automáticamente con el contenido */
  @Input() autoResize: boolean = false;

  @Output() valueChange = new EventEmitter<string>();

  isFocused = signal(false);
  internalValue = signal('');

  hasError = computed(() => !!this.errorMessage);
  hasValue = computed(() => !!this.internalValue());
  charCount = computed(() => this.internalValue().length);
  isOverLimit = computed(() => this.maxLength > 0 && this.charCount() > this.maxLength);

  private onChange: (value: string) => void = () => { };
  private onTouched: () => void = () => { };

  onFocus(): void { this.isFocused.set(true); }

  onBlur(): void {
    this.isFocused.set(false);
    this.onTouched();
  }

  onInputChange(event: Event): void {
    const el = event.target as HTMLTextAreaElement;
    const value = el.value;
    this.internalValue.set(value);
    this.onChange(value);
    this.valueChange.emit(value);

    if (this.autoResize) {
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
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
}
