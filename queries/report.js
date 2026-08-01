import {Report} from "@/models/report-model";
import {Assessment} from "@/models/assessment-model";
import { replaceMongoIdInObject } from "@/lib/convertData";


export const getReport = async (filter) => {
    try {
        const report = await Report.findOne(filter).populate({
            path:'quizAssessment',
            model : Assessment,
        }).lean();

        return replaceMongoIdInObject(report);
    } catch (error) {
        console.error(error);
        throw new Error('Error fetching report');
    }
};