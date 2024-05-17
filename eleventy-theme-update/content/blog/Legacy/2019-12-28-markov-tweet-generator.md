---
title:      "Markov Tweet Generator"
date:       2019-12-28
categories: markov, twitter, python
---
A [Markov Chain](https://en.wikipedia.org/wiki/Markov_chain) is a model that finds the probability of an event occurring based on the current state. It takes a large text input and develops a statistical model based on that input text. 

For example, if the test inputted was

> a dog and a frog
> a cat in a hat

Then when generating a sentence the model will pick a random word based on the above input. So the probability that it picks "a" is 40%, while the probability that it picks "and" is 10%. If the model picks "a" then the probabilities will adjust accordingly, i.e. since dog/cat/frog/hat all occur after "a" they are now more likely to be chosen next (instead of and/in). The model keeps following through until a sentence is created.

The model below was provided with every tweet I've ever liked (~16k tweets). Feel free to click "new tweet" to generate another tweet.

<iframe src='https://twitter-markov.herokuapp.com/' style='overflow:hidden;
         height: 20em; width: 26em'></iframe>



