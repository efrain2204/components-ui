import { Meta, StoryObj, applicationConfig, moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';
import { InputDateComponent } from './input-date.component';

const meta: Meta<InputDateComponent> = {
    title: 'Atoms/InputDate',
    component: InputDateComponent,
    decorators: [
        applicationConfig({
            providers: [provideAnimations(), importProvidersFrom(ReactiveFormsModule)],
        }),
        moduleMetadata({
            imports: [InputDateComponent, ReactiveFormsModule],
        }),
    ],
    tags: ['autodocs'],
    argTypes: {
        label: {
            control: 'text',
            description: 'Etiqueta visible del campo',
        },
        hint: {
            control: 'text',
            description: 'Texto de ayuda debajo del input',
        },
        errorMessage: {
            control: 'text',
            description: 'Mensaje de error (activa estado error)',
        },
        placeholder: {
            control: 'text',
            description: 'Placeholder del input',
        },
        required: {
            control: 'boolean',
            description: 'Marca el campo como obligatorio',
        },
        disabled: {
            control: 'boolean',
            description: 'Deshabilita el campo',
        },
        minDate: {
            control: 'text',
            description: 'Fecha mínima permitida (formato YYYY-MM-DD)',
        },
        maxDate: {
            control: 'text',
            description: 'Fecha máxima permitida (formato YYYY-MM-DD)',
        },
        size: {
            control: 'radio',
            options: ['sm', 'md', 'lg'],
            description: 'Tamaño del componente',
        },
        dateChange: {
            action: 'dateChange',
            description: 'Evento emitido al cambiar la fecha',
        },
    },
    args: {
        label: 'Fecha',
        placeholder: 'dd/mm/aaaa',
        hint: '',
        errorMessage: '',
        required: false,
        disabled: false,
        minDate: '',
        maxDate: '',
        size: 'md',
    },
};

export default meta;
type Story = StoryObj<InputDateComponent>;

// ── Default ──────────────────────────────────────────────────────────────────
export const Default: Story = {
    args: {
        label: 'Fecha',
    },
};

// ── Required ─────────────────────────────────────────────────────────────────
export const Required: Story = {
    args: {
        label: 'Fecha de nacimiento',
        required: true,
        hint: 'Este campo es obligatorio',
    },
};

// ── Con hint ──────────────────────────────────────────────────────────────────
export const ConHint: Story = {
    args: {
        label: 'Fecha de emisión',
        hint: 'Puedes encontrarla en tu identificación oficial',
    },
};

// ── Con error ─────────────────────────────────────────────────────────────────
export const ConError: Story = {
    args: {
        label: 'Fecha de nacimiento',
        required: true,
        errorMessage: 'La fecha es requerida',
    },
};

// ── Disabled ──────────────────────────────────────────────────────────────────
export const Disabled: Story = {
    args: {
        label: 'Fecha de vencimiento',
        disabled: true,
        hint: 'Este campo no es editable',
    },
};

// ── Con rango de fechas ───────────────────────────────────────────────────────
export const ConRango: Story = {
    args: {
        label: 'Fecha de inicio del crédito',
        hint: 'Solo fechas del año en curso',
        minDate: '2025-01-01',
        maxDate: '2025-12-31',
    },
};

// ── Tamaño pequeño ────────────────────────────────────────────────────────────
export const Small: Story = {
    args: {
        label: 'Fecha',
        size: 'sm',
    },
};

// ── Tamaño grande ─────────────────────────────────────────────────────────────
export const Large: Story = {
    args: {
        label: 'Fecha',
        size: 'lg',
    },
};

// ── Todos los tamaños ─────────────────────────────────────────────────────────
export const Sizes: Story = {
    decorators: [
        moduleMetadata({ imports: [InputDateComponent] }),
    ],
    render: () => ({
        template: `
      <div style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;">
        <ui-input-date label="Small" size="sm" />
        <ui-input-date label="Medium" size="md" />
        <ui-input-date label="Large"  size="lg" />
      </div>
    `,
    }),
};

// ── Todos los estados ─────────────────────────────────────────────────────────
export const AllStates: Story = {
    decorators: [
        moduleMetadata({ imports: [InputDateComponent] }),
    ],
    render: () => ({
        template: `
      <div style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;">
        <ui-input-date label="Default"  />
        <ui-input-date label="Con hint" hint="Texto de ayuda" />
        <ui-input-date label="Requerido" [required]="true" />
        <ui-input-date label="Con error" errorMessage="La fecha no es válida" />
        <ui-input-date label="Deshabilitado" [disabled]="true" />
      </div>
    `,
    }),
};

// ── Con Reactive Forms ────────────────────────────────────────────────────────
export const ConReactiveForms: Story = {
    decorators: [
        moduleMetadata({ imports: [InputDateComponent] }),
    ],
    render: () => {
        const control = new FormControl('', [Validators.required]);
        return {
            props: { control },
            template: `
        <div style="max-width: 400px; display: flex; flex-direction: column; gap: 16px;">
          <ui-input-date
            label="Fecha de nacimiento"
            [required]="true"
            hint="Vinculado con FormControl"
            [formControl]="control"
          />
          <p style="font-size: 12px; color: #6b7280;">
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
    decorators: [
        moduleMetadata({ imports: [InputDateComponent] }),
    ],
    render: () => ({
        template: `
      <div style="max-width: 480px; padding: 32px; background: #f9fafb; border-radius: 12px; display: flex; flex-direction: column; gap: 20px;">
        <h3 style="margin: 0; font-size: 1rem; color: #111827;">Datos personales</h3>
        <ui-input-date label="Fecha de nacimiento" [required]="true" hint="Debes ser mayor de 18 años" maxDate="2007-01-01" />
        <ui-input-date label="Fecha de expedición del INE" [required]="true" minDate="2010-01-01" />
        <ui-input-date label="Fecha de vencimiento del INE" [required]="true" hint="Verifica que tu INE esté vigente" minDate="2025-01-01" />
      </div>
    `,
    }),
};