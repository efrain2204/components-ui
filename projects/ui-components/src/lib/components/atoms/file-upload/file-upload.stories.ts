import { Meta, StoryObj, applicationConfig, moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';
import { FileUploadComponent } from './file-upload.component';

const meta: Meta<FileUploadComponent> = {
    title: 'Atoms/FileUpload',
    component: FileUploadComponent,
    decorators: [
        applicationConfig({
            providers: [provideAnimations(), importProvidersFrom(ReactiveFormsModule)],
        }),
        moduleMetadata({
            imports: [FileUploadComponent, ReactiveFormsModule],
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
        accept: {
            control: 'text',
            description: 'Tipos MIME aceptados (ej: image/*, .pdf)',
        },
        multiple: {
            control: 'boolean',
            description: 'Permite seleccionar múltiples archivos',
        },
        maxSizeMb: {
            control: 'number',
            description: 'Tamaño máximo por archivo en MB (0 = sin límite)',
        },
        dropzone: {
            control: 'boolean',
            description: 'Muestra zona drag & drop (false = solo botón)',
        },
        size: {
            control: 'radio',
            options: ['sm', 'md', 'lg'],
            description: 'Tamaño del componente',
        },
        filesChange: {
            action: 'filesChange',
            description: 'Emite el array de archivos seleccionados',
        },
    },
    args: {
        label: 'Subir documento',
        hint: '',
        errorMessage: '',
        required: false,
        disabled: false,
        accept: '*/*',
        multiple: false,
        maxSizeMb: 0,
        dropzone: true,
        size: 'md',
    },
};

export default meta;
type Story = StoryObj<FileUploadComponent>;

// ── Default ───────────────────────────────────────────────────────────────────
export const Default: Story = {
    args: { label: 'Subir documento' },
};

// ── Solo imágenes ─────────────────────────────────────────────────────────────
export const SoloImagenes: Story = {
    args: {
        label: 'Fotografía del solicitante',
        accept: 'image/*',
        hint: 'Formatos: JPG, PNG, WEBP',
        maxSizeMb: 5,
    },
};

// ── Solo PDF ──────────────────────────────────────────────────────────────────
export const SoloPDF: Story = {
    args: {
        label: 'Comprobante de ingresos',
        accept: '.pdf',
        hint: 'Solo archivos PDF · Máx 10 MB',
        maxSizeMb: 10,
    },
};

// ── Múltiples archivos ────────────────────────────────────────────────────────
export const Multiples: Story = {
    args: {
        label: 'Documentos del expediente',
        multiple: true,
        accept: 'image/*,.pdf',
        hint: 'Puedes subir varios archivos a la vez',
        maxSizeMb: 10,
    },
};

// ── Requerido ─────────────────────────────────────────────────────────────────
export const Required: Story = {
    args: {
        label: 'Identificación oficial (INE)',
        required: true,
        accept: 'image/*,.pdf',
        hint: 'Frente y vuelta de tu identificación',
    },
};

// ── Con error ─────────────────────────────────────────────────────────────────
export const ConError: Story = {
    args: {
        label: 'Identificación oficial',
        required: true,
        errorMessage: 'Debes subir tu identificación para continuar',
    },
};

// ── Disabled ──────────────────────────────────────────────────────────────────
export const Disabled: Story = {
    args: {
        label: 'Documento verificado',
        disabled: true,
        hint: 'No puedes modificar este campo',
    },
};

// ── Sin dropzone (solo botón) ─────────────────────────────────────────────────
export const SoloBoton: Story = {
    args: {
        label: 'Comprobante de domicilio',
        dropzone: false,
        accept: 'image/*,.pdf',
        maxSizeMb: 5,
    },
};

// ── Tamaños ───────────────────────────────────────────────────────────────────
export const Sizes: Story = {
    decorators: [moduleMetadata({ imports: [FileUploadComponent] })],
    render: () => ({
        template: `
      <div style="display:flex;flex-direction:column;gap:24px;max-width:480px">
        <ui-file-upload label="Small"  size="sm" />
        <ui-file-upload label="Medium" size="md" />
        <ui-file-upload label="Large"  size="lg" />
      </div>
    `,
    }),
};

// ── Todos los estados ─────────────────────────────────────────────────────────
export const AllStates: Story = {
    decorators: [moduleMetadata({ imports: [FileUploadComponent] })],
    render: () => ({
        template: `
      <div style="display:flex;flex-direction:column;gap:24px;max-width:480px">
        <ui-file-upload label="Default" />
        <ui-file-upload label="Con hint" hint="Sube tu documento aquí" />
        <ui-file-upload label="Requerido" [required]="true" />
        <ui-file-upload label="Con error" errorMessage="Este archivo es requerido" />
        <ui-file-upload label="Solo botón" [dropzone]="false" />
        <ui-file-upload label="Deshabilitado" [disabled]="true" />
      </div>
    `,
    }),
};

// ── Con Reactive Forms ────────────────────────────────────────────────────────
export const ConReactiveForms: Story = {
    decorators: [moduleMetadata({ imports: [FileUploadComponent, ReactiveFormsModule] })],
    render: () => {
        const control = new FormControl([]);
        return {
            props: { control },
            template: `
        <div style="max-width:480px;display:flex;flex-direction:column;gap:16px">
          <ui-file-upload
            label="Documento de identidad"
            hint="Vinculado con FormControl"
            accept="image/*,.pdf"
            [maxSizeMb]="10"
            [formControl]="control"
          />
          <p style="font-size:12px;color:#6b7280">
            Archivos: <strong>{{ control.value?.length ?? 0 }}</strong>
          </p>
        </div>
      `,
        };
    },
};

// ── Uso fintech: Onboarding ───────────────────────────────────────────────────
export const FintechOnboarding: Story = {
    decorators: [moduleMetadata({ imports: [FileUploadComponent] })],
    render: () => ({
        template: `
      <div style="max-width:480px;padding:32px;background:#f9fafb;border-radius:12px;display:flex;flex-direction:column;gap:24px">
        <h3 style="margin:0;font-size:1rem;color:#111827">Carga de documentos</h3>
        <ui-file-upload
          label="Identificación oficial (INE / Pasaporte)"
          [required]="true"
          accept="image/*,.pdf"
          [maxSizeMb]="5"
          [multiple]="true"
          hint="Sube frente y vuelta de tu identificación"
        />
        <ui-file-upload
          label="Comprobante de domicilio"
          [required]="true"
          accept="image/*,.pdf"
          [maxSizeMb]="5"
          hint="No mayor a 3 meses de antigüedad"
        />
        <ui-file-upload
          label="Comprobante de ingresos"
          [required]="true"
          accept=".pdf,image/*"
          [maxSizeMb]="10"
          [multiple]="true"
          hint="Últimos 3 estados de cuenta o recibos de nómina"
          size="lg"
        />
      </div>
    `,
    }),
};