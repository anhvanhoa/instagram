import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type UserDocument = HydratedDocument<Code>;

@Schema({
    timestamps: true
})
export class Code {
    @Prop({ default: null, lowercase: true })
    email: string;
    @Prop({ default: null })
    numberPhone: string;
    @Prop({ maxlength: 6, required: true })
    otp: string;
}

export const CodeSchema = SchemaFactory.createForClass(Code);
