npm install -g yarn

yarn config set prefix ~/.yarn-global
yarn global add create-react-app

yarn install

cd frontend
yarn frontend:build

cd ../backend
yarn backend:build