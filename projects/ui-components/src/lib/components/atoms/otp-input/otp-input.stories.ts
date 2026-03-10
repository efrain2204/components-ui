import { Meta, StoryObj, applicationConfig, moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';
import { OtpInputComponent } from './otp-input.component';

const meta: Meta<OtpInputComponent> = {
    title: 'Atoms/OtpInput',
    component: OtpInputComponent,
    decorators: [
        applicationConfig({
            providers: [provideAnimations(), importProvidersFrom(ReactiveFormsModule)],
        }),
        moduleMetadata({
            imports: [OtpInputComponent, ReactiveFormsModule],
        }),
    ],
    tags: ['autodocs'],
    argTypes: {
        label: {
            control: 'text',
            description: 'Etiqueta del campo',
        },
        hint: {
            control: 'text',
            description: 'Texto de ayuda',
        },
        errorMessage: {
            control: 'text',
            description: 'Mensaje de error',
        },
        required: {
            control: 'boolean',
            description: 'Campo obligatorio',
        },
        disabled: {
            control: 'boolean',
            description: 'Deshabilita el campo',
        },
        length: {
            control: 'number',
            description: 'Cantidad de dígitos del OTP',
        },
        mask: {
            control: 'boolean',
            description: 'Enmascara los dígitos como contraseña',
        },
        numbersOnly: {
            control: 'boolean',
            description: 'Solo números (true) o alfanumérico (false)',
        },
        size: {
            control: 'radio',
            options: ['sm', 'md', 'lg'],
            description: 'Tamaño del componente',
        },
        otpChange: { action: 'otpChange', description: 'Emite el valor en cada cambio' },
        otpComplete: { action: 'otpComplete', description: 'Emite cuando todos los campos tienen valor' },
    },
    args: {
        label: 'Código de verificación',
        hint: '',
        errorMessage: '',
        required: false,
        disabled: false,
        length: 6,
        mask: false,
        numbersOnly: true,
        size: 'md',
    },
};

export default meta;
type Story = StoryObj<OtpInputComponent>;

// ── Default ───────────────────────────────────────────────────────────────────
export const Default: Story = {
    args: {
        label: 'Código de verificación',
        hint: 'Ingresa el código de 6 dígitos enviado a tu celular',
    },
};

// ── 4 dígitos (PIN) ───────────────────────────────────────────────────────────
export const PinCuatroDigitos: Story = {
    args: {
        label: 'NIP de autorización',
        length: 4,
        hint: 'Ingresa tu NIP de 4 dígitos',
    },
};

// ── Enmascarado ───────────────────────────────────────────────────────────────
export const Enmascarado: Story = {
    args: {
        label: 'NIP secreto',
        length: 4,
        mask: true,
        hint: 'Los dígitos están ocultos por seguridad',
    },
};

// ── Alfanumérico ──────────────────────────────────────────────────────────────
export const Alfanumerico: Story = {
    args: {
        label: 'Código de activación',
        length: 8,
        numbersOnly: false,
        hint: 'Letras y números, sin espacios',
    },
};

// ── Requerido ─────────────────────────────────────────────────────────────────
export const Required: Story = {
    args: {
        label: 'Código SMS',
        required: true,
        hint: 'Enviamos un código a tu número registrado',
    },
};

// ── Con error ─────────────────────────────────────────────────────────────────
export const ConError: Story = {
    args: {
        label: 'Código de verificación',
        errorMessage: 'El código ingresado no es válido',
    },
};

// ── Disabled ──────────────────────────────────────────────────────────────────
export const Disabled: Story = {
    args: {
        label: 'Código de verificación',
        disabled: true,
        hint: 'Solicita un nuevo código para continuar',
    },
};

// ── Tamaños ───────────────────────────────────────────────────────────────────
export const Sizes: Story = {
    decorators: [moduleMetadata({ imports: [OtpInputComponent] })],
    render: () => ({
        template: `
      <div style="display:flex;flex-direction:column;gap:28px;max-width:480px">
        <ui-otp-input label="Small"  size="sm" [length]="6" />
        <ui-otp-input label="Medium" size="md" [length]="6" />
        <ui-otp-input label="Large"  size="lg" [length]="6" />
      </div>
    `,
    }),
};

// ── Todos los estados ─────────────────────────────────────────────────────────
export const AllStates: Story = {
    decorators: [moduleMetadata({ imports: [OtpInputComponent] })],
    render: () => ({
        template: `
      <div style="display:flex;flex-direction:column;gap:28px;max-width:480px">
        <ui-otp-input label="Default 6 dígitos"    [length]="6" />
        <ui-otp-input label="PIN 4 dígitos"        [length]="4" />
        <ui-otp-input label="Enmascarado"          [length]="4" [mask]="true" />
        <ui-otp-input label="Con error"            [length]="6" errorMessage="Código incorrecto" />
        <ui-otp-input label="Deshabilitado"        [length]="6" [disabled]="true" />
      </div>
    `,
    }),
};

// ── Con Reactive Forms ────────────────────────────────────────────────────────
export const ConReactiveForms: Story = {
    decorators: [moduleMetadata({ imports: [OtpInputComponent, ReactiveFormsModule] })],
    render: () => {
        const control = new FormControl('', [Validators.required, Validators.minLength(6)]);
        return {
            props: { control },
            template: `
        <div style="max-width:480px;display:flex;flex-direction:column;gap:16px">
          <ui-otp-input
            label="Código de verificación"
            hint="Vinculado con FormControl"
            [required]="true"
            [length]="6"
            [formControl]="control"
          />
          <p style="font-size:12px;color:#6b7280">
            Estado: <strong>{{ control.valid ? 'válido' : 'inválido' }}</strong> |
            Valor: <strong>{{ control.value || 'vacío' }}</strong>
          </p>
        </div>
      `,
        };
    },
};

// ── Uso fintech: Onboarding ───────────────────────────────────────────────────
export const FintechOnboarding: Story = {
    decorators: [moduleMetadata({ imports: [OtpInputComponent] })],
    render: () => ({
        template: `
      <div style="max-width:480px;padding:32px;background:#f9fafb;border-radius:12px;display:flex;flex-direction:column;gap:28px">
        <div>
          <h3 style="margin:0 0 4px;font-size:1rem;color:#111827">Verificación de identidad</h3>
          <p style="margin:0;font-size:0.85rem;color:#6b7280">Enviamos un SMS al número +52 *** *** 1234</p>
        </div>
        <ui-otp-input
          label="Código SMS"
          [required]="true"
          [length]="6"
          hint="Válido por 5 minutos · ¿No llegó? Reenviar código"
          size="lg"
        />
        <ui-otp-input
          label="NIP de autorización"
          [length]="4"
          [mask]="true"
          hint="Tu NIP de 4 dígitos para confirmar la operación"
        />
      </div>
    `,
    }),
};