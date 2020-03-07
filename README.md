# Live support chat server

Node/Express/SocketIO project to provide the back-end for a customer support live chat system.

Supports multiple simultaneous customer clients communicating with a single staff client. The staff client can respond to any of the active customer clients.

# Status

This project is an early prototype. It is currently lacking auth for the non-public side and persistant storage of all messages.

There are minimal staff and customer clients are served from `/staff` and `/client` respectively.

# Future plans

This will be incorporated into a staff dashboard behind google gsuite oauth2. The dashboard will also be able to view any previous conversations.

# Install

- `git clone *repo_url*`

- `npm install`

- `npm start`


# Inspiration

This code is adapted from the [chat example](http://socket.io/get-started/chat/) from the socket.IO docs.

