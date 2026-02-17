import Link from "next/link";
import { cn } from "@/lib/utils";

interface Props {
  imageUrl: string;
  alt: string;
  value: number | string;
  title: string;
  textStyles?: string;
  href?: string;
  isAuthor?: boolean;
}

const Metric = ({
  imageUrl,
  alt,
  value,
  title,
  textStyles,
  href,
  isAuthor
}: Props) => {

  const metricContent = (
    <>
      <img
        src={imageUrl}
        alt={alt}
        width={16}
        height={16}
        className="rounded-full object-contain"
      />

      <p className={cn(textStyles, "flex items-center gap-1")}>
        {value}
        <span
          className={cn(
            "small-regular line-clamp-1",
            isAuthor && "max-sm:hidden"
          )}
        >
          {title}
        </span>
      </p>
    </>
  );

  return href ? (
    <Link href={href} className="flex items-center gap-2">
      {metricContent}
    </Link>
  ) : (
    <div className="flex items-center gap-2">
      {metricContent}
    </div>
  );
};

export default Metric;