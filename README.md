# Mess-Manager
Mess Mananger is mainly focused on keep tracking of a mess meal system and other maintanence cost. People who lives in mess, sometimes it becomes difficult to keep track of mess meal count and other expense related issues. So our Mess-manager webapp comes in the scene to make their life easier.


## Features
  * Creating mess with unique mess-code.
  * Invite people in your mess via email.
  * Join as a manager or member
  * Keep track of expenses.
  * Bulletin-board for viewing necessary items needed for mess.
  * Make mess bazaz schedule.
  * Keep record of date-wise meals.
  * Viewing mess summary and sorting out balance automatically.
  * Keep record of previous month mess statistics.
  * View own profile and member contacts.
  * Live chat between mess members.
  * End month anytime and remove member option.
  * Auto generated payment after completing every month.
 
### This project requires three dedicated server-port. (Backend, Frontend, Live Chat using Socket.io) 
 
For running this backend api follow given instructions,
* if you dont have yarn in your device install __yarn__ 
```
npm install --global yarn
yarn --version
```
* Now install node into your system.
```
sudo apt install nodejs 
nodejs --version
```
* Now use following command from cli to clone this project
```
git clone https://github.com/Sshovon/Mess-Manager.git
```
* Create a .env file in the source directory
```
cd /toyourclonedfloder
touch .env
```
* Paste following lines in the .env folder and also create a cluster in mongodb atlas and replace the DB_URL with your mongodb atlas provided db url.
```
PORT=4004
JWT=%mess-manager%
DB_URL=mongodb+srv://<username>:<password>@cluster0.921fy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
PORT2=3001
```
* Install dependencies using yarn and run the command from the source directroy of the project
```
sudo yarn install
```
* Run following command from the cli to run the backend server.
```
yarn dev
```
You have succesfully deployed backend and live chat servers.

* For frontend server you need npm package.
```
sudo apt install npm
```
* Now clone frontend from following git repo.
```
git clone https://github.com/nahid-g/Mess-Manager-Client.git
```

* Now install dependencies from source folder.
```
npm install

```
* Use following command to run the server.
```
npm start
```
You have to create a new mess and add members from the scratch to populate data.

## Presentation
 

https://user-images.githubusercontent.com/47460398/145912258-a10e4b67-29c8-4f95-a7e7-cf6705739842.mp4



[Alternative link](https://drive.google.com/file/d/1sy7QCZavyMbdG7e1nUGgqR5AN_W-LwEy/view?usp=sharing)
