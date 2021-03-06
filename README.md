# line-ready-nodejs

![Build and Deploy node Express app to azure](https://github.com/galactic-plane/line-ready-nodejs/workflows/Build%20and%20Deploy%20node%20Express%20app%20to%20azure/badge.svg)


Nodejs Express web application built on [visual studio code](https://code.visualstudio.com/).

<br/>

Language| Framework | Runtime | Platform | Author |
| --------| -------- | -------- |--------|--------|
javascript| Express | node | Azure Web App| Daniel Penrod |

<br/>
<br/>

> View on Azure: https://line-ready-nodejs.azurewebsites.net/

<br/>

# Find a fish, check the weather, and view the fish map.

![Daniel Penrod](line-ready-nodejs.png)

## Installation

For development, you will need Node.js and a node global package

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v16.2.0

    $ npm --version
    7.14.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

## Running

 - #### Clone this repository  

```bash
    $ git clone https://github.com/galactic-plane/line-ready-nodejs.git
```

- #### Install dependencies
```bash
    $ cd Application
    $ npm install -g
```

- #### Add API Keys
```bash
    $ cd Application/public/js
    $ code config.js
```

- #### Run Application
```bash
    $ cd Application
    $ npm start
```
- #### Running tests
```bash
    $ cd Tests
    $ npm install -g
    $ gulp unittest
```

## Deploying on Azure

Any change to this repository will result in triggering a workflow to build and deploy this app on azure as an app service. Learn more about [Azure App Service](https://docs.microsoft.com/en-us/azure/app-service/) and [Github Actions](https://docs.github.com/en/actions).

## Contributing

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.


## License:

See [LICENSE](LICENSE).
