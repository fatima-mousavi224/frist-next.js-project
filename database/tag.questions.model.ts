import { model, models, Schema, Types } from "mongoose";

export interface ITagQuestions {
   tag: Types.ObjectId,
   questions: Types.ObjectId 
} 

const TagQuestionsSchema = new Schema <ITagQuestions>({
   tag: {type: Schema.Types.ObjectId, require: true, ref: "Tag"},
   questions: {type: Schema.Types.ObjectId, ref: "Questions", require: true}
},
{timestamps: true})

const TagQuestions = models?.TagQuestions || model<ITagQuestions>("TagQuestions", TagQuestionsSchema)

export default TagQuestions;