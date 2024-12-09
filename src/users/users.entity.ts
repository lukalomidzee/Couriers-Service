import { AfterInsert, AfterRemove, AfterUpdate, Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UsersEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;
    
    @Column()
    password: string;
    
    @Column()
    name: string;
    
    @Column( { default: false } )
    isAdmin: boolean;

    @AfterInsert()
    logInsert(){
        console.log(`Created user - ID: ${this.id}, Username: ${this.username}, Password: ${this.password}`);
    }

    @AfterUpdate()
    logUpdate(){
        console.log(`Updated user with ID: ${this.id}`);
    }

    @AfterRemove()
    logRemove(){
        console.log(`Removed user with ID: ${this.id}`);
    }
}