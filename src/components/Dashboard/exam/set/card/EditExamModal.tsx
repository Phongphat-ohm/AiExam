"use client"
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { Exam } from "../update/interface";
import { useEffect, useState } from "react";
import { FaCheck, FaPlus, FaTrash, FaX } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

interface Root {
    exam: Exam;
    isOpen: any;
    onOpenChange: any;
}

export default function EditExamModal({ exam, isOpen, onOpenChange }: Root) {
    const [question, setQuestion] = useState("");
    const [answerChoice, setAnswerChoice] = useState<number>();
    const [choice_1, setChoice_1] = useState("");
    const [choice_2, setChoice_2] = useState("");
    const [choice_3, setChoice_3] = useState("");
    const [choice_4, setChoice_4] = useState("");
    const [choice_5, setChoice_5] = useState("");
    const [showChioce5, steShowChoice5] = useState(false);
    const route = useRouter();

    useEffect(() => {
        setQuestion(exam?.question.toString() as string);
        setAnswerChoice(Number(exam.answer_choice))
        setChoice_1(exam.choice_1);
        setChoice_2(exam.choice_2);
        setChoice_3(exam.choice_3);
        setChoice_4(exam.choice_4);

        if (exam.choice_5 == null || exam.choice_5 == undefined) {
            setChoice_5("");
        } else {
            setChoice_5(exam.choice_5);
        }
    }, [exam])

    const edit_exam = () => {
        try {

        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "ผิดพลาด",
                text: "มีบางอย่างผิดพลาด",
                confirmButtonText: "ลองอีกครั้ง"
            })
        }
    }

    return (
        <>
            <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 font-normal">แก้ไขข้อสอบ</ModalHeader>
                            <ModalBody>
                                <div className="flex gap-2 items-start">
                                    <textarea className="text-lg outline-none w-full" value={question} onChange={e => setQuestion(e.target.value)} />
                                </div>
                                <div className="grid grid-cols-2 gap-3 mt-3">
                                    {/* Choice 1 */}
                                    <div className={`p-3 rounded flex gap-2 items-center justify-start ${answerChoice == 1 ? "bg-green-100" : "bg-gray-100"}`}>
                                        <button type="button" onClick={() => { setAnswerChoice(1) }} className={`w-5 h-5 p-1 border rounded-full flex items-center justify-center ${answerChoice == 1 ? 'bg-green-500 text-white' : "bg-white"}`}>
                                            {answerChoice == 1 && <FaCheck className="text-sm" />}
                                        </button>
                                        <input autoComplete="off" className={`w-full outline-none ${answerChoice == 1 ? "bg-green-100" : "bg-gray-100"}`} name="choice_1" id="choice_1" value={choice_1} onChange={(e) => { setChoice_1(e.target.value) }} />
                                    </div>

                                    {/* Choice 2 */}
                                    <div className={`p-3 rounded flex gap-2 items-center justify-start ${answerChoice == 2 ? "bg-green-100" : "bg-gray-100"}`}>
                                        <button type="button" onClick={() => { setAnswerChoice(2) }} className={`w-5 h-5 p-1 border rounded-full flex items-center justify-center ${answerChoice == 2 ? 'bg-green-500 text-white' : "bg-white"}`}>
                                            {answerChoice == 2 && <FaCheck className="text-sm" />}
                                        </button>
                                        <input autoComplete="off" className={`w-full outline-none ${answerChoice == 2 ? "bg-green-100" : "bg-gray-100"}`} name="choice_2" id="choice_2" value={choice_2} onChange={(e) => { setChoice_2(e.target.value) }} />
                                    </div>

                                    {/* Choice 3 */}
                                    <div className={`p-3 rounded flex gap-2 items-center justify-start ${answerChoice == 3 ? "bg-green-100" : "bg-gray-100"}`}>
                                        <button type="button" onClick={() => { setAnswerChoice(3) }} className={`w-5 h-5 p-1 border rounded-full flex items-center justify-center ${answerChoice == 3 ? 'bg-green-500 text-white' : "bg-white"}`}>
                                            {answerChoice == 3 && <FaCheck className="text-sm" />}
                                        </button>
                                        <input autoComplete="off" className={`w-full outline-none ${answerChoice == 3 ? "bg-green-100" : "bg-gray-100"}`} name="choice_3" id="choice_3" value={choice_3} onChange={(e) => { setChoice_3(e.target.value) }} />
                                    </div>

                                    {/* Choice 4 */}
                                    <div className={`p-3 rounded flex gap-2 items-center justify-start ${answerChoice == 4 ? "bg-green-100" : "bg-gray-100"}`}>
                                        <button type="button" onClick={() => { setAnswerChoice(4) }} className={`w-5 h-5 p-1 border rounded-full flex items-center justify-center ${answerChoice == 4 ? 'bg-green-500 text-white' : "bg-white"}`}>
                                            {answerChoice == 4 && <FaCheck className="text-sm" />}
                                        </button>
                                        <input autoComplete="off" className={`w-full outline-none ${answerChoice == 4 ? "bg-green-100" : "bg-gray-100"}`} name="choice_4" id="choice_4" value={choice_4} onChange={(e) => { setChoice_4(e.target.value) }} />
                                    </div>

                                    {/* Choice 5 */}
                                    {showChioce5 ? (
                                        <div className={`p-3 rounded flex gap-2 items-center justify-start relative ${answerChoice == 5 ? "bg-green-100" : "bg-gray-100"}`}>
                                            <button type="button" onClick={() => { setAnswerChoice(5) }} className={`w-5 h-5 p-1 border rounded-full flex items-center justify-center ${answerChoice == 5 ? 'bg-green-500 text-white' : "bg-white"}`}>
                                                {answerChoice == 5 && <FaCheck className="text-sm" />}
                                            </button>
                                            <input autoComplete="off" className={`w-full outline-none ${answerChoice == 5 ? "bg-green-100" : "bg-gray-100"}`} name="choice_5" id="choice_5" value={choice_5} onChange={(e) => { setChoice_5(e.target.value) }} />
                                            <button type="button" onClick={() => { steShowChoice5(false); setChoice_5(""); if (answerChoice == 5) { setAnswerChoice(Number(exam.answer_choice)) } }} className="p-2 font-bold flex items-center justify-center absolute -top-1 -right-1 text-xs rounded-full bg-red-500 text-white">
                                                <FaTrash />
                                            </button>
                                        </div>
                                    ) : (
                                        <button type="button" onClick={() => { steShowChoice5(true) }} className={`p-3 border-green-500 border-2 border-dashed rounded flex gap-2 items-center justify-start bg-green-100 text-green-500`}>
                                            <FaPlus /> เพิ่มข้อที่ 5
                                        </button>
                                    )}
                                </div>
                                <div className="p-3">
                                    
                                </div>
                            </ModalBody>
                            <ModalFooter className="border-t">
                                <Button color="danger" variant="light" onPress={onClose}>
                                    ยกเลิก
                                </Button>
                                <Button color="primary" onPress={() => { onClose(); edit_exam(); }}>
                                    ยืนยัน
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
