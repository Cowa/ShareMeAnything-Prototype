Share Me Anything [Prototype]
=============================

*A web application social experiment*

A prototype by **Brice Thomas** written in JavaScript with Node.js, 2014

How to install ?
----------------

You'll need Node.js :

[Node.js website](http://nodejs.org/)

Clone the repo :

```git clone https://github.com/Cowa/ShareMeAnything.git```

Inside the repo, install dependencies :
 
```npm install```

How to configure ?
------------------

In ```app.js``` you can change the server's port (default 1337, but 8080 is more famous)

Edit ```home.js``` and ```share.js``` (inside views/js) and modify the server's adress

You can now start the server ```nodejs app.js```


What is it ?
------------

**A fun new way to communicate**

*Share Me Anything* connects you with another **random** connected human.

Once in touch with someone, two different roles are given: a sender and a receiver.

The sender have to share an image, photo, music or video. Only one share at a time.

Then the receiver receives the share and must vote: *'Fun'* or *'Bad'*.

If *'Bad'*, it puts an end to the communication.

But if *'Fun'*, the communication goes on ! And roles are switched.

The sender becomes the receiver and vice versa.

And another turn begin...

Progress
--------

This. was. a prototype.

Well, it means, no more work will be done here.

Supported shares:

- URL **images, photos and animated gifs**

- **YouTube videos**

- **Vimeo videos**

Next ?
------

I planned something quite new for the future.

It will be focused on mobile devices, with the same idea.

A quick look
------------

Please, don't forget this was a prototype.

![Home](readme/home.png)

![Sender_share](readme/sharer_share.png)



![Receiver_wait](readme/receiver_wait.png)

![Receiver_vote](readme/receiver_vote.png)


![Bad](readme/bad.png)
