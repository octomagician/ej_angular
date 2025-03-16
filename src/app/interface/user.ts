export interface User {
  // user
  username?: string;
  email?: string;
  password?: string;
  // persona
  nombre?: string;
  apellido_paterno?: string;
  apellido_materno?: string;
  sexo?: string;
  users_id?: number;
  //user
  tipo_id?: number;
  tipo?: string;
  //
  token?: string;
}