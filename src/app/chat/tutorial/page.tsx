import Image from 'next/image';
import Header from '@/components/Chat/Header';
import { QUESTIONS } from '@/components/Chat/constants';
import { getMetaData } from '@/app/sharedMetadata';

export const metadata = getMetaData({ url: '/chat/tutorial' });

const TutorialPage = () => {
  return (
    <>
      <Header title="사용방법" leftUrl="/chat" />
      <h2 className="mb-4 mt-2 text-lg font-medium">
        더 나은 메시지를 생성하려면 질문에 이렇게 답변해주세요! 😎
      </h2>
      <Image
        src="/images/tutorial.gif"
        alt="사용방법"
        width={400}
        height={650}
        style={{ width: '100%', height: 'auto' }}
      />
      <ol className="my-6 ml-6 list-outside list-decimal whitespace-pre-line">
        <li>{`${QUESTIONS[0]}\n➡ 관계, 직함 등을 나타내는 단어를 입력`}</li>
        <li className="mt-4">{QUESTIONS[1]}</li>
        <ul className="ml-4 mt-2 list-outside list-disc">
          <li>지수야, 지수언니 ➡ 지수</li>
          <li>김민석 선생님 ➡ 김민석</li>
          <li>엄마, 아빠 ➡ 0</li>
        </ul>
        <li className="mt-4">{`${QUESTIONS[2]}\n➡ 메시지 보내는 목적을 간결한 단어로 입력`}</li>
        <li className="mt-4">{`${QUESTIONS[3]}\n➡ 반말, 존댓말 중 택1`}</li>
      </ol>
    </>
  );
};

export default TutorialPage;
