export interface UserPerfil {
  user: {
    id: number;
    username: string;
    email: string;
    email_verified_at?: string;
    profile_photo_path?: string | null;
    persona_id: number;
    tipo_id: number;
    verification_code?: string | null;
    verification_code_expires_at?: string | null;
    created_at: string;
    updated_at: string;
    deleted_at?: string | null;
    persona: {
      id: number;
      nombre: string;
      apellido_paterno: string;
      apellido_materno: string;
      sexo: string;
      created_at: string;
      updated_at: string;
      deleted_at?: string | null;
    };
  };
}