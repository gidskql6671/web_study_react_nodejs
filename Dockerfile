FROM node:14-alpine

# 컨테이너에 /app 폴더 만들기
RUN mkdir -p /app

# 현재 작업 폴더를 /app으로 지정
WORKDIR /app

# 서버 파일을 복사
ADD ./ /app

RUN yarn install

CMD yarn start
