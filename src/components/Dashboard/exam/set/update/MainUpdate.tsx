"use client"
import axios from "axios";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Exam, ExamSet, GetExamSetProps } from "./interface";
import UpdateExamSet from "../card/UpdateExamSetCard";
import ExamCard from "../card/ExamCard";
import NewExamModal from "../card/New/NewExamModal";

export default function MainUpdate() {
    const { id } = useParams();
    const [examSet, setExamSet] = useState<ExamSet>();
    const [exam, setExam] = useState<Exam[]>([]);
    const [filteredExams, setFilteredExams] = useState<Exam[]>([]); // To store filtered exams
    const [searchQuery, setSearchQuery] = useState(""); // To store the search query

    useEffect(() => {
        get_exam_set();
    }, []);

    useEffect(() => {
        if (searchQuery === "") {
            setFilteredExams(exam);
        } else {
            setFilteredExams(
                exam.filter((val) =>
                    val.question.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        }
    }, [searchQuery, exam]); // Re-run when searchQuery or exam data changes

    const get_exam_set = async () => {
        try {
            const get_exam_set = await axios.get("/api/data/exam/set/" + id);
            const response: GetExamSetProps = get_exam_set.data;

            if (response.status !== 200) {
                Swal.fire({
                    icon: "warning",
                    title: "ระวัง",
                    text: response.message,
                    confirmButtonText: "ลองอกีครั้ง"
                }).then(r => {
                    if (r.isConfirmed) {
                        window.location.reload();
                    } else {
                        window.location.reload();
                    }
                });
                return;
            }

            setExamSet(response.data);
            setExam(response.data.Exam);
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "ผิดพลาด",
                text: "มีบางอย่างผิดพลาด",
                confirmButtonText: "ลองอีกครั้ง"
            }).then(r => {
                if (r.isConfirmed) {
                    window.location.reload();
                } else {
                    window.location.reload();
                }
            });
        }
    };

    return (
        <>
            <UpdateExamSet examSet={examSet} />

            <div className="my-5 flex items-center gap-2">
                <NewExamModal />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ค้นหาจากคำถาม..."
                    className="input input-bordered w-full"
                />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-5">
                {filteredExams.map((val, index) => (
                    <ExamCard id={index + 1} exam={val} key={index} />
                ))}
            </div>
        </>
    );
}
