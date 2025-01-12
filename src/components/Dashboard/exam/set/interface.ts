export interface ApiGetExamSet {
    status: number
    message: string
    data: ExamSet[]
}

export interface ExamSet {
    id: number
    name: string
    grade_id: number
    subject_id: number
    exercise_id: number
    create_at: string
    update_at: string
    Exercise: Exercise
    Grade: Grade
    Subject: Subject
    Exam: Exam[]
}

export interface Exercise {
    id: number
    name: string
    subject_id: number
    grade_id: number
    create_at: string
    update_at: string
}

export interface Grade {
    id: number
    grade: string
    create_at: string
    update_at: string
}

export interface Subject {
    id: number
    name: string
    create_at: string
    update_at: string
}

export interface Exam {
    id: number
    exam_set_id: number
    data: any
    question: string
    choice_1: string
    choice_2: string
    choice_3: string
    choice_4: string
    choice_5: any
    answer_choice: string
    exam_detail: number
    create_at: string
    update_at: string
}
