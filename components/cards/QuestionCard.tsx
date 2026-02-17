import ROUTES from '@/constant/routes';
import { getTimeStamp } from '@/lib/utils';
import Link from 'next/link';
import TagCards from './TagCards';
import Matric from '../Matric';

interface Props {
  question: Question;
}

const QuestionCard = ({
  question: { _id, title, tags, author, upvotes, answers, views, createdAt, question },
}: Props) => {
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
          {getTimeStamp(createdAt)}
        </span>

        <Link href={ROUTES.QUESTIONS(_id)}>
          <h3 className="sm:h3-semibold text-dark200_light900 base-semibold line-clamp-1 flex-1 ">
            {title}
          </h3>
        </Link>
      </div>

      <div className="mt-3.5 flex w-full flex-wrap gap-2 ">
        {tags.map((tag: Tag) => (
          <TagCards key={tag._id} _id={tag._id} name={tag.name} compact />
        ))}
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3 ">
        <Matric
          imageUrl={author.image || ""}
          alt={author.name}
          value={author.name}
          title={`. asked ${getTimeStamp(createdAt)}`}
          href={ROUTES.COMMUNITIES(author._id)}
          textStyles="body-medium text-dark400_light700"
          isAuthor
        />
        <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start ">
          <Matric
            imageUrl="/icons/like.svg"
            alt="Like icon"
            value={upvotes}
            title="Upvotes"
            textStyles="sm-medium text-dark400_light800 "
          />
          {/* 2 */}
          <Matric
            imageUrl="/icons/message.svg"
            alt="Message icon"
            value={answers}
            title="Answers"
            textStyles="sm-medium text-dark400_light800 "
          />
          {/* 3 */}
          <Matric
            imageUrl="/icons/eye.svg"
            alt="Eye icon"
            value={views}
            title="Views"
            textStyles="sm-medium text-dark400_light800 "
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
