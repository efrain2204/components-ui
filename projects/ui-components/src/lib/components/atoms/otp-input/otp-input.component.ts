import { CommonModule } from '@angular/common';
import { Component, computed, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, QueryList, signal, ViewChildren } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ui-otp-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './otp-input.component.html',
  styleUrl: './otp-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OtpInputComponent),
      multi: true,
    },
  ],
})
export class OtpInputComponent implements ControlValueAccessor, OnInit {
  @Input() label: string = 'Código de verificación';
  @Input() hint: string = '';
  @Input() errorMessage: string = '';
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  /** Cantidad de dígitos del OTP */
  @Input() length: number = 6;

  /** Enmascara los dígitos como contraseña */
  @Input() mask: boolean = false;

  /** Solo números (true) o alfanumérico (false) */
  @Input() numbersOnly: boolean = true;

  @Output() otpChange = new EventEmitter<string>();
  @Output() otpComplete = new EventEmitter<string>(); // emite cuando todos los campos tienen valor

  @ViewChildren('digitInput') digitInputs!: QueryList<ElementRef<HTMLInputElement>>;

  digits = signal<string[]>([]);
  focusedIndex = signal<number>(-1);

  hasError = computed(() => !!this.errorMessage);
  isComplete = computed(() => this.digits().every(d => d !== '') && this.digits().length === this.length);
  otpValue = computed(() => this.digits().join(''));

  slots: number[] = [];

  private onChange: (value: string) => void = () => { };
  private onTouched: () => void = () => { };

  ngOnInit(): void {
    this.slots = Array.from({ length: this.length }, (_, i) => i);
    this.digits.set(Array(this.length).fill(''));
  }

  onDigitInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    // Filtra según modo
    value = this.numbersOnly
      ? value.replace(/\D/g, '')
      : value.replace(/[^a-zA-Z0-9]/g, '');

    // Toma solo el último carácter ingresado
    const char = value.slice(-1).toUpperCase();
    const newDigits = [...this.digits()];
    newDigits[index] = char;
    this.digits.set(newDigits);
    input.value = char;

    this.emitValue();

    // Avanza al siguiente campo si hay valor
    if (char && index < this.length - 1) {
      this.focusAt(index + 1);
    }
  }

  onKeydown(event: KeyboardEvent, index: number): void {
    const input = event.target as HTMLInputElement;

    if (event.key === 'Backspace') {
      const newDigits = [...this.digits()];
      if (newDigits[index]) {
        newDigits[index] = '';
        this.digits.set(newDigits);
        input.value = '';
        this.emitValue();
      } else if (index > 0) {
        this.focusAt(index - 1);
        const prev = [...this.digits()];
        prev[index - 1] = '';
        this.digits.set(prev);
        this.emitValue();
      }
      event.preventDefault();
    }

    if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      this.focusAt(index - 1);
    }

    if (event.key === 'ArrowRight' && index < this.length - 1) {
      event.preventDefault();
      this.focusAt(index + 1);
    }

    if (event.key === 'Delete') {
      const newDigits = [...this.digits()];
      newDigits[index] = '';
      this.digits.set(newDigits);
      input.value = '';
      this.emitValue();
      event.preventDefault();
    }
  }

  onPaste(event: ClipboardEvent, index: number): void {
    event.preventDefault();
    const pasted = event.clipboardData?.getData('text') ?? '';
    const filtered = this.numbersOnly
      ? pasted.replace(/\D/g, '')
      : pasted.replace(/[^a-zA-Z0-9]/g, '');

    const chars = filtered.toUpperCase().slice(0, this.length - index).split('');
    const newDigits = [...this.digits()];

    chars.forEach((char, i) => {
      if (index + i < this.length) newDigits[index + i] = char;
    });

    this.digits.set(newDigits);
    this.emitValue();

    // Foco al siguiente campo vacío o al último
    const nextEmpty = newDigits.findIndex((d, i) => i >= index && !d);
    this.focusAt(nextEmpty !== -1 ? nextEmpty : this.length - 1);
  }

  onFocus(index: number): void {
    this.focusedIndex.set(index);
  }

  onBlur(): void {
    this.focusedIndex.set(-1);
    this.onTouched();
  }

  clear(): void {
    this.digits.set(Array(this.length).fill(''));
    this.emitValue();
    this.focusAt(0);
  }

  private focusAt(index: number): void {
    setTimeout(() => {
      const inputs = this.digitInputs?.toArray();
      inputs?.[index]?.nativeElement.focus();
    }, 0);
  }

  private emitValue(): void {
    const value = this.otpValue();
    this.onChange(value);
    this.otpChange.emit(value);
    if (this.isComplete()) this.otpComplete.emit(value);
  }

  // ── ControlValueAccessor ──────────────────────────────────────────────────
  writeValue(value: string): void {
    const chars = (value ?? '').split('').slice(0, this.length);
    const padded = [...chars, ...Array(this.length - chars.length).fill('')];
    this.digits.set(padded);
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
