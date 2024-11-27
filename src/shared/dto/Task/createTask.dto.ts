import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TaskPriority, TaskStatus } from "src/shared/enums";
import { ITask } from "src/shared/interfaces";

export class CreateTaskRequestDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ example: '2024-12-01' })
    @IsOptional()
    dueDate?: Date;

    @ApiProperty()
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;

    @ApiProperty()
    @IsOptional()
    @IsEnum(TaskPriority)
    priority?: TaskPriority;

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}

export class BaseResponceDto {
    message: string;
}

export class CreateTaskResponceDto extends BaseResponceDto{
    data: ITask
}

export class GetTaskResponceDto extends BaseResponceDto{
    data: ITask
}

export class DeleteTaskResponceDto extends BaseResponceDto{
    data: null
}

export class UpdateTaskResponceDto extends BaseResponceDto{
    data: ITask
}

export class UpdateTaskRequestDto extends PartialType(CreateTaskRequestDto){
}
