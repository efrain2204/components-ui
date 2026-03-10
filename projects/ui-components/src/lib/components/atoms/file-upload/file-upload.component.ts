import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, forwardRef, Input, Output, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

export interface UploadedFile {
  file: File;
  name: string;
  size: number;
  type: string;
  preview?: string; // base64 para imágenes
}

@Component({
  selector: 'ui-file-upload',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true,
    },
  ],
})
export class FileUploadComponent implements ControlValueAccessor{
  @Input() label: string = '';
  @Input() hint: string = '';
  @Input() errorMessage: string = '';
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  /** Tipos MIME aceptados: 'image/*', '.pdf', 'image/png,application/pdf' */
  @Input() accept: string = '*/*';

  /** Permite seleccionar múltiples archivos */
  @Input() multiple: boolean = false;

  /** Tamaño máximo por archivo en MB (0 = sin límite) */
  @Input() maxSizeMb: number = 0;

  /** Muestra zona de drag & drop */
  @Input() dropzone: boolean = true;

  @Output() filesChange = new EventEmitter<UploadedFile[]>();

  isDragging = signal(false);
  isFocused = signal(false);
  files = signal<UploadedFile[]>([]);
  sizeError = signal('');

  hasError = computed(() => !!this.errorMessage || !!this.sizeError());
  errorText = computed(() => this.errorMessage || this.sizeError());
  hasFiles = computed(() => this.files().length > 0);

  private onChange: (value: UploadedFile[]) => void = () => { };
  private onTouched: () => void = () => { };

  // ── Drag & Drop ───────────────────────────────────────────────────────────
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    if (!this.disabled) this.isDragging.set(true);
  }

  onDragLeave(): void {
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging.set(false);
    if (this.disabled) return;
    const files = event.dataTransfer?.files;
    if (files) this.processFiles(Array.from(files));
  }

  // ── Input nativo ──────────────────────────────────────────────────────────
  onFileInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.processFiles(Array.from(input.files));
      input.value = ''; // permite reseleccionar el mismo archivo
    }
  }

  openFilePicker(input: HTMLInputElement): void {
    if (!this.disabled) input.click();
  }

  onFocus(): void { this.isFocused.set(true); }
  onBlur(): void {
    this.isFocused.set(false);
    this.onTouched();
  }

  // ── Procesamiento ─────────────────────────────────────────────────────────
  private processFiles(rawFiles: File[]): void {
    this.sizeError.set('');

    const validated: File[] = [];
    for (const file of rawFiles) {
      if (this.maxSizeMb > 0 && file.size > this.maxSizeMb * 1024 * 1024) {
        this.sizeError.set(
          `"${file.name}" supera el límite de ${this.maxSizeMb} MB`
        );
        return;
      }
      validated.push(file);
    }

    const toProcess = this.multiple ? validated : [validated[0]];

    const uploaded: UploadedFile[] = toProcess.map(file => ({
      file,
      name: file.name,
      size: file.size,
      type: file.type,
    }));

    // Genera previews para imágenes
    uploaded.forEach(u => {
      if (u.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = e => {
          u.preview = e.target?.result as string;
          this.files.set([...this.files()]);
        };
        reader.readAsDataURL(u.file);
      }
    });

    const next = this.multiple ? [...this.files(), ...uploaded] : uploaded;
    this.files.set(next);
    this.onChange(next);
    this.onTouched();
    this.filesChange.emit(next);
  }

  removeFile(index: number): void {
    const next = this.files().filter((_, i) => i !== index);
    this.files.set(next);
    this.onChange(next);
    this.filesChange.emit(next);
  }

  formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  isImage(file: UploadedFile): boolean {
    return file.type.startsWith('image/');
  }

  fileIcon(file: UploadedFile): string {
    if (file.type === 'application/pdf') return 'pdf';
    if (file.type.startsWith('image/')) return 'image';
    return 'file';
  }

  // ── ControlValueAccessor ──────────────────────────────────────────────────
  writeValue(value: UploadedFile[]): void {
    this.files.set(value ?? []);
  }

  registerOnChange(fn: (value: UploadedFile[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
