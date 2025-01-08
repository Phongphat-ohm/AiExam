export interface GetSubjectApi {
    status: number
    message: string
    data: Subject
}

export interface Subject {
    id: number
    name: string
    create_at: string
    update_at: string
    Exercise: Exercise[]
}

export interface Exercise {
    id: number
    name: string
    subject_id: number
    grade_id: number
    create_at: string
    update_at: string
    Grade: Grade
}

export interface Grade {
    id: number
    grade: string
    create_at: string
    update_at: string
}
