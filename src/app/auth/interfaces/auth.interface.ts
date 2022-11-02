export interface AuthResponde{
    ok: boolean;
    id?: number;
    name?: string;
    token?: string;
    msg?: string;
    user?: any;
}

export interface Usuario {
    id: number;
    nombre: string;
    email: string;
}