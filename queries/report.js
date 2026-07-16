import Report from "@/models/report";
import Assessment from "@/models/assessment";
import { replaceMongoIdInObject } from "@/lib/convertData";


export const getReport = async (filter) => {
    try {
        const report = await Report.findOne(filter).populate({
            path:'Assessment',
            model : Assessment,
        }).lean();

        return replaceMongoIdInObject(report);
    } catch (error) {
        throw new Error('Error fetching report');
    }
};