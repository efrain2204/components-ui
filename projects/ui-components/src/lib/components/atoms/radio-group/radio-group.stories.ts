import { Meta, StoryObj, applicationConfig, moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';
import { RadioGroupComponent, RadioOption } from './radio-group.component';

const tipoCredito: RadioOption[] = [
    { value: 'personal', label: 'Crédito personal', hint: 'Hasta $150,000 MXN' },
    { value: 'hipotecario', label: 'Crédito hipotecario', hint: 'Hasta $5,000,000 MXN' },
    { value: 'automotriz', label: 'Crédito automotriz', hint: 'Hasta $800,000 MXN' },
    { value: 'nomina', label: 'Crédito nómina', hint: 'Solo empleados formales', disabled: true },
];

const plazo: RadioOption[] = [
    { value: 6, label: '6 meses' },
    { value: 12, label: '12 meses' },
    { value: 24, label: '24 meses' },
    { value: 36, label: '36 meses' },
];

const genero: RadioOption[] = [
    { value: 'M', label: 'Masculino' },
    { value: 'F', label: 'Femenino' },
    { value: 'X', label: 'Prefiero no decir' },
];

const meta: Meta<RadioGroupComponent> = {
    title: 'Atoms/RadioGroup',
    component: RadioGroupComponent,
    decorators: [
        applicationConfig({
            providers: [provideAnimations(), importProvidersFrom(ReactiveFormsModule)],
        }),
        moduleMetadata({
            imports: [RadioGroupComponent, ReactiveFormsModule],
        }),
    ],
    tags: ['autodocs'],
    argTypes: {
        label: {
            control: 'text',
            description: 'Etiqueta del grupo',
        },
        hint: {
            control: 'text',
            description: 'Texto de ayuda del grupo',
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
            description: 'Deshabilita todo el grupo',
        },
        direction: {
            control: 'radio',
            options: ['vertical', 'horizontal'],
            description: 'Dirección de las opciones',
        },
        size: {
            control: 'radio',
            options: ['sm', 'md', 'lg'],
            description: 'Tamaño del componente',
        },
        optionChange: {
            action: 'optionChange',
            description: 'Emite el valor seleccionado',
        },
    },
    args: {
        label: 'Tipo de crédito',
        hint: '',
        errorMessage: '',
        required: false,
        disabled: false,
        direction: 'vertical',
        size: 'md',
        options: tipoCredito,
    },
};

export default meta;
type Story = StoryObj<RadioGroupComponent>;

// ── Default ───────────────────────────────────────────────────────────────────
export const Default: Story = {
    args: {
        label: 'Tipo de crédito',
        options: tipoCredito,
    },
};

// ── Con hint ──────────────────────────────────────────────────────────────────
export const ConHint: Story = {
    args: {
        label: 'Plazo del crédito',
        hint: 'Elige el plazo que mejor se adapte a tu capacidad de pago',
        options: plazo,
    },
};

// ── Requerido ─────────────────────────────────────────────────────────────────
export const Required: Story = {
    args: {
        label: 'Tipo de crédito',
        required: true,
        options: tipoCredito,
    },
};

// ── Con error ─────────────────────────────────────────────────────────────────
export const ConError: Story = {
    args: {
        label: 'Tipo de crédito',
        required: true,
        errorMessage: 'Debes seleccionar un tipo de crédito',
        options: tipoCredito,
    },
};

// ── Disabled ──────────────────────────────────────────────────────────────────
export const Disabled: Story = {
    args: {
        label: 'Tipo de crédito',
        disabled: true,
        options: tipoCredito,
    },
};

// ── Horizontal ────────────────────────────────────────────────────────────────
export const Horizontal: Story = {
    args: {
        label: 'Género',
        direction: 'horizontal',
        options: genero,
    },
};

// ── Horizontal plazo ─────────────────────────────────────────────────────────
export const HorizontalPlazo: Story = {
    args: {
        label: 'Plazo',
        direction: 'horizontal',
        hint: 'Selecciona el número de mensualidades',
        options: plazo,
    },
};

// ── Tamaños ───────────────────────────────────────────────────────────────────
export const Sizes: Story = {
    decorators: [moduleMetadata({ imports: [RadioGroupComponent] })],
    render: () => ({
        props: {
            options: [
                { value: 'a', label: 'Opción A' },
                { value: 'b', label: 'Opción B' },
            ],
        },
        template: `
      <div style="display:flex;flex-direction:column;gap:32px">
        <ui-radio-group label="Small"  size="sm" [options]="options" />
        <ui-radio-group label="Medium" size="md" [options]="options" />
        <ui-radio-group label="Large"  size="lg" [options]="options" />
      </div>
    `,
    }),
};

// ── Todos los estados ─────────────────────────────────────────────────────────
export const AllStates: Story = {
    decorators: [moduleMetadata({ imports: [RadioGroupComponent] })],
    render: () => ({
        props: { tipoCredito, plazo, genero },
        template: `
      <div style="display:flex;flex-direction:column;gap:32px;max-width:480px">
        <ui-radio-group label="Default"      [options]="tipoCredito" />
        <ui-radio-group label="Con hint"     [options]="plazo" hint="Selecciona un plazo" />
        <ui-radio-group label="Requerido"    [options]="genero" [required]="true" />
        <ui-radio-group label="Con error"    [options]="tipoCredito" errorMessage="Selecciona una opción" />
        <ui-radio-group label="Deshabilitado" [options]="tipoCredito" [disabled]="true" />
        <ui-radio-group label="Horizontal"   [options]="genero" direction="horizontal" />
      </div>
    `,
    }),
};

// ── Con Reactive Forms ────────────────────────────────────────────────────────
export const ConReactiveForms: Story = {
    decorators: [moduleMetadata({ imports: [RadioGroupComponent, ReactiveFormsModule] })],
    render: () => {
        const control = new FormControl(null, [Validators.required]);
        return {
            props: { control, tipoCredito },
            template: `
        <div style="max-width:400px;display:flex;flex-direction:column;gap:16px">
          <ui-radio-group
            label="Tipo de crédito"
            hint="Vinculado con FormControl"
            [required]="true"
            [options]="tipoCredito"
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
    decorators: [moduleMetadata({ imports: [RadioGroupComponent] })],
    render: () => ({
        props: { tipoCredito, plazo, genero },
        template: `
      <div style="max-width:480px;padding:32px;background:#f9fafb;border-radius:12px;display:flex;flex-direction:column;gap:28px">
        <h3 style="margin:0;font-size:1rem;color:#111827">Solicitud de crédito</h3>
        <ui-radio-group
          label="¿Qué tipo de crédito necesitas?"
          [required]="true"
          [options]="tipoCredito"
        />
        <ui-radio-group
          label="Plazo de pago"
          hint="Entre más largo el plazo, menor la mensualidad"
          direction="horizontal"
          [options]="plazo"
        />
        <ui-radio-group
          label="Género"
          direction="horizontal"
          [options]="genero"
        />
      </div>
    `,
    }),
};