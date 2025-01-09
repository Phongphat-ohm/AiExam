export interface ApiExerciseResponse {
    status: number
    message: string
    data: Exercise[]
}

export interface Exercise {
    id: number
    name: string
    subject_id: number
    grade_id: number
    create_at: string
    update_at: string
    Subject: Subject
    Grade: Grade
    ExamSet: ExamSet[]
}

export interface Subject {
    id: number
    name: string
    create_at: string
    update_at: string
}

export interface Grade {
    id: number
    grade: string
    create_at: string
    update_at: string
}

export interface ExamSet {
    id: number
    name: string
    grade_id: number
    subject_id: number
    exercise_id: number
    create_at: string
    update_at: string
}
