import ROUTES from "@/constant/routes";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { getDeviconClassname } from "@/lib/utils";
import Image from "next/image";

interface Props {
  _id: string;
  name: string;
  questions?: number;
  showCount?: boolean;
  compact?: boolean;
  remove?: boolean;
  isButton?: boolean;
  handelRemove?: () => void;
}

const TagCards = ({
  _id,
  name,
  questions,
  showCount,
  compact,
  remove,
  isButton,
  handelRemove,
}: Props) => {
  const iconClass = getDeviconClassname(name);

  const handelClick = (e: React.MouseEvent) => {
    e.preventDefault();
  }

  const content = (
    <>
      <Badge className="flex flex-row gap-2 background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">
        <div className="flex items-center space-x-2">
          <i className={`${iconClass} text-sm`} />
          <span>{name}</span>
        </div>

        {remove && (
          <Image
            src="/icons/close.svg"
            alt="close tag"
            width={12}
            height={12}
            className="ml-2 cursor-pointer object-contain invert-0 dark:invert"
            onClick={handelRemove}
          />
        )}
      </Badge>

      {showCount && (
        <p className="small-medium text-dark500_light700">
          {questions}
        </p>
      )}
    </>
  );

  // ================= COMPACT MODE =================
  if (compact) {
    return isButton ? (
      <button
       onClick={handelClick}
        type="button"
        className="flex justify-between gap-2"
      >
        {content}
      </button>
    ) : (
      <Link
        href={ROUTES.TAGS(_id)}
        className="flex justify-between gap-2"
      >
        {content}
      </Link>
    );
  }

  // ================= DEFAULT MODE =================
  return (
    <Link
      href={ROUTES.TAGS(_id)}
      className="flex justify-between gap-2"
    >
      {content}
    </Link>
  );
};

export default TagCards;