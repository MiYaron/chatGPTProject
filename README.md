# ChatGPT

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Usage

After Running the Development server and Navigating to 'http://localhost:4200/'. The main page will show up.

You have a Message Box where you can type any message to the bot. you can also send Chat Commands to manipulate it's behavior (check Available Commands for more).

Sending "/help" to the bot will be replied by all available commands

## Available Chat Commands

The chat commands let you manipulate the behavior of the chat bot, you can send commands anytime using the Message Box just like sending a regular message.

You can use the following commands:

- /help - Shows the list of commands available in the chat.
- /key API_KEY - Gives the bot your Openai's api key so you can talk to real GPT model.
- /useMock - use a mock that reply with random answers.
- /stopMock - stop using the mock.

## Using real ChatGPT Model

If you want to use real GPT model just send message to the bot contains command '/key' and your openai's API_KEY in the following format:
"/key API_KEY".

you should be responded that your API key is valid, the key will be kept in a cookie and you will be able to use
real chatGPT model from now on.

you can send command '/useMock' at anytime to switch to a mock bot, or '/stopMock' to return to the real model.

## Using mock service

If you dont have an openai's API key, or you dont want to use api tokens, you can chat with a mock service.

to do so just send the command '/useMock' and from now on you will be replied with random answers for your questions.

if you want to stop mocking just send '/stopMock'.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
