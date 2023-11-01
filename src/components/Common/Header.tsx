import Link from 'next/link';
import { ArrowBackIcon, CloseIcon, HelpIcon } from '../../../public/icons';

interface Props {
  title: string;
  leftUrl?: string;
  rightUrl?: string;
  rightIconType?: 'close' | 'help';
}

const Header = ({ title, leftUrl, rightUrl, rightIconType }: Props) => {
  return (
    <header className="fixed left-0 right-0 top-0 z-10 mx-auto flex h-[56px] max-w-lg items-center justify-between bg-white shadow">
      {leftUrl && (
        <Link
          href={leftUrl}
          className="flex h-full w-10 items-center justify-center fill-slate-400"
        >
          <ArrowBackIcon />
        </Link>
      )}
      <h1 className="text-center text-lg font-medium">{title}</h1>
      {rightUrl ? (
        <Link
          href={rightUrl}
          className="flex h-full w-10 items-center justify-center fill-slate-400"
        >
          {rightIconType === 'close' ? <CloseIcon /> : <HelpIcon />}
        </Link>
      ) : (
        <div className="w-10" />
      )}
    </header>
  );
};

export default Header;
