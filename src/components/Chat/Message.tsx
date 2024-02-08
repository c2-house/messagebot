import clsx from 'clsx';
import Image from 'next/image';
import { MouseEvent, useState } from 'react';
import { IMessage } from '@/types/message';
import { CheckIcon, CopyIcon, ShareIcon } from '../../../public/icons';

const GeneratedMessage = ({ content, copyId }: Pick<IMessage, 'content' | 'copyId'>) => {
  const [copiedId, setCopiedId] = useState('');

  const handleCopyClick = (e: MouseEvent<HTMLButtonElement>) => {
    const { id, value } = e.currentTarget;
    navigator.clipboard.writeText(value);
    setCopiedId(id);
    setTimeout(() => setCopiedId(''), 2000);
  };

  const openShareModal = () => {
    if (document) {
      (document.getElementById('message-share-modal') as HTMLFormElement).showModal();
    }
  };

  return (
    <div className="flex items-end justify-between gap-1">
      <button
        className="chat-bubble text-left"
        id={copyId}
        value={content}
        onClick={openShareModal}
      >
        {content}
      </button>
      <button
        className="rounded-full p-1 transition-colors hover:bg-slate-200"
        id={copyId}
        value={content}
        onClick={openShareModal}
      >
        <ShareIcon className="h-5 w-5 fill-slate-400" />
        {/* {copyId === copiedId ? (
            <CheckIcon className="fill-sky-500" />
          ) : (
            <CopyIcon className="h-5 w-5 fill-slate-400" />
          )} */}
      </button>
    </div>
  );
};

const Message = ({ from, content, copyId, fadeIn, delay }: IMessage) => {
  return (
    <>
      {from === 'bot' && (
        <div
          className={clsx(
            'chat chat-start relative whitespace-pre-line pb-4 pt-2',
            fadeIn && 'animate-fadeIn',
          )}
          style={{ animationDelay: delay ? `${delay}s` : '' }}
        >
          <div className="avatar chat-image">
            <div className="h-10 w-10 rounded-full">
              <Image src="/images/avatar.png" alt="avatar" width={40} height={40} />
            </div>
          </div>
          <div className="chat-header">메시지봇</div>
          {copyId ? (
            <GeneratedMessage content={content} copyId={copyId} />
          ) : (
            <div className="chat-bubble">{content}</div>
          )}
        </div>
      )}
      {from === 'user' && (
        <div className="chat chat-end py-2">
          <div className="chat-bubble bg-sky-200 text-inherit">{content}</div>
        </div>
      )}
    </>
  );
};

export default Message;
