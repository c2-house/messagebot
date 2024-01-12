import Link from 'next/link';
import Image from 'next/image';
import BuyMeACoffeeButton from '@/components/BuyMeACoffee/Button';
import Footer from '@/components/Common/Footer';

export default function Home() {
  return (
    <>
      <main className="flex flex-1 flex-col items-center justify-center gap-5 py-20">
        <Image
          src="/images/text-logo.png"
          alt="logo"
          width={140}
          height={40}
          className="w-[100px] md:w-[140px]"
        />
        <Image
          src="/images/chatbot.png"
          alt="메시지봇"
          width={160}
          height={170}
          className="w-[120px] md:w-[160px]"
        />
        <p className="mb-2 text-center text-lg md:my-4 md:text-xl">
          특별한 안부 인사로
          <br />
          따뜻한 마음을 전하세요.
        </p>

        <div className="flex flex-col gap-3 md:gap-5">
          <Link
            href="/chat"
            className="inline-flex h-[50px] w-[235px] items-center justify-center rounded-xl bg-slate-800 font-medium text-white hover:bg-slate-700"
          >
            메시지 만들러 가기
          </Link>
          <BuyMeACoffeeButton />
        </div>
      </main>

      <Footer />
    </>
  );
}
