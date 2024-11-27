import { TaskPriority, TaskStatus } from "src/shared/enums";

export interface IProduct {
    id: string,
    Image: string,
    price: number,
    quantity: number,
    subtotal?: number,
    name: string,
}

export interface ITask {
    id: number;
    name: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: Date;
    dateOfCreation: Date;
    isActive: boolean;
}