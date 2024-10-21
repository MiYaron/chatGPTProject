# ChatGPT

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.8.
and it is part of a home assignment i've received which ment to clone ChatGPT's UI in terms of visualization and behavior.

I chose to use the Angular framework to deepen my knowledge of the environment while producing a readable and maintainable product.

My primary goal was to make the UI as close as possible to the real ChatGPT website, including responsive behavior at different breakpoints, as well as the functionality of its components. Additionally, I aimed to keep my code clean, well-structured, and reusable.

During this project, I gained a deeper understanding of how to effectively pass data between parent and child components, manage shared state across different parts of the application, and ensure that changes to state were reflected seamlessly in the UI.

If I had more time, I would like to separate conversation history by timeframes and display them in distinct components within the side menu. This would improve the organization of past chats and enhance the user experience.

I would also like to implement additional functionality for buttons such as "Log In" and "Sign Up" to make them fully interactive. Moreover, I would improve the autofill feature in the Suggestions component to provide more accurate suggestions based on the selected item.

What I’m most proud of is that the site looks and feels very much like the real ChatGPT website. It includes key features such as the ability to use an API key, allowing users to experience full interactions with a GPT model. Additionally, I’ve implemented a mock service that replicates a bot, giving users the option to test the chat without an API key.

I’ve also added custom commands that enable users to manipulate the behavior of the chat, for an easy in app use, without the need of changing the code.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Usage

After Running the Development server and Navigating to 'http://localhost:4200/'. The main page will show up.

You have a Message Box where you can start a conversation by sending a message. you can also send Chat Commands to manipulate the bot's behavior (check Available Chat Commands for more).

Sending "/help" to the bot will be replied by all available commands

## Available Chat Commands

The chat commands allow you to manipulate the chatbot’s behavior directly within the app, without needing to modify a single line of code. You can send these commands at any time through the Message Box, just like sending a regular message.

You can use the following commands:

- /help - Shows the list of commands available in the chat.
- /key API_KEY - Gives the bot your Openai's api key so you can talk to real GPT model.
- /useMock - use a mock that reply with random answers.
- /stopMock - stop using the mock.

## Using real ChatGPT Model

To use the real GPT model, simply send a message to the bot containing the command /key followed by your OpenAI API key in the following format:
/key API_KEY.

You will receive a confirmation that your API key is valid. The key will be stored in a cookie, allowing you to interact with the real ChatGPT model from that point onward.

At any time, you can switch to a mock bot by sending the command /useMock, and return to the real model by sending /stopMock.

## Using Mock Service

If you dont have an openai's API key, or you dont want to use api tokens, you can chat with a mock service.

to do so just send the command '/useMock' and from now on you will be replied with random answers for your questions.

if you want to stop mocking just send '/stopMock'.

## Conversation History

You can see all your conversations history on the sidemenu

to open the side menu click the ![Sidemenu](src/assets/images/sidemenu.png) on your header

## Start New Conversation

If you want to stop a conversation and reset the chat click the ![New Message](src/assets/images/new_msg.png).

Dont worry, the conversation will be saved to your history and you will be able to return to it anytime from the Conversastion History.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
