import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lib-toggle-switch',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './toggle-switch.component.html',
  styleUrl: './toggle-switch.component.scss'
})
export class ToggleSwitchComponent {
  @Input({ required: true })
  control!: FormControl<boolean>;

  @Input()
  disabled = false;

  toggle(): void {
    if (this.disabled) return;
    this.control.setValue(!this.control.value);
    this.control.markAsTouched();
  }
}
