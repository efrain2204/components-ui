import { Meta, StoryObj, applicationConfig, moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';
import { ComboboxComponent, ComboboxOption } from './combobox.component';

const tiposCredito: ComboboxOption[] = [
    { value: 'personal', label: 'Crédito personal', hint: 'Hasta $150,000 MXN' },
    { value: 'hipotecario', label: 'Crédito hipotecario', hint: 'Hasta $5,000,000 MXN' },
    { value: 'automotriz', label: 'Crédito automotriz', hint: 'Hasta $800,000 MXN' },
    { value: 'nomina', label: 'Crédito nómina', hint: 'Solo empleados formales' },
    { value: 'pyme', label: 'Crédito PYME', hint: 'Para pequeñas empresas', disabled: true },
];

const estados: ComboboxOption[] = [
    { value: 'CDMX', label: 'Ciudad de México', group: 'Centro' },
    { value: 'MEX', label: 'Estado de México', group: 'Centro' },
    { value: 'GTO', label: 'Guanajuato', group: 'Centro' },
    { value: 'JAL', label: 'Jalisco', group: 'Occidente' },
    { value: 'NL', label: 'Nuevo León', group: 'Norte' },
    { value: 'YUC', label: 'Yucatán', group: 'Sur' },
    { value: 'VER', label: 'Veracruz', group: 'Sur' },
];

const documentos: ComboboxOption[] = [
    { value: 'ine', label: 'INE / IFE' },
    { value: 'pasaporte', label: 'Pasaporte' },
    { value: 'curp', label: 'CURP' },
    { value: 'rfc', label: 'RFC' },
    { value: 'acta', label: 'Acta de nacimiento' },
    { value: 'comprobante', label: 'Comprobante de domicilio' },
];

const meta: Meta<ComboboxComponent> = {
    title: 'Atoms/Combobox',
    component: ComboboxComponent,
    decorators: [
        applicationConfig({
            providers: [provideAnimations(), importProvidersFrom(ReactiveFormsModule)],
        }),
        moduleMetadata({
            imports: [ComboboxComponent, ReactiveFormsModule],
        }),
    ],
    tags: ['autodocs'],
    argTypes: {
        label: { control: 'text', description: 'Etiqueta del campo' },
        placeholder: { control: 'text', description: 'Placeholder' },
        hint: { control: 'text', description: 'Texto de ayuda' },
        errorMessage: { control: 'text', description: 'Mensaje de error' },
        required: { control: 'boolean', description: 'Campo obligatorio' },
        disabled: { control: 'boolean', description: 'Deshabilita el campo' },
        searchable: { control: 'boolean', description: 'Permite filtrar opciones' },
        multiple: { control: 'boolean', description: 'Selección múltiple' },
        emptyText: { control: 'text', description: 'Texto sin resultados' },
        size: { control: 'radio', options: ['sm', 'md', 'lg'], description: 'Tamaño' },
        optionSelected: { action: 'optionSelected' },
        searchChange: { action: 'searchChange' },
    },
    args: {
        label: 'Tipo de crédito',
        placeholder: 'Selecciona una opción',
        hint: '',
        errorMessage: '',
        required: false,
        disabled: false,
        searchable: true,
        multiple: false,
        emptyText: 'Sin resultados',
        size: 'md',
        options: tiposCredito,
    },
};

export default meta;
type Story = StoryObj<ComboboxComponent>;

// ── Default ───────────────────────────────────────────────────────────────────
export const Default: Story = {
    args: { label: 'Tipo de crédito', options: tiposCredito },
};

// ── Sin búsqueda ──────────────────────────────────────────────────────────────
export const SinBusqueda: Story = {
    args: { label: 'Tipo de crédito', options: tiposCredito, searchable: false },
};

// ── Con hint ──────────────────────────────────────────────────────────────────
export const ConHint: Story = {
    args: {
        label: 'Estado de residencia',
        options: estados,
        hint: 'Selecciona el estado donde vives actualmente',
    },
};

// ── Con grupos ────────────────────────────────────────────────────────────────
export const ConGrupos: Story = {
    args: {
        label: 'Estado de residencia',
        options: estados,
        hint: 'Opciones agrupadas por región',
    },
};

// ── Múltiple ──────────────────────────────────────────────────────────────────
export const Multiple: Story = {
    args: {
        label: 'Documentos requeridos',
        options: documentos,
        multiple: true,
        hint: 'Selecciona todos los documentos que entregarás',
    },
};

// ── Requerido ─────────────────────────────────────────────────────────────────
export const Required: Story = {
    args: { label: 'Tipo de crédito', options: tiposCredito, required: true },
};

// ── Con error ─────────────────────────────────────────────────────────────────
export const ConError: Story = {
    args: {
        label: 'Tipo de crédito',
        options: tiposCredito,
        required: true,
        errorMessage: 'Debes seleccionar un tipo de crédito',
    },
};

// ── Disabled ──────────────────────────────────────────────────────────────────
export const Disabled: Story = {
    args: { label: 'Tipo de crédito', options: tiposCredito, disabled: true },
};

// ── Tamaños ───────────────────────────────────────────────────────────────────
export const Sizes: Story = {
    decorators: [moduleMetadata({ imports: [ComboboxComponent] })],
    render: () => ({
        props: { tiposCredito },
        template: `
      <div style="display:flex;flex-direction:column;gap:24px;max-width:400px">
        <ui-combobox label="Small"  size="sm" [options]="tiposCredito" />
        <ui-combobox label="Medium" size="md" [options]="tiposCredito" />
        <ui-combobox label="Large"  size="lg" [options]="tiposCredito" />
      </div>
    `,
    }),
};

// ── Todos los estados ─────────────────────────────────────────────────────────
export const AllStates: Story = {
    decorators: [moduleMetadata({ imports: [ComboboxComponent] })],
    render: () => ({
        props: { tiposCredito, documentos, estados },
        template: `
      <div style="display:flex;flex-direction:column;gap:24px;max-width:400px">
        <ui-combobox label="Default"       [options]="tiposCredito" />
        <ui-combobox label="Sin búsqueda"  [options]="tiposCredito" [searchable]="false" />
        <ui-combobox label="Múltiple"      [options]="documentos"   [multiple]="true" />
        <ui-combobox label="Con grupos"    [options]="estados" />
        <ui-combobox label="Requerido"     [options]="tiposCredito" [required]="true" />
        <ui-combobox label="Con error"     [options]="tiposCredito" errorMessage="Campo requerido" />
        <ui-combobox label="Deshabilitado" [options]="tiposCredito" [disabled]="true" />
      </div>
    `,
    }),
};

// ── Con Reactive Forms ────────────────────────────────────────────────────────
export const ConReactiveForms: Story = {
    decorators: [moduleMetadata({ imports: [ComboboxComponent, ReactiveFormsModule] })],
    render: () => {
        const control = new FormControl(null, [Validators.required]);
        return {
            props: { control, tiposCredito },
            template: `
        <div style="max-width:400px;display:flex;flex-direction:column;gap:16px">
          <ui-combobox
            label="Tipo de crédito"
            hint="Vinculado con FormControl"
            [required]="true"
            [options]="tiposCredito"
            [formControl]="control"
          />
          <p style="font-size:12px;color:#6b7280">
            Estado: <strong>{{ control.valid ? 'válido' : 'inválido' }}</strong> |
            Valor: <strong>{{ control.value ?? 'sin selección' }}</strong>
          </p>
        </div>
      `,
        };
    },
};

// ── Uso fintech: Onboarding ───────────────────────────────────────────────────
export const FintechOnboarding: Story = {
    decorators: [moduleMetadata({ imports: [ComboboxComponent] })],
    render: () => ({
        props: { tiposCredito, estados, documentos },
        template: `
      <div style="max-width:480px;padding:32px;background:#f9fafb;border-radius:12px;display:flex;flex-direction:column;gap:20px">
        <h3 style="margin:0;font-size:1rem;color:#111827">Solicitud de crédito</h3>
        <ui-combobox
          label="Tipo de crédito"
          [required]="true"
          [options]="tiposCredito"
          hint="Selecciona el producto que mejor se adapte a tus necesidades"
        />
        <ui-combobox
          label="Estado de residencia"
          [required]="true"
          [options]="estados"
          hint="Estado donde vives actualmente"
        />
        <ui-combobox
          label="Documentos a entregar"
          [options]="documentos"
          [multiple]="true"
          hint="Selecciona todos los documentos que presentarás"
        />
      </div>
    `,
    }),
};