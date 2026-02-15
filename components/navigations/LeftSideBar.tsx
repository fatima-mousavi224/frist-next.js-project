import Link from 'next/link';
import { SheetClose } from '../ui/sheet';
import NavLinks from './navbar/NavLinks';
import { Button } from '../ui/button';
import ROUTES from '@/constant/routes';
import Image from 'next/image';

const LeftSideBar = () => {
  return (
    <section className="custom-scrollbar background-light900_dark200 light-border sticky left-0 top-0 h-screen flex flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-56.5">
      <div className="flex flex-1 flex-col gap-2">
        <NavLinks />
      </div>

      <div className="flex flex-col gap-3 ">
        <Button
          asChild
          className="small-medium btn-secondary min-h-10.25 w-full rounded-lg px-4 py-3 shadow-none"
        >
          <Link href={ROUTES.SIGN_IN}>
            <Image
              src="/icons/account.svg"
              alt="acount"
              width={20}
              height={20}
              className="invert-colors lg:hidden "
            />
            <span className="primary-text-gradient max-lg:hidden ">Log In</span>
          </Link>
        </Button>

        {/* 2 */}

        <Button
          asChild
          className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-10.25 w-full rounded-lg border px-4 py-3 shadow-none "
        >
          <Link href={ROUTES.SIGN_UP}>
            <Image
              src="/icons/sign-up.svg"
              alt="acount"
              width={20}
              height={20}
              className="invert-colors lg:hidden "
            />
            <span className='max-lg:hidden '>Sign Up</span>
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default LeftSideBar;
