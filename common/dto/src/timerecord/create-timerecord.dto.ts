import {IsNotEmpty} from "class-validator";

export class CreateTimerecordDto {
    @IsNotEmpty()
    service_id: string;

    @IsNotEmpty()
    working_code?: string;                  // realisation, ideation, maintenance, ...

    @IsNotEmpty()
    working_description?: string;           // realisation, ideation, maintenance, ...

    @IsNotEmpty()
    working_time_minutes?: number;

    @IsNotEmpty()
    createdAt: Date;
}
