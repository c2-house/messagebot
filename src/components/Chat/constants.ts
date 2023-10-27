import { IMessage, PromptParams } from '@/types/message';

export const WELCOME_MESSAGES = [
  '안녕하세요! 소중한 사람들에게 따뜻한 인사를 전하는 메시지봇이에요.',
  '제가 만든 메시지가 어색하더라도 귀엽게 봐주시고, 상대방에게 마음을 전해주세요. 메시지는 하루 최대 30회까지 생성할 수 있습니다.',
];

export const QUESTIONS = [
  '누구에게 메시지를 보내실 건가요?\n예) 엄마, 친구, 친척 언니, 선생님, 선배님, 직장 동료',
  '메시지 받는 분의 성함이 무엇인가요? 만약 이름으로 부르지 않는다면 숫자 0을 입력해주세요.',
  '어떤 이유로 메시지를 보내시나요?\n예) 생일축하, 결혼축하, 안부인사, 추석인사, 위로, 격려',
  '반말과 존댓말 중 어떤 말투를 사용할까요?',
];

export const INITIAL_MESSAGES: IMessage[] = [
  {
    from: 'bot',
    content: QUESTIONS[0],
    animation: 'fadeInDelay',
  },
];

export const INITIAL_PARAMS: PromptParams = {
  relation: '',
  name: '',
  reason: '',
  manner: '',
};

export const PARAM_KEYS = Object.keys(INITIAL_PARAMS) as (keyof PromptParams)[];
