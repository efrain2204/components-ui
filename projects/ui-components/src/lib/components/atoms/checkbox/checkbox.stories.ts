import { Meta, StoryObj, applicationConfig, moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';
import { CheckboxComponent } from './checkbox.component';

const meta: Meta<CheckboxComponent> = {
    title: 'Atoms/Checkbox',
    component: CheckboxComponent,
    decorators: [
        applicationConfig({
            providers: [provideAnimations(), importProvidersFrom(ReactiveFormsModule)],
        }),
        moduleMetadata({
            imports: [CheckboxComponent, ReactiveFormsModule],
        }),
    ],
    tags: ['autodocs'],
    argTypes: {
        label: {
            control: 'text',
            description: 'Texto del checkbox',
        },
        hint: {
            control: 'text',
            description: 'Texto de ayuda bajo el label',
        },
        errorMessage: {
            control: 'text',
            description: 'Mensaje de error',
        },
        required: {
            control: 'boolean',
            description: 'Marca el campo como obligatorio',
        },
        disabled: {
            control: 'boolean',
            description: 'Deshabilita el checkbox',
        },
        indeterminate: {
            control: 'boolean',
            description: 'Estado indeterminado (guión)',
        },
        size: {
            control: 'radio',
            options: ['sm', 'md', 'lg'],
            description: 'Tamaño del componente',
        },
        checkedChange: {
            action: 'checkedChange',
            description: 'Emite true/false al cambiar',
        },
    },
    args: {
        label: 'Acepto los términos y condiciones',
        hint: '',
        errorMessage: '',
        required: false,
        disabled: false,
        indeterminate: false,
        size: 'md',
    },
};

export default meta;
type Story = StoryObj<CheckboxComponent>;

// ── Default ───────────────────────────────────────────────────────────────────
export const Default: Story = {
    args: { label: 'Acepto los términos y condiciones' },
};

// ── Con hint ──────────────────────────────────────────────────────────────────
export const ConHint: Story = {
    args: {
        label: 'Recibir notificaciones',
        hint: 'Te enviaremos actualizaciones sobre tu crédito',
    },
};

// ── Requerido ─────────────────────────────────────────────────────────────────
export const Required: Story = {
    args: {
        label: 'Acepto la política de privacidad',
        required: true,
        hint: 'Este campo es obligatorio para continuar',
    },
};

// ── Con error ─────────────────────────────────────────────────────────────────
export const ConError: Story = {
    args: {
        label: 'Acepto los términos y condiciones',
        required: true,
        errorMessage: 'Debes aceptar los términos para continuar',
    },
};

// ── Disabled unchecked ────────────────────────────────────────────────────────
export const Disabled: Story = {
    args: {
        label: 'Opción no disponible',
        disabled: true,
    },
};

// ── Indeterminate ─────────────────────────────────────────────────────────────
export const Indeterminate: Story = {
    args: {
        label: 'Seleccionar todos',
        indeterminate: true,
    },
};

// ── Tamaños ───────────────────────────────────────────────────────────────────
export const Sizes: Story = {
    decorators: [moduleMetadata({ imports: [CheckboxComponent] })],
    render: () => ({
        template: `
      <div style="display:flex;flex-direction:column;gap:20px">
        <ui-checkbox label="Small"  size="sm" />
        <ui-checkbox label="Medium" size="md" />
        <ui-checkbox label="Large"  size="lg" />
      </div>
    `,
    }),
};

// ── Todos los estados ─────────────────────────────────────────────────────────
export const AllStates: Story = {
    decorators: [moduleMetadata({ imports: [CheckboxComponent] })],
    render: () => ({
        template: `
      <div style="display:flex;flex-direction:column;gap:20px">
        <ui-checkbox label="Default" />
        <ui-checkbox label="Con hint" hint="Texto de ayuda debajo" />
        <ui-checkbox label="Requerido" [required]="true" />
        <ui-checkbox label="Con error" errorMessage="Este campo es requerido" />
        <ui-checkbox label="Indeterminado" [indeterminate]="true" />
        <ui-checkbox label="Deshabilitado" [disabled]="true" />
      </div>
    `,
    }),
};

// ── Con Reactive Forms ────────────────────────────────────────────────────────
export const ConReactiveForms: Story = {
    decorators: [moduleMetadata({ imports: [CheckboxComponent, ReactiveFormsModule] })],
    render: () => {
        const control = new FormControl(false, [Validators.requiredTrue]);
        return {
            props: { control },
            template: `
        <div style="display:flex;flex-direction:column;gap:16px;max-width:360px">
          <ui-checkbox
            label="Acepto los términos y condiciones"
            hint="Vinculado con FormControl"
            [formControl]="control"
          />
          <p style="font-size:12px;color:#6b7280">
            Estado: <strong>{{ control.valid ? 'válido' : 'inválido' }}</strong> |
            Valor: <strong>{{ control.value }}</strong>
          </p>
        </div>
      `,
        };
    },
};

// ── Uso fintech: Onboarding ───────────────────────────────────────────────────
export const FintechOnboarding: Story = {
    decorators: [moduleMetadata({ imports: [CheckboxComponent] })],
    render: () => ({
        template: `
      <div style="max-width:480px;padding:32px;background:#f9fafb;border-radius:12px;display:flex;flex-direction:column;gap:16px">
        <h3 style="margin:0;font-size:1rem;color:#111827">Consentimientos del solicitante</h3>
        <ui-checkbox
          label="Autorizo la consulta de mi historial crediticio en el Buró de Crédito"
          hint="Requerido para evaluar tu solicitud"
          [required]="true"
        />
        <ui-checkbox
          label="Acepto los términos y condiciones del crédito"
          [required]="true"
        />
        <ui-checkbox
          label="Acepto la política de privacidad y tratamiento de datos"
          [required]="true"
        />
        <ui-checkbox
          label="Deseo recibir comunicaciones y ofertas personalizadas"
          hint="Opcional — puedes cancelarlo en cualquier momento"
        />
      </div>
    `,
    }),
};