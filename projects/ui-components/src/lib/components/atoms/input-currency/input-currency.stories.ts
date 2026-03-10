import { Meta, StoryObj, applicationConfig, moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';
import { InputCurrencyComponent, CURRENCIES } from './input-currency.component';

const meta: Meta<InputCurrencyComponent> = {
  title: 'Atoms/InputCurrency',
  component: InputCurrencyComponent,
  decorators: [
    applicationConfig({
      providers: [provideAnimations(), importProvidersFrom(ReactiveFormsModule)],
    }),
    moduleMetadata({
      imports: [InputCurrencyComponent, ReactiveFormsModule],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Etiqueta del campo',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder',
    },
    hint: {
      control: 'text',
      description: 'Texto de ayuda',
    },
    errorMessage: {
      control: 'text',
      description: 'Mensaje de error externo',
    },
    required: {
      control: 'boolean',
      description: 'Campo obligatorio',
    },
    disabled: {
      control: 'boolean',
      description: 'Deshabilita el campo',
    },
    defaultCurrency: {
      control: 'radio',
      options: ['PEN', 'USD'],
      description: 'Moneda por defecto',
    },
    min: {
      control: 'number',
      description: 'Monto mínimo permitido (0 = sin límite)',
    },
    max: {
      control: 'number',
      description: 'Monto máximo permitido (0 = sin límite)',
    },
    decimals: {
      control: 'number',
      description: 'Número de decimales',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño del componente',
    },
    amountChange: { action: 'amountChange', description: 'Emite el monto numérico al cambiar' },
    currencyChange: { action: 'currencyChange', description: 'Emite la moneda seleccionada' },
  },
  args: {
    label: 'Monto',
    placeholder: '0.00',
    hint: '',
    errorMessage: '',
    required: false,
    disabled: false,
    defaultCurrency: 'PEN',
    min: 0,
    max: 0,
    decimals: 2,
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<InputCurrencyComponent>;

// ── Default (Soles) ───────────────────────────────────────────────────────────
export const DefaultSoles: Story = {
  args: {
    label: 'Monto del crédito',
    defaultCurrency: 'PEN',
    hint: 'Ingresa el monto en soles peruanos',
  },
};

// ── Default (Dólares) ─────────────────────────────────────────────────────────
export const DefaultDolares: Story = {
  args: {
    label: 'Monto del crédito',
    defaultCurrency: 'USD',
    hint: 'Ingresa el monto en dólares americanos',
  },
};

// ── Con límites ───────────────────────────────────────────────────────────────
export const ConLimites: Story = {
  args: {
    label: 'Monto solicitado',
    defaultCurrency: 'PEN',
    min: 500,
    max: 150000,
    hint: 'Entre S/ 500.00 y S/ 150,000.00',
  },
};

// ── Requerido ─────────────────────────────────────────────────────────────────
export const Required: Story = {
  args: {
    label: 'Monto del préstamo',
    required: true,
    defaultCurrency: 'PEN',
    hint: 'Este campo es obligatorio',
  },
};

// ── Con error ─────────────────────────────────────────────────────────────────
export const ConError: Story = {
  args: {
    label: 'Monto del préstamo',
    required: true,
    defaultCurrency: 'PEN',
    errorMessage: 'El monto ingresado no es válido',
  },
};

// ── Disabled ──────────────────────────────────────────────────────────────────
export const Disabled: Story = {
  args: {
    label: 'Monto aprobado',
    disabled: true,
    defaultCurrency: 'PEN',
    hint: 'Este monto fue determinado por el sistema',
  },
};

// ── Sin decimales (enteros) ───────────────────────────────────────────────────
export const SinDecimales: Story = {
  args: {
    label: 'Número de cuotas',
    decimals: 0,
    hint: 'Ingresa un número entero',
  },
};

// ── Tamaños ───────────────────────────────────────────────────────────────────
export const Sizes: Story = {
  decorators: [moduleMetadata({ imports: [InputCurrencyComponent] })],
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;max-width:400px">
        <ui-input-currency label="Small"  size="sm" />
        <ui-input-currency label="Medium" size="md" />
        <ui-input-currency label="Large"  size="lg" />
      </div>
    `,
  }),
};

// ── Todos los estados ─────────────────────────────────────────────────────────
export const AllStates: Story = {
  decorators: [moduleMetadata({ imports: [InputCurrencyComponent] })],
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;max-width:400px">
        <ui-input-currency label="Soles"        defaultCurrency="PEN" />
        <ui-input-currency label="Dólares"      defaultCurrency="USD" />
        <ui-input-currency label="Con límites"  defaultCurrency="PEN" [min]="500" [max]="150000" hint="S/ 500 – S/ 150,000" />
        <ui-input-currency label="Requerido"    [required]="true" />
        <ui-input-currency label="Con error"    errorMessage="Monto no válido" />
        <ui-input-currency label="Deshabilitado" [disabled]="true" />
      </div>
    `,
  }),
};

// ── Con Reactive Forms ────────────────────────────────────────────────────────
export const ConReactiveForms: Story = {
  decorators: [moduleMetadata({ imports: [InputCurrencyComponent, ReactiveFormsModule] })],
  render: () => {
    const control = new FormControl(null, [Validators.required, Validators.min(100)]);
    return {
      props: { control },
      template: `
        <div style="max-width:400px;display:flex;flex-direction:column;gap:16px">
          <ui-input-currency
            label="Monto del crédito"
            hint="Vinculado con FormControl · Mínimo S/ 100"
            [required]="true"
            [min]="100"
            defaultCurrency="PEN"
            [formControl]="control"
          />
          <p style="font-size:12px;color:#6b7280">
            Estado: <strong>{{ control.valid ? 'válido' : 'inválido' }}</strong> |
            Valor: <strong>{{ control.value ?? 'vacío' }}</strong>
          </p>
        </div>
      `,
    };
  },
};

// ── Uso fintech: Onboarding ───────────────────────────────────────────────────
export const FintechOnboarding: Story = {
  decorators: [moduleMetadata({ imports: [InputCurrencyComponent] })],
  render: () => ({
    template: `
      <div style="max-width:480px;padding:32px;background:#f9fafb;border-radius:12px;display:flex;flex-direction:column;gap:20px">
        <h3 style="margin:0;font-size:1rem;color:#111827">Simulador de crédito</h3>
        <ui-input-currency
          label="Monto solicitado"
          [required]="true"
          defaultCurrency="PEN"
          [min]="500"
          [max]="150000"
          hint="Entre S/ 500.00 y S/ 150,000.00"
          size="lg"
        />
        <ui-input-currency
          label="Ingresos mensuales"
          [required]="true"
          defaultCurrency="PEN"
          [min]="930"
          hint="Mínimo S/ 930.00 (sueldo mínimo)"
        />
        <ui-input-currency
          label="Monto en dólares (referencial)"
          defaultCurrency="USD"
          [disabled]="false"
          hint="Equivalente aproximado en USD"
        />
      </div>
    `,
  }),
};