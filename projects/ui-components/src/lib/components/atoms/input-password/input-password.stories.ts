import { Meta, StoryObj, applicationConfig, moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';
import { InputPasswordComponent } from './input-password.component';

const meta: Meta<InputPasswordComponent> = {
    title: 'Atoms/InputPassword',
    component: InputPasswordComponent,
    decorators: [
        applicationConfig({
            providers: [provideAnimations(), importProvidersFrom(ReactiveFormsModule)],
        }),
        moduleMetadata({
            imports: [InputPasswordComponent, ReactiveFormsModule],
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
        showStrength: {
            control: 'boolean',
            description: 'Muestra barra de fortaleza',
        },
        showRules: {
            control: 'boolean',
            description: 'Muestra requisitos al enfocar',
        },
        minLength: {
            control: 'number',
            description: 'Mínimo de caracteres',
        },
        size: {
            control: 'radio',
            options: ['sm', 'md', 'lg'],
            description: 'Tamaño del componente',
        },
        passwordChange: {
            action: 'passwordChange',
            description: 'Emite el valor en cada keystroke',
        },
    },
    args: {
        label: 'Contraseña',
        placeholder: 'Ingresa tu contraseña',
        hint: '',
        errorMessage: '',
        required: false,
        disabled: false,
        showStrength: false,
        showRules: false,
        minLength: 8,
        size: 'md',
    },
};

export default meta;
type Story = StoryObj<InputPasswordComponent>;

// ── Default ───────────────────────────────────────────────────────────────────
export const Default: Story = {
    args: { label: 'Contraseña' },
};

// ── Con hint ──────────────────────────────────────────────────────────────────
export const ConHint: Story = {
    args: {
        label: 'Contraseña',
        hint: 'Tu contraseña debe tener al menos 8 caracteres',
    },
};

// ── Requerido ─────────────────────────────────────────────────────────────────
export const Required: Story = {
    args: {
        label: 'Contraseña',
        required: true,
        hint: 'Este campo es obligatorio',
    },
};

// ── Con error ─────────────────────────────────────────────────────────────────
export const ConError: Story = {
    args: {
        label: 'Contraseña',
        errorMessage: 'La contraseña ingresada es incorrecta',
    },
};

// ── Disabled ──────────────────────────────────────────────────────────────────
export const Disabled: Story = {
    args: {
        label: 'Contraseña',
        disabled: true,
        hint: 'Campo deshabilitado',
    },
};

// ── Con fortaleza ─────────────────────────────────────────────────────────────
export const ConFortaleza: Story = {
    args: {
        label: 'Crear contraseña',
        showStrength: true,
        hint: 'Escribe algo para ver la fortaleza',
    },
};

// ── Con reglas ────────────────────────────────────────────────────────────────
export const ConReglas: Story = {
    args: {
        label: 'Crear contraseña',
        showRules: true,
        hint: 'Haz click en el campo para ver los requisitos',
    },
};

// ── Fortaleza + Reglas ────────────────────────────────────────────────────────
export const FortalezaYReglas: Story = {
    args: {
        label: 'Nueva contraseña',
        showStrength: true,
        showRules: true,
        required: true,
    },
};

// ── Tamaños ───────────────────────────────────────────────────────────────────
export const Sizes: Story = {
    decorators: [moduleMetadata({ imports: [InputPasswordComponent] })],
    render: () => ({
        template: `
      <div style="display:flex;flex-direction:column;gap:24px;max-width:400px">
        <ui-input-password label="Small"  size="sm" />
        <ui-input-password label="Medium" size="md" />
        <ui-input-password label="Large"  size="lg" />
      </div>
    `,
    }),
};

// ── Todos los estados ─────────────────────────────────────────────────────────
export const AllStates: Story = {
    decorators: [moduleMetadata({ imports: [InputPasswordComponent] })],
    render: () => ({
        template: `
      <div style="display:flex;flex-direction:column;gap:24px;max-width:400px">
        <ui-input-password label="Default"         />
        <ui-input-password label="Con hint"        hint="Mínimo 8 caracteres" />
        <ui-input-password label="Con fortaleza"   [showStrength]="true" />
        <ui-input-password label="Con reglas"      [showRules]="true" />
        <ui-input-password label="Requerido"       [required]="true" />
        <ui-input-password label="Con error"       errorMessage="Contraseña incorrecta" />
        <ui-input-password label="Deshabilitado"   [disabled]="true" />
      </div>
    `,
    }),
};

// ── Con Reactive Forms ────────────────────────────────────────────────────────
export const ConReactiveForms: Story = {
    decorators: [moduleMetadata({ imports: [InputPasswordComponent, ReactiveFormsModule] })],
    render: () => {
        const control = new FormControl('', [
            Validators.required,
            Validators.minLength(8),
        ]);
        return {
            props: { control },
            template: `
        <div style="max-width:400px;display:flex;flex-direction:column;gap:16px">
          <ui-input-password
            label="Contraseña"
            placeholder="Mínimo 8 caracteres"
            [required]="true"
            [showStrength]="true"
            [showRules]="true"
            hint="Vinculado con FormControl"
            [formControl]="control"
          />
          <p style="font-size:12px;color:#6b7280">
            Estado: <strong>{{ control.valid ? 'válido' : 'inválido' }}</strong> |
            Largo: <strong>{{ control.value?.length ?? 0 }} caracteres</strong>
          </p>
        </div>
      `,
        };
    },
};

// ── Uso fintech: Onboarding ───────────────────────────────────────────────────
export const FintechOnboarding: Story = {
    decorators: [moduleMetadata({ imports: [InputPasswordComponent] })],
    render: () => ({
        template: `
      <div style="max-width:480px;padding:32px;background:#f9fafb;border-radius:12px;display:flex;flex-direction:column;gap:20px">
        <h3 style="margin:0;font-size:1rem;color:#111827">Crear cuenta</h3>
        <ui-input-password
          label="Contraseña"
          placeholder="Crea una contraseña segura"
          [required]="true"
          [showStrength]="true"
          [showRules]="true"
          [minLength]="8"
          size="md"
        />
        <ui-input-password
          label="Confirmar contraseña"
          placeholder="Repite tu contraseña"
          [required]="true"
          hint="Debe coincidir con la contraseña ingresada"
        />
      </div>
    `,
    }),
};