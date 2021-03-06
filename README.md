# Home Hardware Store
# Independent Home Hardware store are loosing customers because essential workers can't just stop buy on their way home from work and pick things up that they need due to COVID-19.
# The app is a user experience including a sign to post in the window for curbside ordering of maintainence essentials.

Student name: Nguyen Ha Dao
Student ID: 8695356
Email: daonguyenha5356@conestogac.on.ca

###A. To run the app, simply open the link on a browser:
https://meomun-home-hardware.herokuapp.com/
- Type 'hi' to start playing around with it.

###B. To run the app locally:
1. Install Git
    1.1 Git installation: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
    1.2 First-time Git setup: https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup
2. Install Node.js and npm: https://nodejs.org/en/
3. Clone source code from Git repository:
    - Create a new folder: ie: C:\Users\Ha\source\repos\homehardware
    - On Windows, start the Command Prompt (cmd.exe) or Powershell to access the command shell,
    clone source code from that folder `git clone https://github.com/dnguyenha/HomeHardware.git .`
4. Run `npm install` to install node modules, this just needs to be run only once.
5. To start the app, run `npm start`
6. Run the app from localhost on a web browser: https://localhost:8000/

###C. How to deploy a Node.js app on Heroku:
1. Create a new free Heroku account: https://signup.heroku.com/signup/dc
2. Install Node.js and npm (instruction ###B)
3. Install and setup Git (instruction ###B)
4. Install Heroku Command Line Interface (CLI)
    - Link for Windows 64-bit installer: https://cli-assets.heroku.com/heroku-x64.exe
5. On Windows, start the Command Prompt (cmd.exe) or Powershell to access the command shell.
    - Login to Heroku CLI: `heroku login`
6. Make sure all apps are installed:
    `node --version`
    `npm --version`
    `git --version`
7. Clone a local version of the app:
    `git clone https://github.com/dnguyenha/HomeHardware.git`
    `cd HomeHardware`
8. Deploy the app:
    - Create an app on Heroku, which prepares Heroku to receive your source code
    `heroku create`
    - When you create an app, a git remote (called heroku) is also created and associated with your local git repository.
    - Heroku generates a random name (in this case radiant-caverns-37868) for your app, or you can pass a parameter to specify your own app name.
    - Deploy the code:
    `git push heroku main`
    - The application is now deployed. Ensure that at least one instance of the app is running:
    `heroku ps:scale web=1`
    - Now visit the app at the URL generated by its app name:
    https://radiant-caverns-37868.herokuapp.com/
    - Or, as a handy shortcut, you can open the website as follows:
    `heroku open`

Note:
    - Rename the app to your desired one:
    `heroku apps:rename meomun-home-hardware`
    or (specify newname vs oldname):
    `heroku apps:rename meomun-home-hardware --app radiant-caverns-37868`
    - Now the app becomes: https://meomun-home-hardware.herokuapp.com/
