import Student from "../Models/Student.js";
import CloudinaryService from "./CloudinaryService.js";

class StudentService {
    async getStudentInfo(studentId) {
        var student = await Student.findById(studentId);
        return student;
    }

    async uploadAvatar(student, file) {
        student.avatarUrl = await CloudinaryService.uploadImage(file, student.avatarUrl);
        await student.save();
        return student.avatarUrl;
    }

    async updateStudent(sStudent, uStudent) {
        const updatedFields = [
            "name",
            "faculty",
            "school",
            "quote",
            "attendedActivities",
            "gender",
            "phoneNumber",
            "dob",
            "studentCode"
        ];
        for (var updatedField of updatedFields) {
            if (uStudent.hasOwnProperty(updatedField)) {
                sStudent[updatedField] = uStudent[updatedField];
            }
        }
        await sStudent.save();
        return sStudent;
    }

    async getTop10Students() {
        return await Student.find()
            .limit(10)
            .sort({ totalPoints: -1 })
            .exec();
    }
}

export default new StudentService();