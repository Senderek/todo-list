import { Moment } from "moment";

interface TodoItem {
    id: string;
    completionDate: Moment | null;
    addedOnDate: Moment;
    text: string;
}

export const todoItemeEquals = (x1: TodoItem, x2: TodoItem) => {
    if (x1.completionDate != null && x2.completionDate != null) return x1.completionDate.diff(x2.completionDate, "milliseconds", false);
    if (x1.completionDate !== null && x2.completionDate === null) return -1;
    if (x1.completionDate === null && x2.completionDate !== null) return 1;
    return x1.addedOnDate.diff(x2.addedOnDate, "milliseconds", false);
};

export default TodoItem;
