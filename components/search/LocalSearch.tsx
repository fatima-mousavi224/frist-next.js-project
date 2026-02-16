'use client';

import Image from 'next/image';
import { Input } from '../ui/input';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { formUrlQuery, removeKrysFormQuery } from '@/lib/url';
import path from 'path';

interface Props {
  route: string;
  srcImg: string;
  placeholder: string;
  otherClasses?: string;
}
const LocalSearch = ({ route, srcImg, placeholder, otherClasses }: Props) => {
  const searchPrams = useSearchParams();
  const query = searchPrams.get('query') || '';
  const [searchQuery, setSearchQuery] = useState(query);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const daliyDebounsFn = setTimeout(() => {
      if (searchQuery) {
        const newUrl = formUrlQuery({
          params: searchPrams.toString(),
          key: 'query',
          value: searchQuery,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (pathname === route) {
          const newUrl = removeKrysFormQuery({
            params: searchPrams.toString(),
            keyToRemove: ['query'],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 1000);

    return () => clearTimeout(daliyDebounsFn);
  }, [searchQuery, router, searchPrams, route, pathname]);
  return (
    <div
      className={`background-light800_darkgradient flex min-h-14 grow items-center gap-4 rounded-[10px] px-4 ${otherClasses || ''}`}
    >
      <Image src={srcImg} alt="search icon" width={24} height={24} className="cursor-pointer" />
      <Input
        className="paragraph-regular no-focus placeholder text-dark400_light700 border-none shadow-none outline-none "
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default LocalSearch;
