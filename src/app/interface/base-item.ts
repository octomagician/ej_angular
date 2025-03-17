export interface BaseItem {
    id: number; // Propiedad común
    [key: string]: any; // Permite otras propiedades dinámicas
  }