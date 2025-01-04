export interface ApiResponseProps {
    status: number
    message: string
    data: Data
}

export interface Data {
    id: number
    gravatar: string
    first_name: string
    last_name: string
    email: string
    username: string
    password: string
    point: number
    role: string
    create_at: string
    update_at: string
    gradeId: number
    rankId: number
    Grade: Grade
    Rank: Rank
}

export interface Grade {
    id: number
    grade: string
    create_at: string
    update_at: string
}

export interface Rank {
    id: number
    rank: string
    require_point: number
    create_at: string
    update_at: string
}
