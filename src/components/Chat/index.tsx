'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import {
  INITIAL_MESSAGES,
  INITIAL_PARAMS,
  PARAM_KEYS,
  QUESTIONS,
  WELCOME_MESSAGES,
} from './constants';
import { IMessage, PromptParams } from '@/types/message';
import { generateStream } from '@/services/messages';
import Header from './Header';
import Message from './Message';
import Input from './Input';
import ControlButtons from './ControlButtons';
import DateBadge from './DateBadge';

const ChatRoom = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState<IMessage[]>(INITIAL_MESSAGES);
  const [params, setParams] = useState<PromptParams>(INITIAL_PARAMS);
  const [chunk, setChunk] = useState('');
  const [chunkId, setChunkId] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const getNextMessage = (user: string, bot: string) => {
    const m: IMessage[] = [
      { from: 'user', content: user },
      { from: 'bot', content: bot, animation: 'fadeInDelay' },
    ];
    const newMessages = m.filter((message) => message.content);
    setMessages((prev) => [...prev, ...newMessages]);
    setValue('');
  };

  const showGeneratedMessages = async (params: PromptParams) => {
    setChunk('');
    setIsDone(false);
    setCurrentStep((prev) => prev + 1);

    try {
      const stream = await generateStream(params);
      if (!stream) return;
      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let newChunk = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          setIsDone(true);
          setChunkId((prev) => prev + 1);
          break;
        }

        const decodedChunk = decoder.decode(value, { stream: true });

        if (decodedChunk.includes('\n\n')) {
          const arr = decodedChunk.split('\n\n');
          newChunk += arr[0];
          setChunk(newChunk);
          newChunk = arr[1];
          setChunkId((prev) => prev + 1);
          continue;
        }

        newChunk += decodedChunk;
        setChunk(newChunk);
      }
    } catch (error) {
      getNextMessage('', '오늘 사용량을 모두 사용하셨습니다. 내일 다시 이용해주세요.');
      setIsDone(true);
      setIsError(true);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputValue = value.trim();
    if (!inputValue || currentStep === PARAM_KEYS.length) return;

    if (inputValue.length > 8) {
      getNextMessage(inputValue, '8자 이내로 입력해주세요.');
      return;
    }

    if (currentStep === PARAM_KEYS.length - 1) {
      if (inputValue !== '반말' && inputValue !== '존댓말') {
        getNextMessage(inputValue, '"반말" 또는 "존댓말" 중 하나를 입력해주세요.');
        return;
      }

      const newParams = { ...params, [PARAM_KEYS[currentStep]]: inputValue };
      setParams(newParams);
      setIsInputDisabled(true);
      getNextMessage(inputValue, '');
      await showGeneratedMessages(newParams);
      return;
    }

    setParams((prev) => ({
      ...prev,
      [PARAM_KEYS[currentStep]]: currentStep === 1 && inputValue === '0' ? '' : inputValue,
    }));
    setCurrentStep((prev) => prev + 1);
    getNextMessage(inputValue, QUESTIONS[currentStep + 1]);
  };

  const handleReplayClick = async () => {
    setCurrentStep((prev) => prev - 1);
    await showGeneratedMessages(params);
  };

  const handleRestartClick = () => {
    setIsDone(false);
    setCurrentStep(0);
    setIsInputDisabled(false);
    getNextMessage('', QUESTIONS[0]);
  };

  useEffect(() => {
    if (chunkId > 0) {
      setMessages((prev) => [...prev, { from: 'bot', content: chunk, copyId: `${chunkId}` }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chunkId]);

  useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages, chunk, isDone]);

  return (
    <>
      <Header title="메시지봇" leftUrl="/" rightUrl="/chat/tutorial" />
      <DateBadge />

      {WELCOME_MESSAGES.map((message) => (
        <Message key={message} from="bot" content={message} animation="fadeIn" />
      ))}

      {messages.map((message, index) => (
        <Message
          key={index}
          from={message.from}
          content={message.content}
          copyId={message.copyId}
          animation={message.animation}
        />
      ))}

      {currentStep === PARAM_KEYS.length && !isDone && <Message from="bot" content={chunk} />}

      {isDone && !isError && (
        <ControlButtons
          handleReplayClick={handleReplayClick}
          handleRestartClick={handleRestartClick}
        />
      )}
      <div ref={bottomRef} />

      <Input
        value={value}
        setValue={setValue}
        handleSubmit={handleSubmit}
        disabled={isInputDisabled}
      />
    </>
  );
};

export default ChatRoom;
