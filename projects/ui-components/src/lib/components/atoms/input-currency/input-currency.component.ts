import { Component, ElementRef, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'input-currency',
  standalone: true,
  imports: [],
  templateUrl: './input-currency.component.html',
  styleUrl: './input-currency.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputCurrencyComponent),
    multi: true
  }]
})
export class InputCurrencyComponent implements ControlValueAccessor {
  @Input() currencySymbol = 'S/';
  @Input() placeholder = '0.00';

  private _value: number | null = null;
  displayValue = '';
  disabled = false;

  onChange = (value: number | null) => {};
  onTouched = () => {};

  writeValue(value: number | null): void {
    this._value = value;
    this.displayValue = this.format(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // 🔒 BLOQUEA TECLAS INVÁLIDAS
  onKeyDown(event: KeyboardEvent) {
    const allowedKeys = [
      'Backspace',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'Delete'
    ];

    if (allowedKeys.includes(event.key)) return;

    const isNumber = /^[0-9]$/.test(event.key);
    const isDot = event.key === '.';

    if (!isNumber && !isDot) {
      event.preventDefault();
    }

    // Evitar múltiples puntos
    if (isDot && this.displayValue.includes('.')) {
      event.preventDefault();
    }
  }

  // 🧼 Sanitiza entrada
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let raw = input.value.replace(/[^0-9.]/g, '');

    const parts = raw.split('.');
    if (parts.length > 2) {
      raw = parts[0] + '.' + parts[1];
    }

    this.displayValue = raw;

    const numeric = parseFloat(raw);
    this._value = !isNaN(numeric) ? numeric : null;

    this.onChange(this._value);
  }

  // 📋 Controlar pegado
  onPaste(event: ClipboardEvent) {
    const pasteData = event.clipboardData?.getData('text') || '';
    if (!/^\d*\.?\d*$/.test(pasteData)) {
      event.preventDefault();
    }
  }

  onBlur() {
    this.displayValue = this.format(this._value);
    this.onTouched();
  }

  private format(value: number | null): string {
    if (value === null) return '';
    return value.toLocaleString('es-PE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
}
