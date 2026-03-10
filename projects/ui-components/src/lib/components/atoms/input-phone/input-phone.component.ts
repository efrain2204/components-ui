import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, forwardRef, Input, Output, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

export interface PhoneCountry {
  code: string;   // +52
  iso: string;   // MX
  flag: string;   // 🇲🇽
  name: string;   // México
}

export const PHONE_COUNTRIES: PhoneCountry[] = [
  { code: '+52', iso: 'MX', flag: '🇲🇽', name: 'México' },
  { code: '+1', iso: 'US', flag: '🇺🇸', name: 'Estados Unidos' },
  { code: '+1', iso: 'CA', flag: '🇨🇦', name: 'Canadá' },
  { code: '+54', iso: 'AR', flag: '🇦🇷', name: 'Argentina' },
  { code: '+55', iso: 'BR', flag: '🇧🇷', name: 'Brasil' },
  { code: '+56', iso: 'CL', flag: '🇨🇱', name: 'Chile' },
  { code: '+57', iso: 'CO', flag: '🇨🇴', name: 'Colombia' },
  { code: '+51', iso: 'PE', flag: '🇵🇪', name: 'Perú' },
  { code: '+34', iso: 'ES', flag: '🇪🇸', name: 'España' },
  { code: '+44', iso: 'GB', flag: '🇬🇧', name: 'Reino Unido' },
];

@Component({
  selector: 'ui-input-phone',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './input-phone.component.html',
  styleUrl: './input-phone.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputPhoneComponent),
      multi: true,
    },
  ],
})
export class InputPhoneComponent implements ControlValueAccessor{
  @Input() label: string = 'Teléfono';
  @Input() placeholder: string = '55 1234 5678';
  @Input() hint: string = '';
  @Input() errorMessage: string = '';
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() countries: PhoneCountry[] = PHONE_COUNTRIES;
  @Input() defaultCountryIso: string = 'MX';

  @Output() phoneChange = new EventEmitter<string>();

  isFocused = signal(false);
  dropdownOpen = signal(false);
  phoneNumber = signal('');
  selectedCountry = signal<PhoneCountry>(PHONE_COUNTRIES[0]);

  hasError = computed(() => !!this.errorMessage);
  hasValue = computed(() => !!this.phoneNumber());

  fullValue = computed(() =>
    `${this.selectedCountry().code}${this.phoneNumber()}`
  );

  private onChange: (value: string) => void = () => { };
  private onTouched: () => void = () => { };

  ngOnInit(): void {
    const country = this.countries.find(c => c.iso === this.defaultCountryIso);
    if (country) this.selectedCountry.set(country);
  }

  onFocus(): void {
    this.isFocused.set(true);
  }

  onBlur(): void {
    this.isFocused.set(false);
    this.onTouched();
  }

  onInputChange(event: Event): void {
    const raw = (event.target as HTMLInputElement).value.replace(/\D/g, '');
    this.phoneNumber.set(raw);
    this.emitValue();
  }

  toggleDropdown(): void {
    if (!this.disabled) this.dropdownOpen.update(v => !v);
  }

  selectCountry(country: PhoneCountry): void {
    this.selectedCountry.set(country);
    this.dropdownOpen.set(false);
    this.emitValue();
  }

  closeDropdown(): void {
    this.dropdownOpen.set(false);
  }

  private emitValue(): void {
    const value = this.fullValue();
    this.onChange(value);
    this.phoneChange.emit(value);
  }

  // ── ControlValueAccessor ──────────────────────────────────────────────────
  writeValue(value: string): void {
    if (!value) return;
    const country = this.countries.find(c => value.startsWith(c.code));
    if (country) {
      this.selectedCountry.set(country);
      this.phoneNumber.set(value.slice(country.code.length));
    } else {
      this.phoneNumber.set(value);
    }
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
