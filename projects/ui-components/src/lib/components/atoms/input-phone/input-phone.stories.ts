import { Meta, StoryObj, applicationConfig, moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';
import { InputPhoneComponent, PHONE_COUNTRIES } from './input-phone.component';

const meta: Meta<InputPhoneComponent> = {
    title: 'Atoms/InputPhone',
    component: InputPhoneComponent,
    decorators: [
        applicationConfig({
            providers: [provideAnimations(), importProvidersFrom(ReactiveFormsModule)],
        }),
        moduleMetadata({
            imports: [InputPhoneComponent, ReactiveFormsModule],
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
        placeholder: {
            control: 'text',
            description: 'Placeholder del input',
        },
        required: {
            control: 'boolean',
            description: 'Campo obligatorio',
        },
        disabled: {
            control: 'boolean',
            description: 'Deshabilita el campo',
        },
        defaultCountryIso: {
            control: 'select',
            options: PHONE_COUNTRIES.map(c => c.iso),
            description: 'País por defecto (ISO)',
        },
        size: {
            control: 'radio',
            options: ['sm', 'md', 'lg'],
            description: 'Tamaño del componente',
        },
        phoneChange: {
            action: 'phoneChange',
            description: 'Evento emitido al cambiar el número',
        },
    },
    args: {
        label: 'Teléfono',
        placeholder: '55 1234 5678',
        hint: '',
        errorMessage: '',
        required: false,
        disabled: false,
        defaultCountryIso: 'MX',
        size: 'md',
    },
};

export default meta;
type Story = StoryObj<InputPhoneComponent>;

// ── Default ───────────────────────────────────────────────────────────────────
export const Default: Story = {
    args: { label: 'Teléfono' },
};

// ── Required ──────────────────────────────────────────────────────────────────
export const Required: Story = {
    args: {
        label: 'Teléfono celular',
        required: true,
        hint: 'Recibirás un SMS de verificación',
    },
};

// ── Con hint ──────────────────────────────────────────────────────────────────
export const ConHint: Story = {
    args: {
        label: 'Teléfono de contacto',
        hint: 'Incluye el código de área',
    },
};

// ── Con error ─────────────────────────────────────────────────────────────────
export const ConError: Story = {
    args: {
        label: 'Teléfono celular',
        required: true,
        errorMessage: 'El número no es válido',
    },
};

// ── Disabled ──────────────────────────────────────────────────────────────────
export const Disabled: Story = {
    args: {
        label: 'Teléfono registrado',
        disabled: true,
        hint: 'No puedes modificar este campo',
    },
};

// ── País distinto ─────────────────────────────────────────────────────────────
export const PaisEUA: Story = {
    args: {
        label: 'Teléfono',
        defaultCountryIso: 'US',
        placeholder: '(555) 000-0000',
    },
};

// ── Tamaño pequeño ────────────────────────────────────────────────────────────
export const Small: Story = {
    args: { label: 'Teléfono', size: 'sm' },
};

// ── Tamaño grande ─────────────────────────────────────────────────────────────
export const Large: Story = {
    args: { label: 'Teléfono', size: 'lg' },
};

// ── Todos los tamaños ─────────────────────────────────────────────────────────
export const Sizes: Story = {
    decorators: [moduleMetadata({ imports: [InputPhoneComponent] })],
    render: () => ({
        template: `
      <div style="display:flex;flex-direction:column;gap:24px;max-width:400px">
        <ui-input-phone label="Small"  size="sm" />
        <ui-input-phone label="Medium" size="md" />
        <ui-input-phone label="Large"  size="lg" />
      </div>
    `,
    }),
};

// ── Todos los estados ─────────────────────────────────────────────────────────
export const AllStates: Story = {
    decorators: [moduleMetadata({ imports: [InputPhoneComponent] })],
    render: () => ({
        template: `
      <div style="display:flex;flex-direction:column;gap:24px;max-width:400px">
        <ui-input-phone label="Default" />
        <ui-input-phone label="Con hint" hint="Incluye código de área" />
        <ui-input-phone label="Requerido" [required]="true" />
        <ui-input-phone label="Con error" errorMessage="Número no válido" />
        <ui-input-phone label="Deshabilitado" [disabled]="true" />
      </div>
    `,
    }),
};

// ── Con Reactive Forms ────────────────────────────────────────────────────────
export const ConReactiveForms: Story = {
    decorators: [moduleMetadata({ imports: [InputPhoneComponent, ReactiveFormsModule] })],
    render: () => {
        const control = new FormControl('', [Validators.required]);
        return {
            props: { control },
            template: `
        <div style="max-width:400px;display:flex;flex-direction:column;gap:16px">
          <ui-input-phone
            label="Teléfono celular"
            hint="Vinculado con FormControl"
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
    decorators: [moduleMetadata({ imports: [InputPhoneComponent] })],
    render: () => ({
        template: `
      <div style="max-width:480px;padding:32px;background:#f9fafb;border-radius:12px;display:flex;flex-direction:column;gap:20px">
        <h3 style="margin:0;font-size:1rem;color:#111827">Datos de contacto</h3>
        <ui-input-phone
          label="Teléfono celular"
          [required]="true"
          hint="Recibirás tu código OTP en este número"
          defaultCountryIso="MX"
        />
        <ui-input-phone
          label="Teléfono de referencia"
          hint="Opcional — familiar o contacto de emergencia"
        />
      </div>
    `,
    }),
};