import {IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, ValidateIf} from "class-validator";

export class BaseTodoDto {
    @IsNotEmpty({message: "validation.notEmpty"})
    title: string

    @IsOptional()
    description?: string
}
