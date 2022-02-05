import { BaseTodoDto } from './base-todo.dto';
import {IsOptional} from "class-validator";

export class UpdateTodoDto extends BaseTodoDto {
    @IsOptional()
    completedAt: Date;

    @IsOptional()
    deletedAt?: Date;
}
