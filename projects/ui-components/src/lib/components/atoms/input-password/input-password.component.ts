import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, forwardRef, Input, Output, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

export interface PasswordStrength {
  score: 0 | 1 | 2 | 3 | 4; // 0=vacío, 1=muy débil, 2=débil, 3=fuerte, 4=muy fuerte
  label: string;
  color: string;
}

@Component({
  selector: 'ui-input-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './input-password.component.html',
  styleUrl: './input-password.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputPasswordComponent),
    multi: true
  }]
})
export class InputPasswordComponent implements ControlValueAccessor {
  @Input() label: string = 'Contraseña';
  @Input() placeholder: string = 'Ingresa tu contraseña';
  @Input() hint: string = '';
  @Input() errorMessage: string = '';
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  /** Muestra barra de fortaleza */
  @Input() showStrength: boolean = false;

  /** Muestra requisitos de la contraseña */
  @Input() showRules: boolean = false;

  /** Mínimo de caracteres */
  @Input() minLength: number = 8;

  @Output() passwordChange = new EventEmitter<string>();

  isFocused = signal(false);
  isVisible = signal(false);
  internalValue = signal('');

  hasError = computed(() => !!this.errorMessage);
  hasValue = computed(() => !!this.internalValue());

  // ── Reglas ────────────────────────────────────────────────────────────────
  rules = computed(() => [
    {
      label: `Mínimo ${this.minLength} caracteres`,
      met: this.internalValue().length >= this.minLength,
    },
    {
      label: 'Al menos una mayúscula',
      met: /[A-Z]/.test(this.internalValue()),
    },
    {
      label: 'Al menos un número',
      met: /[0-9]/.test(this.internalValue()),
    },
    {
      label: 'Al menos un carácter especial',
      met: /[^A-Za-z0-9]/.test(this.internalValue()),
    },
  ]);

  strength = computed<PasswordStrength>(() => {
    const val = this.internalValue();
    if (!val) return { score: 0, label: '', color: '' };

    const metCount = this.rules().filter(r => r.met).length;

    if (metCount <= 1) return { score: 1, label: 'Muy débil', color: '#ef4444' };
    if (metCount === 2) return { score: 2, label: 'Débil', color: '#f97316' };
    if (metCount === 3) return { score: 3, label: 'Fuerte', color: '#eab308' };
    return { score: 4, label: 'Muy fuerte', color: '#16a34a' };
  });

  strengthBars = computed(() =>
    [1, 2, 3, 4].map(i => ({
      active: this.strength().score >= i,
      color: this.strength().color,
    }))
  );

  private onChange: (value: string) => void = () => { };
  private onTouched: () => void = () => { };

  onFocus(): void { this.isFocused.set(true); }

  onBlur(): void {
    this.isFocused.set(false);
    this.onTouched();
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.internalValue.set(value);
    this.onChange(value);
    this.passwordChange.emit(value);
  }

  toggleVisibility(): void {
    this.isVisible.update(v => !v);
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
