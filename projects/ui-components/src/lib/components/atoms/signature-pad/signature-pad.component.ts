import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, computed, ElementRef, EventEmitter, forwardRef, HostListener, Input, OnDestroy, Output, signal, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ui-signature-pad',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './signature-pad.component.html',
  styleUrl: './signature-pad.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SignaturePadComponent),
      multi: true,
    },
  ],
})
export class SignaturePadComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  @Input() label: string = 'Firma digital';
  @Input() hint: string = '';
  @Input() errorMessage: string = '';
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  /** Color del trazo */
  @Input() strokeColor: string = '#111827';

  /** Grosor del trazo */
  @Input() strokeWidth: number = 2.5;

  /** Altura del canvas en px */
  @Input() height: number = 160;

  @Output() signatureChange = new EventEmitter<string>(); // emite base64

  isDrawing = signal(false);
  isEmpty = signal(true);
  isFocused = signal(false);

  hasError = computed(() => !!this.errorMessage);
  hasValue = computed(() => !this.isEmpty());

  private ctx!: CanvasRenderingContext2D;
  private lastX = 0;
  private lastY = 0;
  private onChange: (value: string) => void = () => { };
  private onTouched: () => void = () => { };

  ngAfterViewInit(): void {
    this.initCanvas();
  }

  ngOnDestroy(): void {
    this.removeListeners();
  }

  private initCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    this.ctx = ctx;
    this.resizeCanvas();
    this.setupStyle();
  }

  private resizeCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    this.ctx.scale(dpr, dpr);
    this.setupStyle();
  }

  private setupStyle(): void {
    this.ctx.strokeStyle = this.strokeColor;
    this.ctx.lineWidth = this.strokeWidth;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
  }

  // ── Mouse events ──────────────────────────────────────────────────────────
  onMouseDown(event: MouseEvent): void {
    if (this.disabled) return;
    this.isDrawing.set(true);
    const { x, y } = this.getPos(event);
    this.lastX = x;
    this.lastY = y;
    this.ctx.beginPath();
    this.ctx.arc(x, y, this.strokeWidth / 4, 0, Math.PI * 2);
    this.ctx.fillStyle = this.strokeColor;
    this.ctx.fill();
    this.isEmpty.set(false);
  }

  onMouseMove(event: MouseEvent): void {
    if (!this.isDrawing() || this.disabled) return;
    const { x, y } = this.getPos(event);
    this.draw(this.lastX, this.lastY, x, y);
    this.lastX = x;
    this.lastY = y;
  }

  onMouseUp(): void {
    if (!this.isDrawing()) return;
    this.isDrawing.set(false);
    this.emitValue();
  }

  // ── Touch events ──────────────────────────────────────────────────────────
  onTouchStart(event: TouchEvent): void {
    event.preventDefault();
    if (this.disabled) return;
    const touch = event.touches[0];
    this.isDrawing.set(true);
    const { x, y } = this.getTouchPos(touch);
    this.lastX = x;
    this.lastY = y;
    this.isEmpty.set(false);
  }

  onTouchMove(event: TouchEvent): void {
    event.preventDefault();
    if (!this.isDrawing() || this.disabled) return;
    const touch = event.touches[0];
    const { x, y } = this.getTouchPos(touch);
    this.draw(this.lastX, this.lastY, x, y);
    this.lastX = x;
    this.lastY = y;
  }

  onTouchEnd(): void {
    this.isDrawing.set(false);
    this.emitValue();
  }

  // ── Helpers ───────────────────────────────────────────────────────────────
  private draw(x1: number, y1: number, x2: number, y2: number): void {
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  }

  private getPos(event: MouseEvent): { x: number; y: number } {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }

  private getTouchPos(touch: Touch): { x: number; y: number } {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    return { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
  }

  clear(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.isEmpty.set(true);
    this.onChange('');
    this.signatureChange.emit('');
  }

  private emitValue(): void {
    const dataUrl = this.canvasRef.nativeElement.toDataURL('image/png');
    this.onChange(dataUrl);
    this.onTouched();
    this.signatureChange.emit(dataUrl);
  }

  private removeListeners(): void { }

  @HostListener('window:mouseup')
  onWindowMouseUp(): void {
    if (this.isDrawing()) {
      this.isDrawing.set(false);
      this.emitValue();
    }
  }

  // ── ControlValueAccessor ──────────────────────────────────────────────────
  writeValue(value: string): void {
    if (!value) {
      this.clear();
      return;
    }
    const img = new Image();
    img.onload = () => {
      this.ctx?.drawImage(img, 0, 0);
      this.isEmpty.set(false);
    };
    img.src = value;
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
