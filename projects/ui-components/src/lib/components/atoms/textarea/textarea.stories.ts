import { Meta, StoryObj, applicationConfig, moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';
import { TextareaComponent } from './textarea.component';

const meta: Meta<TextareaComponent> = {
  title: 'Atoms/Textarea',
  component: TextareaComponent,
  decorators: [
    applicationConfig({
      providers: [provideAnimations(), importProvidersFrom(ReactiveFormsModule)],
    }),
    moduleMetadata({
      imports: [TextareaComponent, ReactiveFormsModule],
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
    rows: {
      control: 'number',
      description: 'Número de filas iniciales',
    },
    maxLength: {
      control: 'number',
      description: 'Máximo de caracteres (0 = sin límite)',
    },
    resize: {
      control: 'radio',
      options: ['none', 'vertical', 'both'],
      description: 'Permite redimensionar',
    },
    autoResize: {
      control: 'boolean',
      description: 'Crece automáticamente con el contenido',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño del componente',
    },
    valueChange: {
      action: 'valueChange',
      description: 'Emite el valor en cada keystroke',
    },
  },
  args: {
    label: 'Observaciones',
    placeholder: 'Escribe aquí...',
    hint: '',
    errorMessage: '',
    required: false,
    disabled: false,
    rows: 4,
    maxLength: 0,
    resize: 'vertical',
    autoResize: false,
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<TextareaComponent>;

// ── Default ───────────────────────────────────────────────────────────────────
export const Default: Story = {
  args: {
    label: 'Observaciones',
    placeholder: 'Escribe aquí...',
  },
};

// ── Con hint ──────────────────────────────────────────────────────────────────
export const ConHint: Story = {
  args: {
    label: 'Descripción del bien',
    placeholder: 'Describe el bien a hipotecar...',
    hint: 'Sé lo más detallado posible',
  },
};

// ── Requerido ─────────────────────────────────────────────────────────────────
export const Required: Story = {
  args: {
    label: 'Motivo del crédito',
    required: true,
    placeholder: '¿Para qué usarás el crédito?',
  },
};

// ── Con error ─────────────────────────────────────────────────────────────────
export const ConError: Story = {
  args: {
    label: 'Motivo del crédito',
    required: true,
    errorMessage: 'Este campo es requerido',
  },
};

// ── Disabled ──────────────────────────────────────────────────────────────────
export const Disabled: Story = {
  args: {
    label: 'Notas del asesor',
    disabled: true,
    placeholder: 'Campo solo lectura',
  },
};

// ── Con contador de caracteres ────────────────────────────────────────────────
export const ConContador: Story = {
  args: {
    label: 'Motivo del crédito',
    placeholder: 'Máximo 200 caracteres...',
    hint: 'Sé conciso y claro',
    maxLength: 200,
    rows: 3,
  },
};

// ── Auto resize ───────────────────────────────────────────────────────────────
export const AutoResize: Story = {
  args: {
    label: 'Observaciones del solicitante',
    placeholder: 'Escribe y el campo crecerá automáticamente...',
    hint: 'El área crece conforme escribes',
    autoResize: true,
    rows: 2,
  },
};

// ── Sin resize ────────────────────────────────────────────────────────────────
export const SinResize: Story = {
  args: {
    label: 'Comentarios',
    placeholder: 'Campo de tamaño fijo...',
    resize: 'none',
    rows: 3,
  },
};

// ── Tamaños ───────────────────────────────────────────────────────────────────
export const Sizes: Story = {
  decorators: [moduleMetadata({ imports: [TextareaComponent] })],
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;max-width:480px">
        <ui-textarea label="Small"  size="sm" placeholder="Small..." [rows]="2" />
        <ui-textarea label="Medium" size="md" placeholder="Medium..." [rows]="3" />
        <ui-textarea label="Large"  size="lg" placeholder="Large..." [rows]="4" />
      </div>
    `,
  }),
};

// ── Todos los estados ─────────────────────────────────────────────────────────
export const AllStates: Story = {
  decorators: [moduleMetadata({ imports: [TextareaComponent] })],
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:24px;max-width:480px">
        <ui-textarea label="Default"       placeholder="Escribe..." [rows]="2" />
        <ui-textarea label="Con hint"      placeholder="Con hint..." hint="Texto de ayuda" [rows]="2" />
        <ui-textarea label="Requerido"     [required]="true" [rows]="2" />
        <ui-textarea label="Con contador"  [maxLength]="150" placeholder="Máx 150 chars" [rows]="2" />
        <ui-textarea label="Auto resize"   [autoResize]="true" placeholder="Crece al escribir..." [rows]="2" />
        <ui-textarea label="Con error"     errorMessage="Este campo es requerido" [rows]="2" />
        <ui-textarea label="Deshabilitado" [disabled]="true" [rows]="2" />
      </div>
    `,
  }),
};

// ── Con Reactive Forms ────────────────────────────────────────────────────────
export const ConReactiveForms: Story = {
  decorators: [moduleMetadata({ imports: [TextareaComponent, ReactiveFormsModule] })],
  render: () => {
    const control = new FormControl('', [Validators.required, Validators.minLength(20)]);
    return {
      props: { control },
      template: `
        <div style="max-width:480px;display:flex;flex-direction:column;gap:16px">
          <ui-textarea
            label="Motivo del crédito"
            placeholder="Mínimo 20 caracteres..."
            hint="Vinculado con FormControl"
            [required]="true"
            [maxLength]="300"
            [rows]="4"
            [formControl]="control"
          />
          <p style="font-size:12px;color:#6b7280">
            Estado: <strong>{{ control.valid ? 'válido' : 'inválido' }}</strong> |
            Caracteres: <strong>{{ control.value?.length ?? 0 }}</strong>
          </p>
        </div>
      `,
    };
  },
};

// ── Uso fintech: Onboarding ───────────────────────────────────────────────────
export const FintechOnboarding: Story = {
  decorators: [moduleMetadata({ imports: [TextareaComponent] })],
  render: () => ({
    template: `
      <div style="max-width:480px;padding:32px;background:#f9fafb;border-radius:12px;display:flex;flex-direction:column;gap:24px">
        <h3 style="margin:0;font-size:1rem;color:#111827">Información adicional</h3>
        <ui-textarea
          label="Motivo del crédito"
          placeholder="¿Para qué destinarás el crédito?"
          hint="Sé específico, esto agiliza la aprobación"
          [required]="true"
          [maxLength]="300"
          [rows]="3"
        />
        <ui-textarea
          label="Referencias adicionales"
          placeholder="Nombre, parentesco y teléfono de contacto..."
          [maxLength]="200"
          [rows]="3"
          [autoResize]="true"
        />
        <ui-textarea
          label="Observaciones del asesor"
          placeholder="Notas internas..."
          [rows]="2"
          resize="none"
        />
      </div>
    `,
  }),
};