"use client";
import { useEffect, useState } from "react";
import { Exam } from "../update/interface";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { FaCheck, FaPencil, FaTrash } from "react-icons/fa6";
import EditExamModal from "./EditExamModal";

interface Root {
    exam?: Exam;
    id?: number
}

export default function ExamCard({ exam, id }: Root) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <div>
                <EditExamModal exam={exam as Exam} isOpen={isOpen} onOpenChange={onOpenChange} />
                <div className="card bg-white shadow">
                    <div className="card-body relative">
                        <div className="absolute top-2 left-2">
                            <span className="rounded-full p-1 border w-8 h-8 text-sm flex items-center justify-center">
                                {id}
                            </span>
                        </div>
                        <div className="absolute top-2 right-2 flex gap-3">
                            <Button color="danger" className="text-white" isIconOnly size="sm"><FaTrash /></Button>
                            <Button color="warning" onPress={onOpen} className="text-white" isIconOnly size="sm"><FaPencil /></Button>
                            {/* <Button color="primary" size="sm">ดูข้อมูลเพิ่มเติม</Button> */}
                        </div>
                        <div className="mt-5">
                            {exam?.ExamData !== null && (
                                <>
                                    {exam?.ExamData.type == "image" && (
                                        <img src={exam.ExamData.data} alt={exam.ExamData.id.toString()} />
                                    )}
                                </>
                            )}
                            <div className="text-lg">
                                {exam?.question}
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-3">
                                <div className={`p-3 relative ${exam?.answer_choice == "1" ? "bg-green-100" : "bg-gray-100"} rounded flex gap-3 items-center`}>
                                    <span className={`w-5 h-5 border rounded-full flex items-center justify-center ${exam?.answer_choice == "1" ? "bg-green-500 text-white" : "bg-white text-gray-600"}`}>
                                        {exam?.answer_choice == "1" && <FaCheck className="text-sm" />}
                                    </span>
                                    <label>
                                        {exam?.choice_1}
                                    </label>
                                </div>
                                <div className={`p-3 relative ${exam?.answer_choice == "2" ? "bg-green-100" : "bg-gray-100"} rounded flex gap-3 items-center`}>
                                    <span className={`w-5 h-5 border rounded-full flex items-center justify-center ${exam?.answer_choice == "2" ? "bg-green-500 text-white" : "bg-white text-gray-600"}`}>
                                        {exam?.answer_choice == "2" && <FaCheck className="text-sm" />}
                                    </span>
                                    <label>
                                        {exam?.choice_2}
                                    </label>
                                </div>
                                <div className={`p-3 relative ${exam?.answer_choice == "3" ? "bg-green-100" : "bg-gray-100"} rounded flex gap-3 items-center`}>
                                    <span className={`w-5 h-5 border rounded-full flex items-center justify-center ${exam?.answer_choice == "3" ? "bg-green-500 text-white" : "bg-white text-gray-600"}`}>
                                        {exam?.answer_choice == "3" && <FaCheck className="text-sm" />}
                                    </span>
                                    <label>
                                        {exam?.choice_3}
                                    </label>
                                </div>
                                <div className={`p-3 relative ${exam?.answer_choice == "4" ? "bg-green-100" : "bg-gray-100"} rounded flex gap-3 items-center`}>
                                    <span className={`w-5 h-5 border rounded-full flex items-center justify-center ${exam?.answer_choice == "4" ? "bg-green-500 text-white" : "bg-white text-gray-600"}`}>
                                        {exam?.answer_choice == "4" && <FaCheck className="text-sm" />}
                                    </span>
                                    <label>
                                        {exam?.choice_4}
                                    </label>
                                </div>
                                {exam?.choice_5 !== null && (
                                    <div className={`p-3 relative ${exam?.answer_choice == "5" ? "bg-green-100" : "bg-gray-100"} rounded flex gap-3 items-center`}>
                                        <span className={`w-5 h-5 border rounded-full flex items-center justify-center ${exam?.answer_choice == "5" ? "bg-green-500 text-white" : "bg-white text-gray-600"}`}>
                                            {exam?.answer_choice == "5" && <FaCheck className="text-sm" />}
                                        </span>
                                        <label>
                                            {exam?.choice_5}
                                        </label>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}