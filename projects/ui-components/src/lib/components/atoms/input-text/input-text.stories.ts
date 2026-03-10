import { Meta, StoryObj, applicationConfig, moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';
import { InputTextComponent } from './input-text.component';

const meta: Meta<InputTextComponent> = {
    title: 'Atoms/InputText',
    component: InputTextComponent,
    decorators: [
        applicationConfig({
            providers: [provideAnimations(), importProvidersFrom(ReactiveFormsModule)],
        }),
        moduleMetadata({
            imports: [InputTextComponent, ReactiveFormsModule],
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
        clearable: {
            control: 'boolean',
            description: 'Muestra botón para limpiar el campo',
        },
        showCounter: {
            control: 'boolean',
            description: 'Muestra contador de caracteres',
        },
        maxLength: {
            control: 'number',
            description: 'Máximo de caracteres (0 = sin límite)',
        },
        type: {
            control: 'radio',
            options: ['text', 'email', 'number', 'tel', 'url'],
            description: 'Tipo de input HTML',
        },
        prefixIcon: {
            control: 'radio',
            options: ['', 'user', 'email', 'phone', 'globe', 'id', 'search'],
            description: 'Ícono prefijo',
        },
        prefixText: {
            control: 'text',
            description: 'Texto fijo de prefijo (ej: +51)',
        },
        suffixText: {
            control: 'text',
            description: 'Texto fijo de sufijo (ej: @gmail.com)',
        },
        size: {
            control: 'radio',
            options: ['sm', 'md', 'lg'],
            description: 'Tamaño del componente',
        },
        valueChange: { action: 'valueChange', description: 'Emite el valor en cada keystroke' },
        enterPressed: { action: 'enterPressed', description: 'Emite el valor al presionar Enter' },
    },
    args: {
        label: 'Nombre completo',
        placeholder: 'Ingresa tu nombre',
        hint: '',
        errorMessage: '',
        required: false,
        disabled: false,
        clearable: false,
        showCounter: false,
        maxLength: 0,
        type: 'text',
        prefixIcon: '',
        prefixText: '',
        suffixText: '',
        size: 'md',
    },
};

export default meta;
type Story = StoryObj<InputTextComponent>;

// ── Default ───────────────────────────────────────────────────────────────────
export const Default: Story = {
    args: { label: 'Nombre completo', placeholder: 'Ingresa tu nombre completo' },
};

// ── Con hint ──────────────────────────────────────────────────────────────────
export const ConHint: Story = {
    args: {
        label: 'Correo electrónico',
        placeholder: 'usuario@ejemplo.com',
        type: 'email',
        prefixIcon: 'email',
        hint: 'Usa el correo registrado en tu identificación',
    },
};

// ── Requerido ─────────────────────────────────────────────────────────────────
export const Required: Story = {
    args: {
        label: 'Nombre completo',
        required: true,
        prefixIcon: 'user',
    },
};

// ── Con error ─────────────────────────────────────────────────────────────────
export const ConError: Story = {
    args: {
        label: 'Correo electrónico',
        type: 'email',
        prefixIcon: 'email',
        errorMessage: 'El correo ingresado no es válido',
    },
};

// ── Disabled ──────────────────────────────────────────────────────────────────
export const Disabled: Story = {
    args: {
        label: 'Nombre completo',
        disabled: true,
        hint: 'Campo de solo lectura',
    },
};

// ── Limpiable ─────────────────────────────────────────────────────────────────
export const Clearable: Story = {
    args: {
        label: 'Buscar',
        prefixIcon: 'search',
        clearable: true,
        placeholder: 'Escribe algo para buscar...',
    },
};

// ── Con contador ──────────────────────────────────────────────────────────────
export const ConContador: Story = {
    args: {
        label: 'Nombre completo',
        maxLength: 80,
        showCounter: true,
        hint: 'Ingresa tu nombre tal como aparece en tu INE',
    },
};

// ── Con prefijo texto ─────────────────────────────────────────────────────────
export const ConPrefijoTexto: Story = {
    args: {
        label: 'Sitio web',
        type: 'url',
        prefixText: 'https://',
        placeholder: 'miempresa.com',
        hint: 'Sin incluir el protocolo',
    },
};

// ── Con sufijo texto ──────────────────────────────────────────────────────────
export const ConSufijoTexto: Story = {
    args: {
        label: 'Usuario',
        prefixIcon: 'user',
        suffixText: '@empresa.com',
        placeholder: 'nombre.apellido',
    },
};

// ── Todos los íconos ──────────────────────────────────────────────────────────
export const TodosLosIconos: Story = {
    decorators: [moduleMetadata({ imports: [InputTextComponent] })],
    render: () => ({
        template: `
      <div style="display:flex;flex-direction:column;gap:16px;max-width:400px">
        <ui-input-text label="Nombre"   prefixIcon="user"   placeholder="Juan Pérez" />
        <ui-input-text label="Email"    prefixIcon="email"  placeholder="correo@ejemplo.com" type="email" />
        <ui-input-text label="Teléfono" prefixIcon="phone"  placeholder="999 000 000" type="tel" />
        <ui-input-text label="Sitio web" prefixIcon="globe" placeholder="ejemplo.com" type="url" />
        <ui-input-text label="DNI / ID" prefixIcon="id"    placeholder="12345678" />
        <ui-input-text label="Buscar"   prefixIcon="search" placeholder="Buscar..." [clearable]="true" />
      </div>
    `,
    }),
};

// ── Tamaños ───────────────────────────────────────────────────────────────────
export const Sizes: Story = {
    decorators: [moduleMetadata({ imports: [InputTextComponent] })],
    render: () => ({
        template: `
      <div style="display:flex;flex-direction:column;gap:24px;max-width:400px">
        <ui-input-text label="Small"  size="sm" prefixIcon="user" placeholder="Small..." />
        <ui-input-text label="Medium" size="md" prefixIcon="user" placeholder="Medium..." />
        <ui-input-text label="Large"  size="lg" prefixIcon="user" placeholder="Large..." />
      </div>
    `,
    }),
};

// ── Todos los estados ─────────────────────────────────────────────────────────
export const AllStates: Story = {
    decorators: [moduleMetadata({ imports: [InputTextComponent] })],
    render: () => ({
        template: `
      <div style="display:flex;flex-direction:column;gap:24px;max-width:400px">
        <ui-input-text label="Default"       placeholder="Texto..." />
        <ui-input-text label="Con ícono"     prefixIcon="user" placeholder="Con ícono..." />
        <ui-input-text label="Limpiable"     prefixIcon="search" [clearable]="true" placeholder="Buscar..." />
        <ui-input-text label="Con contador"  [maxLength]="60" [showCounter]="true" />
        <ui-input-text label="Prefijo texto" prefixText="+51" placeholder="999 000 000" />
        <ui-input-text label="Sufijo texto"  suffixText="@gmail.com" placeholder="usuario" />
        <ui-input-text label="Requerido"     [required]="true" />
        <ui-input-text label="Con error"     errorMessage="Campo requerido" />
        <ui-input-text label="Deshabilitado" [disabled]="true" />
      </div>
    `,
    }),
};

// ── Con Reactive Forms ────────────────────────────────────────────────────────
export const ConReactiveForms: Story = {
    decorators: [moduleMetadata({ imports: [InputTextComponent, ReactiveFormsModule] })],
    render: () => {
        const control = new FormControl('', [Validators.required, Validators.minLength(3)]);
        return {
            props: { control },
            template: `
        <div style="max-width:400px;display:flex;flex-direction:column;gap:16px">
          <ui-input-text
            label="Nombre completo"
            placeholder="Ingresa tu nombre"
            prefixIcon="user"
            [required]="true"
            [maxLength]="80"
            [showCounter]="true"
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
    decorators: [moduleMetadata({ imports: [InputTextComponent] })],
    render: () => ({
        template: `
      <div style="max-width:480px;padding:32px;background:#f9fafb;border-radius:12px;display:flex;flex-direction:column;gap:20px">
        <h3 style="margin:0;font-size:1rem;color:#111827">Datos personales</h3>
        <ui-input-text
          label="Nombre completo"
          prefixIcon="user"
          [required]="true"
          placeholder="Como aparece en tu DNI"
          [maxLength]="80"
          [showCounter]="true"
        />
        <ui-input-text
          label="DNI / Documento de identidad"
          prefixIcon="id"
          [required]="true"
          placeholder="Número de documento"
          [maxLength]="12"
        />
        <ui-input-text
          label="Correo electrónico"
          type="email"
          prefixIcon="email"
          [required]="true"
          placeholder="correo@ejemplo.com"
          hint="Recibirás actualizaciones de tu solicitud"
          [clearable]="true"
        />
        <ui-input-text
          label="Teléfono celular"
          type="tel"
          prefixText="+51"
          [required]="true"
          placeholder="999 000 000"
        />
      </div>
    `,
    }),
};