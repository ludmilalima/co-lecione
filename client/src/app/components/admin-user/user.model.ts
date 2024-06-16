export interface User {
    /* No Angular, o tipo string é adequado para representar identificadores únicos,
     como o _id do MongoDB,porque no cliente o identificador é geralmente tratado 
     como uma sequência de caracteres.
     Observe que o _id é definido como opcional (_id?: string;) para acomodar a 
     criação de um novo usuário, onde o identificador ainda não foi atribuído pelo 
     banco de dados. */
    _id?: string;
    name: string;
    email: string;
    password: string;
}
