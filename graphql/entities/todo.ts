import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Field, ID, ObjectType} from "@hoalongntc/typegraphql";

@ObjectType()
@Entity()
export class Todo extends BaseEntity {

    @Field(returns => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    title: string;
}
