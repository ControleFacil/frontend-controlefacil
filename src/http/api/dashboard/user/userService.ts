export interface UserResponse {
    id: string;
    nome: string;
    email: string;
}

export interface UserRequest{
    // to put 
    nome?: string;
    email?: string;
    senha?: string;
}