import { CommonModule } from '@angular/common';
import { Component, computed, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, signal, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

export interface Currency {
  code: string; // USD, PEN
  symbol: string; // $, S/
  label: string; // Dólar, Sol
  locale: string; // en-US, es-PE
}

export const CURRENCIES: Currency[] = [
  { code: 'PEN', symbol: 'S/', label: 'Sol peruano', locale: 'es-PE' },
  { code: 'USD', symbol: '$', label: 'Dólar', locale: 'en-US' },
];

@Component({
  selector: 'ui-input-currency',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],

  templateUrl: './input-currency.component.html',
  styleUrl: './input-currency.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputCurrencyComponent),
    multi: true
  }]
})
export class InputCurrencyComponent implements ControlValueAccessor, OnInit {
  @Input() label: string = 'Monto';
  @Input() placeholder: string = '0.00';
  @Input() hint: string = '';
  @Input() errorMessage: string = '';
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() currencies: Currency[] = CURRENCIES;
  @Input() defaultCurrency: string = 'PEN'; // ISO code

  /** Mínimo permitido */
  @Input() min: number = 0;

  /** Máximo permitido (0 = sin límite) */
  @Input() max: number = 0;

  /** Decimales a mostrar */
  @Input() decimals: number = 2;

  @Output() amountChange = new EventEmitter<number>();
  @Output() currencyChange = new EventEmitter<Currency>();

  isFocused = signal(false);
  dropdownOpen = signal(false);
  rawValue = signal('');
  selectedCurrency = signal<Currency>(CURRENCIES[0]);

  hasError = computed(() => !!this.errorMessage || !!this.rangeError());
  errorText = computed(() => this.errorMessage || this.rangeError());
  hasValue = computed(() => !!this.rawValue() && this.rawValue() !== '0');

  rangeError = computed(() => {
    const n = this.numericValue();
    if (n === null) return '';
    if (this.min > 0 && n < this.min)
      return `El monto mínimo es ${this.formatDisplay(this.min)}`;
    if (this.max > 0 && n > this.max)
      return `El monto máximo es ${this.formatDisplay(this.max)}`;
    return '';
  });

  numericValue = computed(() => {
    const n = parseFloat(this.rawValue().replace(/,/g, ''));
    return isNaN(n) ? null : n;
  });

  displayValue = computed(() => {
    const n = this.numericValue();
    if (n === null || !this.isFocused()) return this.rawValue();
    return this.rawValue();
  });

  private onChange: (value: number | null) => void = () => { };
  private onTouched: () => void = () => { };

  ngOnInit(): void {
    const found = this.currencies.find(c => c.code === this.defaultCurrency);
    if (found) this.selectedCurrency.set(found);
  }

  // ── Dropdown moneda ───────────────────────────────────────────────────────
  toggleDropdown(): void {
    if (!this.disabled) this.dropdownOpen.update(v => !v);
  }

  selectCurrency(currency: Currency): void {
    this.selectedCurrency.set(currency);
    this.dropdownOpen.set(false);
    this.currencyChange.emit(currency);
  }

  closeDropdown(): void {
    this.dropdownOpen.set(false);
  }

  // ── Input ─────────────────────────────────────────────────────────────────
  onFocus(event: FocusEvent): void {
    this.isFocused.set(true);
    // Muestra valor sin formato al enfocar
    const input = event.target as HTMLInputElement;
    const raw = this.rawValue().replace(/,/g, '');
    input.value = raw === '0' || raw === '' ? '' : raw;
  }

  onBlur(event: FocusEvent): void {
    this.isFocused.set(false);
    this.onTouched();
    // Formatea al perder foco
    const n = this.numericValue();
    if (n !== null) {
      this.rawValue.set(this.formatRaw(n));
    }
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    // Solo permite números, punto y coma
    let val = input.value.replace(/[^0-9.,]/g, '');
    // Permite solo un punto decimal
    const parts = val.split('.');
    if (parts.length > 2) val = parts[0] + '.' + parts.slice(1).join('');
    // Limita decimales
    if (parts[1]?.length > this.decimals) {
      val = parts[0] + '.' + parts[1].slice(0, this.decimals);
    }

    this.rawValue.set(val);
    input.value = val;

    const n = parseFloat(val);
    const emitVal = isNaN(n) ? null : n;
    this.onChange(emitVal);
    if (emitVal !== null) this.amountChange.emit(emitVal);
  }

  // ── Formatters ────────────────────────────────────────────────────────────
  private formatRaw(n: number): string {
    return n.toLocaleString(this.selectedCurrency().locale, {
      minimumFractionDigits: this.decimals,
      maximumFractionDigits: this.decimals,
    });
  }

  formatDisplay(n: number): string {
    return `${this.selectedCurrency().symbol} ${this.formatRaw(n)}`;
  }

  // ── ControlValueAccessor ──────────────────────────────────────────────────
  writeValue(value: number | null): void {
    if (value === null || value === undefined) {
      this.rawValue.set('');
    } else {
      this.rawValue.set(this.formatRaw(value));
    }
  }

  registerOnChange(fn: (value: number | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
