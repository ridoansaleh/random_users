# QnA 

1. Explain how Object Oriented Programming works with a thorough understanding of the keyword this
and the new keyword

> Answer:  
> JavaScript is a prototype based Object Oriented Language, which means it doesn’t have classes, rather it defines behaviors using a constructor function and then reuse it using the prototype.  
> To apply a similar OOP's feature in JavaScript, we can create a class to deal with inheritance. In class, we have to initialize properties in 'this' object. To create a new object from  
> the class, we need to instantiate the class with 'new' constructor.


2. What is the new class syntax and how to create instance methods, class methods?

> Answer:  
> Class is a special type of function to create objects. We declare class method by defining its name and parentheses and curly braces (block code).

3. Give an example of how to implement inheritance in ES2015 using extends and super

> Answer:
```js
class Animal {
  constructor(name) {
    this.name = name;
  }
  greet() {
    return 'My name is ' + this.name;
  }
}

class Cat extends Animal {
  constructor(name, ability) {
    super(name);
    this.ability = ability;
  }
  speak() {
    return this.greet() + ', and I can ' + this.ability;
  }
}

const myCat = new Cat('Leo', 'run fast')
```


4. Imagine refactoring an ES5 application to use ES2015, how would you go about it?

> Answer:  
> - First, i'll make sure if the current project has support ES2015 or not  
> - If not, i'll install and configure babel  
> - Then i'll convert the syntax to ES6 step by step  
> - Most important, to test it after it is done


5. Give an example of how you structure applications with design patterns using closure and modules

> Answer:
```
  src/
    tests/
    components/  
        button/
          _buttonStyle.scss
          Button.jsx
          index.js  
        select/
        modal/
        ...  
    pages/  
        home/  
        login/
        profile/
        payments/
        success/
        error/
        not-found/
    routes.js
    redux/
    hooks/
    utils/
    constants/
    api/
```


6. What are your preferred ways of testing your web application?

> Answer:
> I prefer unit testing for common components & utility functions and E2E testing for features


7. Which web server do you use? Why? Explain pros and cons of your choice.
> Answer:
> In my professional career, i've never setting a web server since there is DevOps engineer to configure it for us.  
> But for my learning projects, i usually use Netlify because it easier to deploy with just one click after Github account connected.


8. What is your preferred production deployment process?
> Answer:
> I would prefer to have CI/CD to automatically run the tests and deploy it afterwards.


9. Give an example of clean README.md documentation.
> Answer:
```md
# Project name
Project description is written here (a brief introduction of the project)

## Getting Started

### Prerequisites
List all software that needs to be installed or steps need to be done

### Installation
A detail step by step on how to install the project locally in your machine

## Testing
Explain what type of testing is implemented here, how to run the test and important links to the resources to learn related test

## How to Contribute
A short description on how to create a PR, naming branch, commit message etc

```
