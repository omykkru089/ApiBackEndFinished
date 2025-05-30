import { Role } from "../../common/enums/rol.enum";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Pedido } from "src/pedidos/entities/pedido.entity";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column({unique: true, nullable: false})
    email: string;

    @Column({nullable: false, select: false})
    password: string;

    @Column({type:'enum', default: Role.USER, enum: ['user', 'admin']})
    role: string;

    @OneToMany(() => Pedido, pedido => pedido.user)
    pedidos: Pedido[];
}
