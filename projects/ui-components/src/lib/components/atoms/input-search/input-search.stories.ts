import { Meta, StoryObj, applicationConfig, moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';
import { InputSearchComponent } from './input-search.component';

const meta: Meta<InputSearchComponent> = {
    title: 'Atoms/InputSearch',
    component: InputSearchComponent,
    decorators: [
        applicationConfig({
            providers: [provideAnimations(), importProvidersFrom(ReactiveFormsModule)],
        }),
        moduleMetadata({
            imports: [InputSearchComponent, ReactiveFormsModule],
        }),
    ],
    tags: ['autodocs'],
    argTypes: {
        label: {
            control: 'text',
            description: 'Etiqueta visible del campo',
        },
        placeholder: {
            control: 'text',
            description: 'Placeholder del input',
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
        debounceTime: {
            control: 'number',
            description: 'Milisegundos de espera antes de emitir (search)',
        },
        size: {
            control: 'radio',
            options: ['sm', 'md', 'lg'],
            description: 'Tamaño del componente',
        },
        search: { action: 'search', description: 'Emite tras el debounce' },
        valueChange: { action: 'valueChange', description: 'Emite en cada keystroke' },
    },
    args: {
        label: '',
        placeholder: 'Buscar...',
        hint: '',
        errorMessage: '',
        required: false,
        disabled: false,
        debounceTime: 400,
        size: 'md',
    },
};

export default meta;
type Story = StoryObj<InputSearchComponent>;

// ── Default ───────────────────────────────────────────────────────────────────
export const Default: Story = {
    args: { placeholder: 'Buscar...' },
};

// ── Con label ─────────────────────────────────────────────────────────────────
export const ConLabel: Story = {
    args: {
        label: 'Buscar cliente',
        placeholder: 'Nombre, RFC o CURP...',
    },
};

// ── Con hint ──────────────────────────────────────────────────────────────────
export const ConHint: Story = {
    args: {
        label: 'Buscar producto',
        placeholder: 'Escribe al menos 3 caracteres',
        hint: 'La búsqueda se realiza automáticamente',
    },
};

// ── Con error ─────────────────────────────────────────────────────────────────
export const ConError: Story = {
    args: {
        label: 'Buscar',
        errorMessage: 'No se encontraron resultados',
    },
};

// ── Disabled ──────────────────────────────────────────────────────────────────
export const Disabled: Story = {
    args: {
        placeholder: 'Búsqueda deshabilitada',
        disabled: true,
    },
};

// ── Debounce rápido ───────────────────────────────────────────────────────────
export const DebounceRapido: Story = {
    args: {
        label: 'Búsqueda rápida',
        placeholder: 'Debounce de 200ms...',
        hint: 'Emite a los 200ms de dejar de escribir',
        debounceTime: 200,
    },
};

// ── Debounce lento ────────────────────────────────────────────────────────────
export const DebolenceLento: Story = {
    args: {
        label: 'Búsqueda lenta',
        placeholder: 'Debounce de 800ms...',
        hint: 'Emite a los 800ms de dejar de escribir',
        debounceTime: 800,
    },
};

// ── Tamaños ───────────────────────────────────────────────────────────────────
export const Sizes: Story = {
    decorators: [moduleMetadata({ imports: [InputSearchComponent] })],
    render: () => ({
        template: `
      <div style="display:flex;flex-direction:column;gap:24px;max-width:420px">
        <ui-input-search placeholder="Small"  size="sm" />
        <ui-input-search placeholder="Medium" size="md" />
        <ui-input-search placeholder="Large"  size="lg" />
      </div>
    `,
    }),
};

// ── Todos los estados ─────────────────────────────────────────────────────────
export const AllStates: Story = {
    decorators: [moduleMetadata({ imports: [InputSearchComponent] })],
    render: () => ({
        template: `
      <div style="display:flex;flex-direction:column;gap:24px;max-width:420px">
        <ui-input-search placeholder="Default" />
        <ui-input-search placeholder="Con hint" hint="Texto de ayuda" />
        <ui-input-search placeholder="Con error" errorMessage="Sin resultados" />
        <ui-input-search placeholder="Deshabilitado" [disabled]="true" />
      </div>
    `,
    }),
};

// ── Con Reactive Forms ────────────────────────────────────────────────────────
export const ConReactiveForms: Story = {
    decorators: [moduleMetadata({ imports: [InputSearchComponent, ReactiveFormsModule] })],
    render: () => {
        const control = new FormControl('');
        return {
            props: { control },
            template: `
        <div style="max-width:420px;display:flex;flex-direction:column;gap:16px">
          <ui-input-search
            label="Buscar"
            placeholder="Escribe algo..."
            hint="Vinculado con FormControl"
            [formControl]="control"
          />
          <p style="font-size:12px;color:#6b7280">
            Valor: <strong>{{ control.value || 'vacío' }}</strong>
          </p>
        </div>
      `,
        };
    },
};

// ── Uso fintech: Onboarding ───────────────────────────────────────────────────
export const FintechOnboarding: Story = {
    decorators: [moduleMetadata({ imports: [InputSearchComponent] })],
    render: () => ({
        template: `
      <div style="max-width:480px;padding:32px;background:#f9fafb;border-radius:12px;display:flex;flex-direction:column;gap:20px">
        <h3 style="margin:0;font-size:1rem;color:#111827">Consulta de créditos</h3>
        <ui-input-search
          label="Buscar cliente"
          placeholder="Nombre, RFC, CURP o folio..."
          hint="Busca entre todos los solicitantes registrados"
          [debounceTime]="400"
        />
        <ui-input-search
          label="Buscar producto financiero"
          placeholder="Crédito personal, hipotecario..."
          [debounceTime]="300"
          size="sm"
        />
      </div>
    `,
    }),
};