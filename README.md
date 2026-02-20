
ng new ui-workspace --no-create-application
cd ui-workspace

ng generate library ui-components

## To create components
ng generate component button --project=ui-components

## Publicar como paquete privado

npm login
ng build ui-components

cd dist/ui-components

npm publish --access=public

## Usarlo en otro proyecto

npm install @efrain2204/ui-components

import { ButtonComponent } from '@tuusuario/ui-components';

## Cuando hagas cambios

cambiar version
projects/ui-components/package.json
ng build ui-components
cd dist/ui-components
npm publish

En proyectos usandolo:
npm update @tuusuario/ui-components