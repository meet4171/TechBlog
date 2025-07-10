

export type generate_jwt_payload = {
    id: number,
    email: string,
    role: string,
}
export type req_jwt_payload = {
    id: number
}

export type login_res_tokens = {
    id: number,
    access_token: string,
    refresh_token: string,

}