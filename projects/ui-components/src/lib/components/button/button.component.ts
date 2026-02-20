import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'lib-button',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() fullWidth = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  @Input() iconLeft?: string;
  @Input() iconRight?: string;

  @Output() clicked = new EventEmitter<Event>();

  handleClick(event: Event) {
    if (this.disabled || this.loading) return;
    this.clicked.emit(event);
  }

  get classes() {
    return [
      'ui-btn',
      `ui-btn--${this.variant}`,
      `ui-btn--${this.size}`,
      this.fullWidth ? 'ui-btn--block' : '',
      this.loading ? 'ui-btn--loading' : ''
    ];
  }
}
