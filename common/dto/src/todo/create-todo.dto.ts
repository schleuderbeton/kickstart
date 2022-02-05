import { BaseTodoDto } from "./base-todo.dto";
import {IsNotEmpty, IsOptional} from "class-validator";

export class CreateTodoDto extends BaseTodoDto {

    @IsOptional()
    completedAt?: Date;

    @IsNotEmpty()
    createdAt: Date;


}

