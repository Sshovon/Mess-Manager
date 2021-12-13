## Mess-Manager
Mess Mananger is mainly focused on keep tracking of a mess meal system and other maintanence cost. People who lives in mess, sometimes it becomes difficult to keep track of mess meal count and other expense related issues. So our Mess-manager webapp comes in the scene to make their life easier.

#Features
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
 
#This project requires three dedicated server-port. (Backend, Frontend, Live Chat using Socket.io) 
 
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
* Paste following lines in the .env folder.
```
PORT=4004
JWT=%mess-manager%
DB_URL=mongodb+srv://Shovon:2017331099@cluster0.921fy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
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
<<<<<<< HEAD
git clone 
=======
git clone https://github.com/nahid-g/Mess-Manager-Client.git
>>>>>>> 30f7ac7f3be705f0575b9adc9e517ecb4bd95a7f
```

* Now install dependencies from source folder.
```
npm install

```
* Use following command to run the server.
```
npm start
```

<<<<<<< HEAD
As we used mongoDB cloud, use provided credentials to join as a manager with populated data.
```
email- 
```
=======
As we used mongoDB cloud, use provided credentials to join as a manager with populated data. \n
Manager
```
email-n@gmail.com
password-123456
```
Member
```
email-r@gmail.com
password-123456
```

Or you can  create a new mess and add members from the scratch.
>>>>>>> 30f7ac7f3be705f0575b9adc9e517ecb4bd95a7f
