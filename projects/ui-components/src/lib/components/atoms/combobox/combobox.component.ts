import { CommonModule } from '@angular/common';
import { Component, computed, ElementRef, EventEmitter, forwardRef, HostListener, Input, OnDestroy, Output, signal, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

export interface ComboboxOption {
  value: string | number;
  label: string;
  hint?: string;
  disabled?: boolean;
  group?: string;
}

@Component({
  selector: 'ui-combobox',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './combobox.component.html',
  styleUrl: './combobox.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ComboboxComponent),
      multi: true,
    },
  ],
})
export class ComboboxComponent implements ControlValueAccessor, OnDestroy {
  @ViewChild('searchInput') searchInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('comboboxRoot') rootRef!: ElementRef<HTMLElement>;

  @Input() label: string = '';
  @Input() placeholder: string = 'Selecciona una opción';
  @Input() hint: string = '';
  @Input() errorMessage: string = '';
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() options: ComboboxOption[] = [];
  @Input() searchable: boolean = true;
  @Input() multiple: boolean = false;
  @Input() emptyText: string = 'Sin resultados';

  @Output() optionSelected = new EventEmitter<ComboboxOption | ComboboxOption[]>();
  @Output() searchChange = new EventEmitter<string>();

  isOpen = signal(false);
  isFocused = signal(false);
  searchQuery = signal('');
  activeIndex = signal(-1);
  selectedValues = signal<(string | number)[]>([]);

  hasError = computed(() => !!this.errorMessage);
  hasValue = computed(() => this.selectedValues().length > 0);

  selectedOptions = computed(() =>
    this.options.filter(o => this.selectedValues().includes(o.value))
  );

  displayLabel = computed(() => {
    const sel = this.selectedOptions();
    if (!sel.length) return '';
    if (this.multiple) return `${sel.length} seleccionado${sel.length > 1 ? 's' : ''}`;
    return sel[0].label;
  });

  filteredOptions = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    return q ? this.options.filter(o => o.label.toLowerCase().includes(q)) : this.options;
  });

  groups = computed(() => {
    const opts = this.filteredOptions();
    if (!opts.some(o => o.group)) return null;
    const map = new Map<string, ComboboxOption[]>();
    opts.forEach(o => {
      const key = o.group ?? '';
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(o);
    });
    return map;
  });

  private onChange: (value: any) => void = () => { };
  private onTouched: () => void = () => { };

  // ── Dropdown ──────────────────────────────────────────────────────────────
  open(): void {
    if (this.disabled) return;
    this.isOpen.set(true);
    this.activeIndex.set(-1);
    setTimeout(() => this.searchInputRef?.nativeElement?.focus(), 0);
  }

  close(): void {
    this.isOpen.set(false);
    this.searchQuery.set('');
    this.activeIndex.set(-1);
    this.onTouched();
  }

  toggle(): void {
    this.isOpen() ? this.close() : this.open();
  }

  /**
   * FIX principal: usamos `mousedown` (no `click`) y comprobamos con
   * `rootRef.nativeElement.contains()` para saber si el click fue dentro
   * del componente. Con `click` había una race condition donde el dropdown
   * ya se había renderizado al detectar el evento y se cerraba solo.
   */
  @HostListener('document:mousedown', ['$event'])
  onDocumentMouseDown(event: MouseEvent): void {
    if (!this.isOpen()) return;
    const root = this.rootRef?.nativeElement;
    if (root && !root.contains(event.target as Node)) {
      this.close();
    }
  }

  // ── Selección ─────────────────────────────────────────────────────────────
  /**
   * FIX: `event.stopPropagation()` evita que el click en una opción
   * burbujee hasta el trigger y lo cierre inmediatamente.
   */
  selectOption(option: ComboboxOption, event: MouseEvent): void {
    event.stopPropagation();
    if (option.disabled) return;

    if (this.multiple) {
      const current = this.selectedValues();
      const exists = current.includes(option.value);
      const next = exists
        ? current.filter(v => v !== option.value)
        : [...current, option.value];
      this.selectedValues.set(next);
      const selected = this.options.filter(o => next.includes(o.value));
      this.onChange(next);
      this.optionSelected.emit(selected);
    } else {
      this.selectedValues.set([option.value]);
      this.onChange(option.value);
      this.optionSelected.emit(option);
      this.close();
    }
  }

  isSelected(option: ComboboxOption): boolean {
    return this.selectedValues().includes(option.value);
  }

  removeTag(value: string | number, event: MouseEvent): void {
    event.stopPropagation();
    const next = this.selectedValues().filter(v => v !== value);
    this.selectedValues.set(next);
    this.onChange(this.multiple ? next : null);
  }

  clearAll(event: MouseEvent): void {
    event.stopPropagation();
    this.selectedValues.set([]);
    this.onChange(this.multiple ? [] : null);
    this.optionSelected.emit(this.multiple ? [] : (undefined as any));
  }

  // ── Búsqueda ──────────────────────────────────────────────────────────────
  onSearch(event: Event): void {
    event.stopPropagation();
    const q = (event.target as HTMLInputElement).value;
    this.searchQuery.set(q);
    this.searchChange.emit(q);
    this.activeIndex.set(-1);
  }

  // ── Teclado en el trigger ─────────────────────────────────────────────────
  onTriggerKeydown(event: KeyboardEvent): void {
    const opts = this.filteredOptions().filter(o => !o.disabled);

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!this.isOpen()) { this.open(); return; }
        this.activeIndex.set(Math.min(this.activeIndex() + 1, opts.length - 1));
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.activeIndex.set(Math.max(this.activeIndex() - 1, 0));
        break;
      case 'Enter':
        event.preventDefault();
        if (this.isOpen() && this.activeIndex() >= 0) {
          this.selectOption(opts[this.activeIndex()], event as any);
        } else {
          this.open();
        }
        break;
      case 'Escape':
        this.close();
        break;
      case 'Tab':
        this.close();
        break;
    }
  }

  // ── ControlValueAccessor ──────────────────────────────────────────────────
  writeValue(value: any): void {
    if (value === null || value === undefined) {
      this.selectedValues.set([]);
    } else if (Array.isArray(value)) {
      this.selectedValues.set(value);
    } else {
      this.selectedValues.set([value]);
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnDestroy(): void { }
}
