export interface User {
    id_user: number;
    user_name: string;
    user_password?: string;
    user_admin: number;
    user_active: number;
    user_avatar?: string; // Dodałem to, bo wcześniej o tym rozmawialiśmy
}

export interface Person {
    id: string;             // Na screenie widać ID typu string (np. yg1ud...)
    first_name: string;
    last_name?: string | null;
    birth_year?: number | null;
    nickname?: string | null;
    profile_pic?: string | null; // Tu jest nazwa pliku bez 'avatar_'
}