"use client";

import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Exercise } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface Root {
    subject_id: string;
    grade_id: string
}

export default function ExerciseSelect({ subject_id, grade_id }: Root) {
    const [exercise, setExercise] = useState<Exercise[]>([]);

    useEffect(() => {
        get_subject();
    }, [subject_id, grade_id])

    const get_subject = async () => {
        try {
            if (!subject_id || !grade_id) {
                return;
            } else {
                const get_exercise = await axios.get("/api/data/exercise/with?subject=" + subject_id + "&grade=" + grade_id);
                const data = get_exercise.data;
                const exercises: Exercise[] = data.exercises;

                if (data.status !== 200) {
                    Swal.fire({
                        icon: "warning",
                        title: "ระวัง",
                        text: data.message
                    })
                    return;
                }

                console.log(exercises);
                setExercise(exercises);
                return;
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "ผิดพลาด",
                text: "มีบางอย่างผิดพลาดในกราดึงข้อมูลหน่วยการเรียนรู้"
            })
        }
    }

    return (
        <>
            <Autocomplete defaultItems={exercise} size="lg" isDisabled={exercise.length <= 0} disabled={exercise.length <= 0} label="หน่วยการเรียนรู้" labelPlacement="outside" name="exercise" id="exercise" placeholder="หน่วยการเรียนรู้" className="w-full">
                {(item) => (
                    <AutocompleteItem value={item.id}>
                        {item.name}
                    </AutocompleteItem>
                )}
            </Autocomplete>
        </>
    )
}