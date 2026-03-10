import { Meta, StoryObj, applicationConfig, moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';
import { SignaturePadComponent } from './signature-pad.component';

const meta: Meta<SignaturePadComponent> = {
    title: 'Atoms/SignaturePad',
    component: SignaturePadComponent,
    decorators: [
        applicationConfig({
            providers: [provideAnimations(), importProvidersFrom(ReactiveFormsModule)],
        }),
        moduleMetadata({
            imports: [SignaturePadComponent, ReactiveFormsModule],
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
        required: {
            control: 'boolean',
            description: 'Campo obligatorio',
        },
        disabled: {
            control: 'boolean',
            description: 'Deshabilita el campo',
        },
        strokeColor: {
            control: 'color',
            description: 'Color del trazo',
        },
        strokeWidth: {
            control: 'number',
            description: 'Grosor del trazo',
        },
        height: {
            control: 'number',
            description: 'Altura del canvas en px',
        },
        size: {
            control: 'radio',
            options: ['sm', 'md', 'lg'],
            description: 'Tamaño del componente',
        },
        signatureChange: {
            action: 'signatureChange',
            description: 'Emite el base64 de la firma al terminar de dibujar',
        },
    },
    args: {
        label: 'Firma digital',
        hint: '',
        errorMessage: '',
        required: false,
        disabled: false,
        strokeColor: '#111827',
        strokeWidth: 2.5,
        height: 160,
        size: 'md',
    },
};

export default meta;
type Story = StoryObj<SignaturePadComponent>;

// ── Default ───────────────────────────────────────────────────────────────────
export const Default: Story = {
    args: {
        label: 'Firma del solicitante',
        hint: 'Dibuja tu firma dentro del recuadro',
    },
};

// ── Requerido ─────────────────────────────────────────────────────────────────
export const Required: Story = {
    args: {
        label: 'Firma del solicitante',
        required: true,
        hint: 'La firma es obligatoria para continuar',
    },
};

// ── Con error ─────────────────────────────────────────────────────────────────
export const ConError: Story = {
    args: {
        label: 'Firma del solicitante',
        required: true,
        errorMessage: 'Debes firmar para continuar con la solicitud',
    },
};

// ── Disabled ──────────────────────────────────────────────────────────────────
export const Disabled: Story = {
    args: {
        label: 'Firma registrada',
        disabled: true,
        hint: 'No puedes modificar esta firma',
    },
};

// ── Trazo azul ────────────────────────────────────────────────────────────────
export const TrazoAzul: Story = {
    args: {
        label: 'Firma con tinta azul',
        strokeColor: '#2563eb',
        strokeWidth: 2,
        hint: 'Simula firma con bolígrafo azul',
    },
};

// ── Trazo grueso ──────────────────────────────────────────────────────────────
export const TrazoGrueso: Story = {
    args: {
        label: 'Firma con trazo grueso',
        strokeWidth: 4,
        hint: 'Grosor de trazo aumentado',
    },
};

// ── Canvas alto ───────────────────────────────────────────────────────────────
export const CanvasAlto: Story = {
    args: {
        label: 'Firma con más espacio',
        height: 240,
        hint: 'Canvas con altura extendida',
    },
};

// ── Tamaños ───────────────────────────────────────────────────────────────────
export const Sizes: Story = {
    decorators: [moduleMetadata({ imports: [SignaturePadComponent] })],
    render: () => ({
        template: `
      <div style="display:flex;flex-direction:column;gap:24px;max-width:520px">
        <ui-signature-pad label="Small"  size="sm" />
        <ui-signature-pad label="Medium" size="md" />
        <ui-signature-pad label="Large"  size="lg" />
      </div>
    `,
    }),
};

// ── Todos los estados ─────────────────────────────────────────────────────────
export const AllStates: Story = {
    decorators: [moduleMetadata({ imports: [SignaturePadComponent] })],
    render: () => ({
        template: `
      <div style="display:flex;flex-direction:column;gap:24px;max-width:520px">
        <ui-signature-pad label="Default"      hint="Dibuja tu firma aquí" />
        <ui-signature-pad label="Requerido"    [required]="true" />
        <ui-signature-pad label="Con error"    errorMessage="Debes firmar para continuar" />
        <ui-signature-pad label="Deshabilitado" [disabled]="true" />
        <ui-signature-pad label="Trazo azul"   strokeColor="#2563eb" />
      </div>
    `,
    }),
};

// ── Con Reactive Forms ────────────────────────────────────────────────────────
export const ConReactiveForms: Story = {
    decorators: [moduleMetadata({ imports: [SignaturePadComponent, ReactiveFormsModule] })],
    render: () => {
        const control = new FormControl('', [Validators.required]);
        return {
            props: { control },
            template: `
        <div style="max-width:520px;display:flex;flex-direction:column;gap:16px">
          <ui-signature-pad
            label="Firma del solicitante"
            hint="Vinculado con FormControl"
            [required]="true"
            [formControl]="control"
          />
          <p style="font-size:12px;color:#6b7280">
            Estado: <strong>{{ control.valid ? 'firmado ✓' : 'sin firma' }}</strong> |
            Base64: <strong>{{ control.value ? control.value.slice(0, 30) + '...' : 'vacío' }}</strong>
          </p>
        </div>
      `,
        };
    },
};

// ── Uso fintech: Onboarding ───────────────────────────────────────────────────
export const FintechOnboarding: Story = {
    decorators: [moduleMetadata({ imports: [SignaturePadComponent] })],
    render: () => ({
        template: `
      <div style="max-width:520px;padding:32px;background:#f9fafb;border-radius:12px;display:flex;flex-direction:column;gap:24px">
        <div>
          <h3 style="margin:0 0 4px;font-size:1rem;color:#111827">Firma del contrato</h3>
          <p style="margin:0;font-size:0.85rem;color:#6b7280">
            Al firmar, aceptas los términos y condiciones del crédito personal
          </p>
        </div>
        <ui-signature-pad
          label="Firma del solicitante"
          [required]="true"
          hint="Dibuja tu firma tal como aparece en tu identificación oficial"
          size="lg"
          [height]="200"
        />
        <ui-signature-pad
          label="Firma del aval"
          hint="Opcional — solo si aplica para tu tipo de crédito"
          strokeColor="#2563eb"
          [height]="140"
        />
      </div>
    `,
    }),
};