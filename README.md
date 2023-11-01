# 메시지봇

## 서비스 소개

> <https://messagebot.chaechae.life>

AI를 활용해 안부 메시지를 쉽고 빠르게 생성해주는 챗봇 서비스입니다.

![messagebot](https://github.com/kec0130/messagebot/assets/77032760/06713039-3adc-4b5b-8157-2714eb80ae4f)

<br />

## 기술 스택

| 분류       | 기술 스택              |
| ---------- | ---------------------- |
| Framework  | Next.js                |
| Language   | TypeScript             |
| Database   | Supabase               |
| Deployment | Vercel                 |
| API        | OpenAI API             |
| Styling    | Tailwind CSS, Daisy UI |

<br />

## 주요 기능 및 구현 내용

- 친숙한 챗봇 UI를 통해 사용자가 메시지 생성에 필요한 정보를 잘 입력할 수 있도록 유도
- 입력받은 정보로 프롬프트를 완성하고 [OpenAI API](https://platform.openai.com/docs/api-reference)를 사용하여 메시지 생성
- 로딩 시간 최소화를 위해 stream 형태로 응답을 받고, TextDecoder를 통해 string으로 변환하여 실시간 출력
- 사용자가 선택할 수 있도록 3개의 메시지를 생성하고, stream을 즉시 split하여 각각 독립된 말풍선에 렌더링 후 각 메시지 복사 기능 제공
- 메시지 생성이 완료되면 동일한 프롬프트로 메시지를 재생성하거나, 처음으로 돌아가 새 메시지를 생성하는 기능 제공
- 사용자의 IP를 DB에 저장하여 일일 사용량 제한
